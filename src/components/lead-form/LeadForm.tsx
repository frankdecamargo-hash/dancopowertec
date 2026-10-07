"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Lock,
  MessageCircle,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/site-config";
import { captureAttribution, createEventId, pushEvent, trackLeadConversion } from "@/lib/tracking";
import {
  type Answers,
  type FieldsStep,
  type Option,
  type OptionStep,
  type Preset,
  type Step,
  type StopReason,
  SERVICE_PRESETS,
  STEPS,
  STOP_MESSAGES,
  emptyAnswers,
  formatPhone,
  qualify,
  validateField,
} from "@/lib/lead-form";
import { cn } from "@/lib/utils";

const text = (value: string | ((a: Answers) => string), a: Answers) =>
  typeof value === "function" ? value(a) : value;

const optionsOf = (step: OptionStep, a: Answers): Option[] =>
  typeof step.options === "function" ? step.options(a) : step.options;

// Envia a linha para a planilha (Google Apps Script). A URL fica em
// NEXT_PUBLIC_LEADS_ENDPOINT; veja integracoes/google-sheets-apps-script.gs.
function sendToSheet(data: Record<string, string>) {
  const endpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT;
  if (!endpoint) {
    console.warn("[Danco] NEXT_PUBLIC_LEADS_ENDPOINT não configurado. Lead não enviado:", data);
    return;
  }
  fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: new URLSearchParams(data).toString(),
    keepalive: true,
  }).catch((error) => console.error("[Danco] Erro ao enviar lead:", error));
}

function buildWhatsAppMessage(a: Answers) {
  const lines = [
    "Olá! Acabei de preencher o formulário de orçamento no site.",
    "",
    `Nome: ${a.nome}`,
    `Empresa: ${a.empresa} (${a.cidade})`,
    `Setor: ${a.setor}`,
    `Necessidade: ${a.necessidade}`,
    `Equipamento: ${a.equipamento}${a.porte ? ` · ${a.porte}` : ""}`,
  ];
  if (a.situacao) lines.push(`Situação: ${a.situacao}`);
  return lines.join("\n");
}

export default function LeadForm() {
  return (
    <Suspense fallback={<div className="h-96" aria-hidden />}>
      <LeadFormWithParams />
    </Suspense>
  );
}

// Lê ?servico= e ?origem= do botão clicado na landing page.
function LeadFormWithParams() {
  const params = useSearchParams();
  const servico = params.get("servico") || "";
  const preset = SERVICE_PRESETS[servico] ?? {};
  const origem = params.get("origem") || servico;
  return <LeadFormSteps preset={preset} origem={origem} />;
}

function LeadFormSteps({ preset, origem }: { preset: Preset; origem: string }) {
  const [answers, setAnswers] = useState<Answers>(() => ({ ...emptyAnswers, ...preset }));
  const [currentId, setCurrentId] = useState(STEPS[0].id);
  const [history, setHistory] = useState<string[]>([]);
  const [stop, setStop] = useState<StopReason | null>(null);
  const [done, setDone] = useState<"mql" | "lead" | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    captureAttribution();
  }, []);

  const visibleSteps = useMemo(
    () => STEPS.filter((s) => !(s.kind === "options" && s.skip?.(answers, preset))),
    [answers, preset]
  );
  const step = visibleSteps.find((s) => s.id === currentId) ?? visibleSteps[0];
  const position = visibleSteps.indexOf(step) + 1;
  const percent = Math.round((position / visibleSteps.length) * 100);

  // Volta ao topo a cada troca de etapa (não na abertura da página).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentId, stop, done]);

  function baseRow(status: string, eventId = "") {
    const tracking = captureAttribution();
    return {
      data_hora: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      status,
      origem_cta: origem,
      ...answers,
      utm_source: tracking.utm_source || "",
      utm_medium: tracking.utm_medium || "",
      utm_campaign: tracking.utm_campaign || "",
      utm_term: tracking.utm_term || "",
      utm_content: tracking.utm_content || "",
      gclid: tracking.gclid || "",
      gbraid: tracking.gbraid || "",
      wbraid: tracking.wbraid || "",
      oppref: tracking.oppref || "",
      landing_page: tracking.landing_page || "",
      referrer: tracking.referrer || "",
      event_id: eventId,
    };
  }

  function goNext(fromId: string, nextAnswers: Answers) {
    const nextVisible = STEPS.filter((s) => !(s.kind === "options" && s.skip?.(nextAnswers, preset)));
    const index = nextVisible.findIndex((s) => s.id === fromId);
    const next = nextVisible[index + 1];
    if (next) {
      setHistory((h) => [...h, fromId]);
      setCurrentId(next.id);
    }
  }

  function goBack() {
    if (stop) {
      setStop(null);
      return;
    }
    const previous = history[history.length - 1];
    if (previous) {
      setHistory((h) => h.slice(0, -1));
      setCurrentId(previous);
    }
  }

  function chooseOption(s: OptionStep, option: Option) {
    if (!started.current) {
      started.current = true;
      pushEvent("lead_form_start", { origem_cta: origem });
    }

    const next: Answers = { ...answers, [s.field]: option.value };
    // Ao trocar o equipamento, a faixa de potência anterior deixa de valer.
    if (s.field === "equipamento" && option.value !== answers.equipamento) next.porte = "";
    setAnswers(next);
    setSelected(option.value);

    window.setTimeout(() => {
      setSelected(null);
      if (option.stop) {
        setStop(option.stop);
        pushEvent("lead_disqualified", { reason: option.stop, origem_cta: origem });
        // Registra sem dados pessoais: serve para medir a qualidade das campanhas.
        sendToSheet({ ...baseRow(`desqualificado_${option.stop}`), [s.field]: option.value });
        return;
      }
      goNext(s.id, next);
    }, 180);
  }

  function submitFields(s: FieldsStep) {
    const nextErrors: Record<string, string> = {};
    for (const field of s.fields) {
      const message = validateField(field, answers[field.name]);
      if (message) nextErrors[field.name] = message;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!s.submit) {
      goNext(s.id, answers);
      return;
    }

    const status = qualify(answers);
    const eventId = createEventId("lead");
    sendToSheet(baseRow(status, eventId));
    trackLeadConversion(eventId, status);
    setDone(status);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set("conversao", "obrigado");
      url.searchParams.set("status", status);
      window.history.replaceState(null, "", url.pathname + url.search);
    } catch {}
  }

  const firstName = answers.nome.trim().split(/\s+/)[0] || "";

  return (
    <div>
      {done ? (
        <section className="animate-[step-in_0.32s_ease]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-400">
            <Check size={26} strokeWidth={3} />
          </div>
          <p className="mt-6 text-sm font-bold text-accent-400">Solicitação recebida.</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {firstName ? `Obrigado, ${firstName}.` : "Obrigado!"}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-primary-300">
            Nosso time comercial recebeu as informações do seu equipamento e vai entrar em
            contato pelo WhatsApp {answers.whatsapp}.
          </p>

          <dl className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
            {[
              ["Empresa", `${answers.empresa} · ${answers.cidade}`],
              ["Equipamento", `${answers.equipamento}${answers.porte ? ` · ${answers.porte}` : ""}`],
              ["Necessidade", answers.necessidade],
              ...(answers.situacao ? [["Situação", answers.situacao]] : []),
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-primary-400">{label}</dt>
                <dd className="mt-0.5 font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-primary-300">
            Quer agilizar? Fale agora com a equipe pelo WhatsApp. Sua mensagem já vai com o
            resumo da solicitação.
          </p>
          <a
            href={whatsappHref(buildWhatsAppMessage(answers))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pushEvent("whatsapp_click", { lead_status: done })}
            className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 text-sm font-bold tracking-wide text-white uppercase shadow-lg shadow-black/20 transition-transform active:scale-[0.99]"
          >
            <MessageCircle size={20} />
            Agilizar atendimento no WhatsApp
          </a>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-white"
          >
            <ArrowLeft size={14} /> Voltar ao site
          </Link>
        </section>
      ) : stop ? (
        <section className="animate-[step-in_0.32s_ease]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-primary-300">
            <XCircle size={26} />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {STOP_MESSAGES[stop].title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-primary-300">
            {STOP_MESSAGES[stop].text}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-accent-500/60 px-6 text-sm font-bold text-white transition-colors hover:bg-accent-500/10"
            >
              {STOP_MESSAGES[stop].backLabel}
            </button>
            <Link
              href="/"
              className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-white/5 px-6 text-sm font-semibold text-primary-200 hover:bg-white/10"
            >
              Voltar ao site
            </Link>
          </div>
        </section>
      ) : (
        <>
          <div className="mb-8">
            <div className="mb-2.5 flex items-end justify-between gap-4 text-sm">
              <div>
                <p className="font-bold text-white">
                  <span className="text-accent-400">Etapa {position}</span> de {visibleSteps.length}
                </p>
                <p className="text-xs text-primary-400">{step.progressLabel}</p>
              </div>
              <p className="text-xs text-primary-300">
                <span className="font-bold text-accent-400">{percent}%</span> concluído
              </p>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400 transition-[width] duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <StepView
            key={step.id}
            step={step}
            answers={answers}
            errors={errors}
            selected={selected}
            onChoose={chooseOption}
            onChange={(name, value) => {
              setAnswers((prev) => ({ ...prev, [name]: name === "whatsapp" ? formatPhone(value) : value }));
              if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
            }}
            onSubmit={submitFields}
          />

          {history.length > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="mt-5 inline-flex items-center gap-1.5 py-1 text-sm text-primary-400 hover:text-white"
            >
              <ArrowLeft size={14} /> Voltar
            </button>
          )}

          <p className="mt-6 flex items-center gap-2 text-xs text-primary-500">
            <Lock size={13} className="shrink-0" />
            Seus dados são usados apenas para o contato comercial da {siteConfig.companyName}.
          </p>
        </>
      )}

      {!stop && (
        <aside className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-br from-primary-900 to-primary-950 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck size={22} className="mt-0.5 shrink-0 text-accent-400" />
            <div>
              <p className="text-sm font-semibold text-white">
                ISO 9001 · NBR IEC 60079-79 · Autorizada WEG
              </p>
              <p className="mt-1 text-xs leading-relaxed text-primary-400">
                Mais de 20 anos, parque fabril de 2.000 m² e mais de 2.500 clientes atendidos,
                como Klabin, Seara e Sanepar.
              </p>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function StepView({
  step,
  answers,
  errors,
  selected,
  onChoose,
  onChange,
  onSubmit,
}: {
  step: Step;
  answers: Answers;
  errors: Record<string, string>;
  selected: string | null;
  onChoose: (s: OptionStep, o: Option) => void;
  onChange: (name: FieldsStep["fields"][number]["name"], value: string) => void;
  onSubmit: (s: FieldsStep) => void;
}) {
  return (
    <section className="animate-[step-in_0.32s_ease]">
      <p className="text-sm font-bold text-accent-400">{step.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {text(step.title, answers)}
      </h1>
      {step.description && (
        <p className="mt-3 text-base leading-relaxed text-primary-300">{step.description}</p>
      )}

      {step.kind === "options" ? (
        <div className={cn("mt-7 grid gap-2.5", step.columns === 2 && "sm:grid-cols-2")}>
          {optionsOf(step, answers).map((option) => {
            const active = selected === option.value || (!selected && answers[step.field] === option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChoose(step, option)}
                className={cn(
                  "flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-[border-color,background-color,transform] active:scale-[0.99]",
                  active
                    ? "border-accent-500 bg-accent-500/10"
                    : "border-primary-700 bg-primary-900/70 hover:border-accent-500/70 hover:bg-accent-500/5"
                )}
              >
                <span>
                  <span className="block text-[15px] font-medium text-white">{option.label}</span>
                  {option.hint && (
                    <span className="mt-0.5 block text-xs text-primary-400">{option.hint}</span>
                  )}
                </span>
                <ChevronRight size={18} className="shrink-0 text-accent-400" />
              </button>
            );
          })}
        </div>
      ) : (
        <form
          className="mt-7 space-y-4"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(step);
          }}
        >
          {step.fields.map((field, index) => (
            <label key={field.name} className="block">
              <span className="mb-1.5 block text-xs font-medium text-primary-300">{field.label}</span>
              <input
                type={field.type ?? "text"}
                inputMode={field.type === "tel" ? "numeric" : undefined}
                autoComplete={field.autoComplete}
                autoFocus={index === 0}
                placeholder={field.placeholder}
                value={answers[field.name]}
                onChange={(event) => onChange(field.name, event.target.value)}
                aria-invalid={Boolean(errors[field.name])}
                className={cn(
                  "h-14 w-full rounded-2xl border bg-primary-900/70 px-4 text-base text-white outline-none transition-[border-color,box-shadow] placeholder:text-primary-500 focus:border-accent-500 focus:shadow-[0_0_0_3px_rgba(240,90,26,0.15)]",
                  errors[field.name] ? "border-red-500" : "border-primary-700"
                )}
              />
              {errors[field.name] && (
                <span className="mt-1.5 block text-xs text-red-400">{errors[field.name]}</span>
              )}
            </label>
          ))}

          <button
            type="submit"
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent-500 to-accent-400 px-6 text-sm font-bold tracking-wide text-white uppercase shadow-[0_12px_30px_-12px_rgba(240,90,26,0.6)] transition-transform active:scale-[0.99]"
          >
            {step.submit ? "Enviar solicitação" : "Continuar"}
            <ArrowRight size={18} />
          </button>
        </form>
      )}
    </section>
  );
}
