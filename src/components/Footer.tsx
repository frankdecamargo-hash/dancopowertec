import { Mail, MapPin, MessageCircle, Phone, ClipboardCheck } from "lucide-react";
import { siteConfig, phoneHref, quoteHref, whatsappHref } from "@/lib/site-config";
import BrandLogo from "@/components/BrandLogo";

function SocialIcon({ name }: { name: "instagram" | "linkedin" | "facebook" }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
  }
}

const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#setores", label: "Setores atendidos" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "Dúvidas frequentes" },
];

const SOCIAL = [
  { name: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin },
  { name: "instagram", label: "Instagram", href: siteConfig.social.instagram },
  { name: "facebook", label: "Facebook", href: siteConfig.social.facebook },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-950">
      {/* Chamada final */}
      <div className="border-y border-primary-800 bg-gradient-to-r from-accent-600 to-accent-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 text-center lg:flex-row lg:px-8 lg:text-left">
          <div>
            <p className="text-2xl font-bold text-white sm:text-3xl">
              Equipamento parado é produção perdida.
            </p>
            <p className="mt-2 text-base text-white/85">
              Envie os dados do motor, gerador ou transformador e receba o
              retorno da nossa equipe técnica.
            </p>
          </div>
          <a
            href={quoteHref("rodape")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-950 px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
          >
            <ClipboardCheck size={18} />
            Solicitar orçamento agora
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1fr]">
          <div>
            <BrandLogo invert className="[&_img]:h-5" />
            <p className="mt-5 max-w-xs text-sm text-primary-400">
              Manutenção e rebobinamento de motores elétricos, geradores,
              transformadores e motobombas para a indústria pesada desde{" "}
              {siteConfig.foundedYear}.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Navegação</p>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-400 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Contato</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary-400 transition-colors hover:text-accent-400"
                >
                  <MessageCircle size={16} />
                  {siteConfig.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={phoneHref}
                  className="flex items-center gap-2 text-sm text-primary-400 transition-colors hover:text-accent-400"
                >
                  <Phone size={16} />
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm text-primary-400 transition-colors hover:text-accent-400"
                >
                  <Mail size={16} />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-primary-400 transition-colors hover:text-accent-400"
                >
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.complement} · {siteConfig.address.cep}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Redes sociais</p>
            <div className="mt-4 flex gap-3">
              {SOCIAL.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 text-primary-200 transition-colors hover:bg-accent-500 hover:text-white"
                  aria-label={social.label}
                >
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-primary-500">
              ISO 9001 · ABNT NBR IEC 60079-79
              <br />
              Assistência Técnica Autorizada WEG
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-800 pt-8 text-xs text-primary-500 sm:flex-row">
          <p>
            © {siteConfig.foundedYear} a {year} {siteConfig.companyName}. Todos os
            direitos reservados.
          </p>
          <p>Atendimento em SC, PR, SP e RS.</p>
        </div>
      </div>
    </footer>
  );
}
