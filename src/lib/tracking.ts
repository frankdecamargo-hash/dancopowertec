import { siteConfig } from "@/lib/site-config";

// Atribuição de campanha e eventos de conversão (Google Ads, ChatGPT Ads, GTM).
// Tudo roda só no navegador e é opcional: sem as variáveis de ambiente,
// os eventos apenas vão para o dataLayer.

const STORAGE_KEY = "dancoAttribution";

const PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "oppref", // clique vindo do ChatGPT Ads
  "fbclid",
] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
};

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    oaiq?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

function readFrom(storage: Storage): Attribution {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

function save(data: Attribution) {
  for (const storage of [sessionStorage, localStorage]) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }
}

function gclidFromCookie() {
  // A tag do Google guarda o gclid no cookie _gcl_aw como "GCL.<timestamp>.<gclid>".
  const match = document.cookie.match(/(?:^|;\s*)_gcl_aw=([^;]+)/);
  if (!match) return "";
  const parts = decodeURIComponent(match[1]).split(".");
  return parts.length >= 3 ? parts.slice(2).join(".") : "";
}

// Lê os parâmetros da URL atual e mescla com o que já foi salvo na sessão.
// Parâmetros novos na URL têm prioridade.
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  // A sessão atual manda; o localStorage só serve de reserva para os
  // parâmetros de campanha (ex.: a pessoa volta outro dia sem UTM na URL).
  const session = readFrom(sessionStorage);
  const persisted = readFrom(localStorage);
  const url = new URL(window.location.href);
  const current: Attribution = {};
  for (const key of PARAMS) {
    const value = url.searchParams.get(key);
    if (value) current[key] = value;
  }

  const merged: Attribution = {
    ...persisted,
    ...session,
    ...current,
    landing_page: session.landing_page || window.location.href,
    referrer: session.referrer ?? document.referrer,
  };
  if (!merged.gclid) {
    const cookie = gclidFromCookie();
    if (cookie) merged.gclid = cookie;
  }

  save(merged);
  return merged;
}

export function createEventId(prefix = "lead") {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `danco-${prefix}-${random}`;
}

export function pushEvent(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

function loadScript(src: string) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function ensureGtag(adsId: string) {
  if (typeof window.gtag === "function") return window.gtag;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", adsId);
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${adsId}`);
  return window.gtag;
}

function ensureOpenAIPixel(pixelId: string) {
  if (typeof window.oaiq === "function") return window.oaiq;
  const queue = function (...args: unknown[]) {
    queue.q!.push(args);
  } as NonNullable<Window["oaiq"]>;
  queue.q = [];
  window.oaiq = queue;
  loadScript("https://bzrcdn.openai.com/sdk/oaiq.min.js");
  window.oaiq("init", { pixelId });
  return window.oaiq;
}

// Conversão de lead qualificado. Usa o mesmo eventId enviado para a planilha,
// permitindo deduplicar com conversões offline/API depois.
export function trackLeadConversion(eventId: string, status: string) {
  pushEvent("lead_submit", { lead_status: status, event_id: eventId });

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
  if (adsId && adsLabel) {
    try {
      ensureGtag(adsId)("event", "conversion", {
        send_to: `${adsId}/${adsLabel}`,
        value: 1.0,
        currency: "BRL",
        transaction_id: eventId,
      });
    } catch {}
  }

  const pixelId = siteConfig.openaiPixelId;
  if (pixelId) {
    try {
      ensureOpenAIPixel(pixelId)(
        "measure",
        "lead_created",
        { type: "customer_action" },
        { event_id: eventId }
      );
    } catch {}
  }
}
