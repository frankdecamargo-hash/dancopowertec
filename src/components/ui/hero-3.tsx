"use client";

import React from "react";
import { motion } from "motion/react";
import { ClipboardCheck, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import CtaButton from "@/components/CtaButton";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  badges?: string[];
  images: string[];
  className?: string;
}

const FADE_IN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export function AnimatedMarqueeHero({
  tagline,
  title,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  badges = [],
  images,
  className,
}: AnimatedMarqueeHeroProps) {
  // Com poucas imagens únicas, repetimos mais vezes para a faixa ficar
  // larga o bastante e o loop parecer contínuo em telas grandes.
  const copies = Math.max(3, Math.ceil(18 / images.length));
  const track = Array.from({ length: copies }, () => images).flat();
  const marqueeDistance = `-${(100 / copies).toFixed(4)}%`;

  // No mobile usamos menos imagens únicas e menos cópias para manter a
  // faixa animada leve (menos nós no DOM, mesma técnica de transform do
  // desktop, que já é leve por rodar via GPU).
  const mobileImages = images.slice(0, 6);
  const mobileCopies = Math.max(2, Math.ceil(10 / mobileImages.length));
  const mobileTrack = Array.from(
    { length: mobileCopies },
    () => mobileImages
  ).flat();
  const mobileMarqueeDistance = `-${(100 / mobileCopies).toFixed(4)}%`;

  return (
    <section
      id="inicio"
      className={cn(
        "bg-blueprint relative flex w-full flex-col items-center overflow-hidden bg-primary-950 px-4 pt-28 pb-16 text-center sm:min-h-[max(100dvh,860px)] sm:justify-center sm:py-0",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(240,90,26,0.18),transparent_55%)]"
      />

      <div className="z-10 flex flex-col items-center pb-8 sm:pt-32 sm:pb-60">
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-primary-200 backdrop-blur-sm sm:text-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden />
          {tagline}
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="max-w-5xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          <motion.span variants={FADE_IN_ANIMATION_VARIANTS} className="inline">
            {title}
          </motion.span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-2xl text-base text-primary-200 sm:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <CtaButton href={ctaHref} icon={<ClipboardCheck size={18} />}>
            {ctaText}
          </CtaButton>
          {secondaryCtaText && secondaryCtaHref && (
            <CtaButton
              href={secondaryCtaHref}
              icon={<Phone size={16} />}
              variant="ghost"
            >
              {secondaryCtaText}
            </CtaButton>
          )}
        </motion.div>

        {badges.length > 0 && (
          <motion.ul
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            transition={{ delay: 0.7 }}
            className="mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {badges.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-2 text-xs font-medium tracking-wide text-primary-300 uppercase"
              >
                <span className="h-1 w-3 rounded-full bg-signal-400" aria-hidden />
                {badge}
              </li>
            ))}
          </motion.ul>
        )}
      </div>

      {/* Mobile: faixa animada mais leve, em fluxo normal (nunca sobrepõe o texto/CTA) */}
      <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:hidden">
        <motion.div
          className="flex gap-3"
          animate={{ x: [mobileMarqueeDistance, "0%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {mobileTrack.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-40 shrink-0 overflow-hidden rounded-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading={index < mobileImages.length ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Desktop/tablet: faixa animada em loop */}
      <div className="absolute bottom-0 left-0 hidden h-1/3 w-full [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] sm:block md:h-2/5">
        <motion.div
          className="flex gap-4"
          animate={{ x: [marqueeDistance, "0%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {track.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-48 shrink-0 md:h-64"
              style={{ rotate: `${index % 2 === 0 ? -2 : 5}deg` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading={index < images.length ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full rounded-2xl object-cover shadow-md"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
