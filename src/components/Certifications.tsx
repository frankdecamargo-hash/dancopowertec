import Image from "next/image";
import { BadgeCheck, FileText, ShieldCheck } from "lucide-react";

interface Credential {
  title: string;
  issuer: string;
  pdf?: string;
}

const CREDENTIALS: Credential[] = [
  {
    title: "Assistência Técnica Autorizada WEG",
    issuer: "WEG",
    pdf: "/certificados/CREDENCIAL-ASSISTENCIA-WEG-DANCO.pdf",
  },
  { title: "Assistência Técnica Autorizada WEG Energia", issuer: "WEG Energia" },
  {
    title: "Assistência Técnica Autorizada Ebara e Thebe",
    issuer: "Ebara · Thebe",
    pdf: "/certificados/CREDENCIAL-EBARA-E-THEBE-DANCO.pdf",
  },
  {
    title: "Assistência Técnica Autorizada Famac e Homa",
    issuer: "Famac · Homa",
    pdf: "/certificados/DECLARACAO-ASSISTENCIA-TECNICA-FAMAC-E-HOMA-DANCO.pdf",
  },
  {
    title: "Assistência Técnica Autorizada Buffalo",
    issuer: "Buffalo",
    pdf: "/certificados/Certificado-BUFFALO-DANCO.pdf",
  },
  {
    title: "Assistência Técnica Autorizada Lepono",
    issuer: "Lepono",
    pdf: "/certificados/CERTIFICADO-LEPONO-DANCO-MOTORES.pdf",
  },
  {
    title: "Distribuidor e Assistência Técnica Lintec",
    issuer: "Lintec · Powertec",
    pdf: "/certificados/LINTEC-POWERTEC.pdf",
  },
  { title: "Assistência Técnica Autorizada Altri", issuer: "Altri" },
];

export default function Certifications() {
  return (
    <section
      id="certificacoes"
      className="bg-blueprint relative overflow-hidden bg-primary-950 py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(240,90,26,0.14),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-sm font-semibold tracking-wide text-accent-400 uppercase">
              Certificações
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Qualidade auditada,
              <br />
              não só prometida
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-primary-300">
              Somos certificados pela Bureau Veritas na ISO 9001 e na ABNT NBR
              IEC 60079-79, a norma que habilita o reparo, revisão e
              recuperação de equipamentos para atmosferas explosivas. Além
              disso, somos assistência técnica credenciada pelos principais
              fabricantes de motores e bombas do mercado.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <ShieldCheck size={22} className="mt-0.5 shrink-0 text-accent-400" />
                <div>
                  <p className="font-semibold text-white">ISO 9001</p>
                  <p className="mt-1 text-sm text-primary-300">
                    Padronização e rastreabilidade de cada serviço.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <ShieldCheck size={22} className="mt-0.5 shrink-0 text-accent-400" />
                <div>
                  <p className="font-semibold text-white">NBR IEC 60079-79</p>
                  <p className="mt-1 text-sm text-primary-300">
                    Reparo de equipamentos Ex (à prova de explosão).
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-black/40 sm:p-10">
            <Image
              src="/marca/selo.png"
              alt="Certificado Bureau Veritas: ISO 9001 e NBR IEC 60079-79"
              width={722}
              height={262}
              className="h-auto w-full"
            />
            <div className="mt-8 flex items-center justify-center gap-6 border-t border-primary-100 pt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/clientes/weg.png"
                alt="Assistência Técnica Autorizada WEG"
                className="h-14 w-auto object-contain"
              />
              <p className="text-sm leading-snug text-primary-600">
                Uma das maiores
                <br />
                <span className="font-semibold text-primary-950">
                  Assistências Técnicas WEG de SC
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-center text-sm font-semibold tracking-wide text-primary-300 uppercase">
            Credenciamentos oficiais de fabricantes
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CREDENTIALS.map((cred) => {
              const content = (
                <>
                  <BadgeCheck size={20} className="shrink-0 text-accent-400" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      {cred.title}
                    </p>
                    <p className="mt-1 text-xs text-primary-400">{cred.issuer}</p>
                    {cred.pdf && (
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-300 group-hover:text-accent-400">
                        <FileText size={13} />
                        Ver certificado
                      </span>
                    )}
                  </div>
                </>
              );
              const cls =
                "group flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-primary-900/60 p-5 transition-colors";

              return cred.pdf ? (
                <a
                  key={cred.title}
                  href={cred.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cls} hover:border-accent-500/50 hover:bg-primary-900`}
                >
                  {content}
                </a>
              ) : (
                <div key={cred.title} className={cls}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
