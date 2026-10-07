"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { quoteHref } from "@/lib/site-config";

const ChevronLeftIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export interface CarouselItem {
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface ServicesCarouselProps {
  items?: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

// Abre o formulário já com o equipamento do card selecionado.
const askAbout = (servico: string) => quoteHref(`carrossel-${servico}`, servico);

export const defaultServices: CarouselItem[] = [
  {
    tag: "01",
    titleLine1: "REBOBINAMENTO",
    titleLine2: "DE MOTORES ELÉTRICOS",
    desc: "Rebobinamento e rejuvenescimento de motores de baixa e média tensão, até 2.500 CV.",
    img: "/estrutura/bobinadeira.webp",
    ctaText: "Solicitar orçamento",
    ctaUrl: askAbout("motor"),
  },
  {
    tag: "02",
    titleLine1: "MOTORES À PROVA",
    titleLine2: "DE EXPLOSÃO",
    desc: "Reparo certificado NBR IEC 60079-79 para atmosferas explosivas (Ex).",
    img: "/estrutura/fabrica-ponte-rolante.webp",
    ctaText: "Solicitar orçamento",
    ctaUrl: askAbout("ex"),
  },
  {
    tag: "03",
    titleLine1: "GRUPOS",
    titleLine2: "GERADORES",
    desc: "Manutenção preventiva e corretiva, revisão e fabricação de geradores e alternadores.",
    img: "/obras/gerador-mtu.webp",
    ctaText: "Solicitar orçamento",
    ctaUrl: askAbout("gerador"),
  },
  {
    tag: "04",
    titleLine1: "TRANSFORMADORES",
    desc: "Manutenção, reforma e recuperação de transformadores de força e distribuição.",
    img: "/obras/transformador-oficina.webp",
    ctaText: "Solicitar orçamento",
    ctaUrl: askAbout("transformador"),
  },
  {
    tag: "05",
    titleLine1: "MOTOBOMBAS E",
    titleLine2: "BOMBAS SUBMERSÍVEIS",
    desc: "Reparo com teste hidráulico em tanque próprio: Flygt, Sulzer, Ebara, Famac e outras.",
    img: "/estrutura/fabrica-bombas.webp",
    ctaText: "Solicitar orçamento",
    ctaUrl: askAbout("bomba"),
  },
  {
    tag: "06",
    titleLine1: "SUBESTAÇÕES",
    titleLine2: "E PAINÉIS",
    desc: "Manutenção de subestações, painéis elétricos e servomotores industriais.",
    img: "/obras/painel-media-tensao.webp",
    ctaText: "Solicitar orçamento",
    ctaUrl: askAbout("subestacao"),
  },
  {
    tag: "07",
    titleLine1: "MANUTENÇÃO",
    titleLine2: "PREVENTIVA E CORRETIVA",
    desc: "Planos de manutenção em campo para evitar paradas não programadas da sua planta.",
    img: "/obras/gerador-inspecao.webp",
    ctaText: "Solicitar orçamento",
    ctaUrl: askAbout("preventiva"),
  },
];

export function ServicesCarousel({
  items = defaultServices,
  sectionLabel = "SERVIÇOS",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
}: ServicesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx % total);
  };

  useEffect(() => {
    if (!autoplay || isHovered || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isHovered, nextSlide, total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section
      id="servicos"
      className={`relative w-full min-h-[760px] flex items-center justify-center overflow-hidden py-16 select-none ${className}`}
      style={{
        backgroundColor: "#0d1014",
        color: "#ffffff",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={items[currentIndex]?.img}
          alt=""
          aria-hidden
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.22) blur(32px)",
            transform: "scale(1.15)",
            transition: "opacity 1000ms ease, filter 1000ms ease",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(13,16,20,0.3) 0%, rgba(13,16,20,0.94) 100%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 z-10 flex flex-col items-center">
        {sectionLabel && (
          <div className="flex items-center gap-3 mb-4">
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, transparent, #ff7a3d)" }} />
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#ff7a3d",
                margin: 0,
              }}
            >
              {sectionLabel}
            </p>
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #ff7a3d, transparent)" }} />
          </div>
        )}

        <h2 className="mb-10 max-w-2xl text-center text-3xl font-bold text-white sm:text-4xl">
          Especialistas em máquinas elétricas de grande porte
        </h2>

        <div
          className="relative w-full h-[520px] flex justify-center items-center mb-8"
          style={{ perspective: "1400px" }}
        >
          {items.map((item, idx) => {
            const offset = (idx - currentIndex + total) % total;

            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(0.4) blur(2px)";
            let isCenter = false;

            if (offset === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (offset === 1) {
              transform = "translateX(285px) scale(0.84) rotateY(-24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === 2) {
              transform = "translateX(510px) scale(0.68) rotateY(-38deg)";
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            } else if (offset === total - 1) {
              transform = "translateX(-285px) scale(0.84) rotateY(24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === total - 2) {
              transform = "translateX(-510px) scale(0.68) rotateY(38deg)";
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            }

            return (
              <div
                key={item.titleLine1}
                onClick={() => !isCenter && goToSlide(idx)}
                style={{
                  position: "absolute",
                  width: "330px",
                  height: "500px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  backgroundColor: "#171b21",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: "center center",
                  transition: "all 800ms cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: isCenter
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(255,122,61,0.25)"
                    : "0 15px 35px rgba(0,0,0,0.5)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt={item.titleLine1}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.96) 100%)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    padding: "20px 18px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                    zIndex: 20,
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? "translateY(0px)" : "translateY(16px)",
                    transition: "opacity 500ms ease, transform 500ms ease",
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "3px",
                      marginTop: "auto",
                      paddingBottom: "4px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.65rem",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.1,
                        textShadow: "0 3px 12px rgba(0,0,0,0.95)",
                      }}
                    >
                      {item.titleLine1}
                    </h3>

                    {item.titleLine2 && (
                      <span
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "#f5f6f7",
                          lineHeight: 1.2,
                          textShadow: "0 3px 10px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.titleLine2}
                      </span>
                    )}

                    <div
                      style={{
                        width: "34px",
                        height: "2px",
                        backgroundColor: "#ff7a3d",
                        borderRadius: "2px",
                        margin: "5px auto 4px",
                        boxShadow: "0 0 8px rgba(255,122,61,0.7)",
                      }}
                    />

                    {item.desc && (
                      <p
                        style={{
                          fontSize: "0.82rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.9)",
                          maxWidth: "280px",
                          margin: "0 0 10px",
                          lineHeight: 1.3,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc}
                      </p>
                    )}

                    <a
                      href={item.ctaUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform duration-200 hover:scale-[1.06]"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 18px",
                        borderRadius: "9999px",
                        background: "linear-gradient(135deg, #ff7a3d 0%, #f05a1a 100%)",
                        color: "#0d1014",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.4), 0 0 15px rgba(240,90,26,0.35)",
                        cursor: "pointer",
                      }}
                    >
                      <span>{item.ctaText || "Saiba mais"}</span>
                      <ArrowRightIcon />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={prevSlide}
          aria-label="Serviço anterior"
          style={{
            position: "absolute",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronLeftIcon />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Próximo serviço"
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronRightIcon />
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 30 }}>
          {items.map((item, idx) => (
            <button
              key={item.titleLine1}
              onClick={() => goToSlide(idx)}
              aria-label={`Ir para ${item.titleLine1}`}
              style={{
                height: "8px",
                width: idx === currentIndex ? "28px" : "8px",
                borderRadius: "9999px",
                backgroundColor: idx === currentIndex ? "#ff7a3d" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                boxShadow: idx === currentIndex ? "0 0 10px rgba(255,122,61,0.7)" : "none",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesCarousel;
