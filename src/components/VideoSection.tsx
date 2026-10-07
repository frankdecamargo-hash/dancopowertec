"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ClipboardCheck, Play } from "lucide-react";
import { quoteHref, siteConfig } from "@/lib/site-config";
import CtaButton from "@/components/CtaButton";

const HIGHLIGHTS = [
  "Parque fabril próprio de 2.000 m² em Jaraguá do Sul - SC",
  "Ponte rolante de 10 toneladas e tanque para testes hidráulicos (Flygt, Sulzer)",
  "Laboratório e bancadas de ensaios elétricos",
  "Profissionais treinados pelos fabricantes e frota própria de coleta",
  "Bases de atendimento em SC, PR, SP e RS",
];

const GALLERY = [
  { src: "/estrutura/fabrica-ponte-rolante.webp", alt: "Ponte rolante e área de montagem" },
  { src: "/estrutura/producao-laboratorio.webp", alt: "Laboratório de ensaios elétricos" },
  { src: "/estrutura/recepcao.webp", alt: "Recepção Danco | Powertec" },
];

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const videoId = siteConfig.institutionalVideoId;

  return (
    <section id="estrutura" className="bg-sand-50 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-wide text-accent-500 uppercase">
            Nossa estrutura
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary-950 sm:text-4xl">
            Uma oficina não.
            <br />
            Um parque fabril completo.
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-primary-700">
            A {siteConfig.companyName} é a união de duas empresas catarinenses
            especializadas em máquinas elétricas. Desmontagem, diagnóstico,
            rebobinamento, montagem e testes acontecem sob o mesmo teto, com
            padronização e rastreabilidade ISO 9001 em cada ordem de serviço.
          </p>

          <ul className="mt-8 space-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-primary-800">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-accent-600">
                  <Check size={13} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <CtaButton
              href={quoteHref("visita-fabrica")}
              icon={<ClipboardCheck size={18} />}
              className="mt-10"
            >
              Agendar visita à fábrica
            </CtaButton>
          </div>
        </div>

        <div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-primary-900 shadow-xl shadow-primary-950/10">
            {playing && videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title="Vídeo institucional Danco | Powertec"
                className="absolute inset-0 h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => videoId && setPlaying(true)}
                className={`group absolute inset-0 ${videoId ? "cursor-pointer" : "cursor-default"}`}
                aria-label={videoId ? "Assistir vídeo institucional" : "Parque fabril Danco | Powertec"}
              >
                <Image
                  src="/estrutura/fabrica-vista-de-cima.webp"
                  alt="Vista aérea do parque fabril da Danco | Powertec em Jaraguá do Sul"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-primary-950/10 to-primary-950/20"
                  aria-hidden
                />
                {videoId && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-primary-900 shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                      <Play size={28} className="ml-1 fill-current" />
                    </span>
                  </span>
                )}
                <span className="absolute bottom-5 left-5 rounded-full bg-primary-950/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm">
                  {videoId ? "Conheça a fábrica por dentro" : "Parque fabril · Jaraguá do Sul - SC"}
                </span>
              </button>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {GALLERY.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md shadow-primary-950/5"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 180px, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center lg:hidden">
            <CtaButton
              href={quoteHref("visita-fabrica")}
              icon={<ClipboardCheck size={18} />}
            >
              Agendar visita à fábrica
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
