"use client";

import React from "react";
import { motion } from "motion/react";
import { ClipboardCheck } from "lucide-react";
import { quoteHref } from "@/lib/site-config";
import CtaButton from "@/components/CtaButton";

interface Project {
  img: string;
  tag: string;
  title: string;
  tall?: boolean;
}

const projects: Project[] = [
  { img: "/obras/gerador-mtu.webp", tag: "Geradores", title: "Grupo gerador MTU em sala de máquinas", tall: true },
  { img: "/obras/transformador-oficina.webp", tag: "Transformadores", title: "Recuperação de transformador na oficina" },
  { img: "/estrutura/fabrica-bombas.webp", tag: "Bombas submersíveis", title: "Motobombas prontas para teste hidráulico" },
  { img: "/obras/subestacao-poste.webp", tag: "Subestações", title: "Manutenção em rede e subestação", tall: true },
  { img: "/obras/usina-geradores.webp", tag: "Energia", title: "Parque de geradores em operação" },
  { img: "/obras/gerador-icamento.webp", tag: "Logística", title: "Içamento e transporte de gerador com frota própria", tall: true },
  { img: "/estrutura/producao-bancadas.webp", tag: "Motores elétricos", title: "Bancadas de desmontagem e montagem" },
  { img: "/obras/painel-media-tensao.webp", tag: "Painéis", title: "Manobra em painel de média tensão", tall: true },
  { img: "/obras/sala-geradores.webp", tag: "Geradores", title: "Sala de geradores" },
  { img: "/estrutura/bobinadeira.webp", tag: "Rebobinamento", title: "Bobinagem de estator", tall: true },
  { img: "/obras/frota-carros.webp", tag: "Atendimento em campo", title: "Frota própria para atendimento técnico" },
  { img: "/obras/gerador-cummins.webp", tag: "Geradores", title: "Grupo gerador Cummins", tall: true },
  { img: "/obras/usina-containers.webp", tag: "Energia", title: "Geradores containerizados" },
  { img: "/obras/linha-viva.webp", tag: "Campo", title: "Equipe em serviço de rede elétrica", tall: true },
  { img: "/estrutura/fabrica-corredor.webp", tag: "Estrutura", title: "Linha de produção organizada e sinalizada" },
];

function ProjectsColumn(props: {
  className?: string;
  projects: Project[];
  duration?: number;
}) {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {new Array(2).fill(0).map((_, dupIndex) => (
          <React.Fragment key={dupIndex}>
            {props.projects.map((project, i) => (
              <figure
                key={i}
                className="w-full max-w-xs overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-lg shadow-primary-900/5"
              >
                <div className={`relative ${project.tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.img}
                    alt={dupIndex === 0 ? project.title : ""}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <figcaption className="p-5">
                  <span className="text-[11px] font-semibold tracking-wide text-accent-500 uppercase">
                    {project.tag}
                  </span>
                  <p className="mt-1 text-sm font-semibold leading-snug text-primary-950">
                    {project.title}
                  </p>
                </figcaption>
              </figure>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

const firstColumn = projects.slice(0, 5);
const secondColumn = projects.slice(5, 10);
const thirdColumn = projects.slice(10, 15);

export default function ProjectsGallery() {
  return (
    <section id="obras" className="relative overflow-hidden bg-sand-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-xl flex-col items-center text-center"
        >
          <p className="text-sm font-semibold tracking-wide text-accent-500 uppercase">
            Na prática
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary-950 sm:text-4xl">
            Serviços que realizamos todos os dias
          </h2>
          <p className="mt-4 text-base text-primary-700">
            Registros reais da nossa fábrica e das equipes em campo.
          </p>
        </motion.div>

        <div className="mt-14 flex max-h-[760px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <ProjectsColumn projects={firstColumn} duration={30} />
          <ProjectsColumn
            projects={secondColumn}
            className="hidden md:block"
            duration={38}
          />
          <ProjectsColumn
            projects={thirdColumn}
            className="hidden lg:block"
            duration={34}
          />
        </div>

        <div className="mt-10 flex justify-center">
          <CtaButton href={quoteHref("galeria")} icon={<ClipboardCheck size={18} />}>
            Quero um orçamento para meu equipamento
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
