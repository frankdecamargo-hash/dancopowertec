"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import {
  ClipboardCheck,
  FileSearch,
  Gauge,
  Truck,
  Wrench,
} from "lucide-react";
import { quoteHref } from "@/lib/site-config";
import CtaButton from "@/components/CtaButton";

const STEPS = [
  {
    icon: Truck,
    number: "01",
    title: "Solicitação e coleta",
    description:
      "Você envia os dados do equipamento e nós buscamos na sua planta com frota própria.",
  },
  {
    icon: FileSearch,
    number: "02",
    title: "Diagnóstico e orçamento",
    description:
      "Desmontagem, inspeção e ensaios elétricos. Você recebe o laudo técnico e o orçamento antes de qualquer execução.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Execução do reparo",
    description:
      "Rebobinamento, rejuvenescimento ou recuperação com profissionais treinados pelos fabricantes.",
  },
  {
    icon: Gauge,
    number: "04",
    title: "Testes e entrega",
    description:
      "Ensaios de bancada e testes hidráulicos quando aplicável. Entregamos com relatório e rastreabilidade ISO 9001.",
  },
];

export default function HowItWorks() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.6"],
  });

  return (
    <section id="como-funciona" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-accent-500 uppercase">
            Como funciona
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary-950 sm:text-4xl">
            Do chamado à máquina rodando
          </h2>
          <p className="mt-4 text-base text-primary-600">
            Um processo transparente, com diagnóstico documentado e aprovação
            do orçamento antes de qualquer intervenção.
          </p>
        </div>

        {/* Mobile: cards em quadro com linha de progresso animada no scroll */}
        <div ref={listRef} className="relative mt-16 space-y-6 pl-6 sm:hidden">
          <div
            className="absolute top-1 bottom-1 left-0 w-[3px] rounded-full bg-primary-100"
            aria-hidden
          />
          <motion.div
            className="absolute top-1 left-0 h-[calc(100%-0.5rem)] w-[3px] origin-top rounded-full bg-accent-500"
            style={{ scaleY: scrollYProgress }}
            aria-hidden
          />

          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-primary-100 bg-sand-50 p-6 shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-accent-500 shadow-sm">
                <step.icon size={24} />
              </div>
              <span className="font-display mt-5 block text-4xl font-semibold text-primary-200">
                {step.number}
              </span>
              <h3 className="mt-2 font-semibold text-primary-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop/tablet: layout em grade */}
        <div className="mt-16 hidden gap-10 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-accent-500">
                <step.icon size={24} />
              </div>
              <span className="font-display mt-5 block text-4xl font-semibold text-primary-200">
                {step.number}
              </span>
              <h3 className="mt-2 font-semibold text-primary-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                {step.description}
              </p>

              {index < STEPS.length - 1 && (
                <div
                  className="absolute top-7 left-[calc(100%-1.25rem)] hidden h-px w-[calc(100%-2rem)] bg-primary-200 lg:block"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <CtaButton
            href={quoteHref("coleta")}
            icon={<ClipboardCheck size={18} />}
          >
            Solicitar coleta do equipamento
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
