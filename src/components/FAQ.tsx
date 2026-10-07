"use client";

import { useState } from "react";
import { ChevronDown, ClipboardCheck } from "lucide-react";
import { quoteHref } from "@/lib/site-config";
import CtaButton from "@/components/CtaButton";

const FAQS = [
  {
    question: "Vocês vendem motores, bombas ou peças novas?",
    answer:
      "Não. Nosso foco é serviço: manutenção, rebobinamento, rejuvenescimento e recuperação de motores elétricos, motobombas, geradores e transformadores. Se o seu equipamento parou ou está perdendo desempenho, somos a empresa certa para colocá-lo de volta em operação.",
  },
  {
    question: "Qual o porte de equipamento que vocês atendem?",
    answer:
      "Atendemos motores elétricos de baixa e média tensão até 2.500 CV, além de grupos geradores, alternadores, transformadores, subestações, bombas submersíveis e motobombas industriais. Nossa estrutura conta com ponte rolante de 10 toneladas para movimentar equipamentos de grande porte.",
  },
  {
    question: "Vocês fazem reparo em motores à prova de explosão?",
    answer:
      "Sim. Somos certificados pela Bureau Veritas na ABNT NBR IEC 60079-79, norma que regula o reparo, revisão e recuperação de equipamentos para atmosferas explosivas (Ex). Isso garante que o equipamento volte à sua planta mantendo a certificação de segurança.",
  },
  {
    question: "Vocês atendem fora de Santa Catarina?",
    answer:
      "Sim. Temos bases e atendimento em Santa Catarina, Paraná, São Paulo e Rio Grande do Sul, com frota própria para coleta e entrega dos equipamentos e para serviços em campo.",
  },
  {
    question: "Como funciona o orçamento?",
    answer:
      "Você nos envia os dados do equipamento (placa, potência, tensão e sintoma) pelo WhatsApp. Após a coleta, fazemos desmontagem, inspeção e ensaios elétricos, e enviamos o laudo técnico com o orçamento para sua aprovação antes de iniciar o serviço.",
  },
  {
    question: "Vocês oferecem contratos de manutenção preventiva?",
    answer:
      "Sim. Para indústrias com fluxo contínuo de manutenção, estruturamos planos preventivos e corretivos em campo e em fábrica, reduzindo paradas não programadas e prolongando a vida útil do parque de máquinas.",
  },
  {
    question: "Vocês são assistência técnica autorizada de quais marcas?",
    answer:
      "Somos Assistência Técnica Autorizada WEG e WEG Energia, uma das maiores de Santa Catarina, e credenciados por Ebara, Thebe, Famac, Homa, Buffalo, Lepono, Lintec e Altri. Também atendemos equipamentos de outras marcas, como Flygt e Sulzer.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-primary-950 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-accent-400 uppercase">
            Dúvidas frequentes
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-base text-primary-300">
            Ainda com dúvidas? Fale direto com nossa equipe técnica.
          </p>
          <CtaButton
            href={quoteHref("faq")}
            icon={<ClipboardCheck size={18} />}
            className="mt-6"
          >
            Falar com um especialista
          </CtaButton>
        </div>

        <div className="mt-12 divide-y divide-primary-800 border-t border-b border-primary-800">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-accent-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-sm leading-relaxed text-primary-300">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ estruturado para o Google e assistentes de IA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </section>
  );
}
