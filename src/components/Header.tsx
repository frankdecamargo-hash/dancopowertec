"use client";

import { useEffect, useState } from "react";
import { siteConfig, quoteHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/BrandLogo";

const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#clientes", label: "Clientes" },
  { href: "#faq", label: "Dúvidas" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const hero = document.getElementById("inicio");
      setInHero(!hero || window.scrollY < hero.offsetHeight - 64);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-white/10 bg-primary-950/90 shadow-lg shadow-black/20 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#inicio" aria-label={siteConfig.companyName}>
          <BrandLogo invert className="gap-2 sm:gap-3 [&_img]:h-4 sm:[&_img]:h-6" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-primary-200 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={quoteHref("menu")}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold text-white transition-colors sm:px-5 sm:text-sm",
              // Vazado enquanto estiver no hero, para não competir com o CTA principal
              inHero
                ? "border-accent-400 bg-transparent hover:bg-accent-500/10"
                : "border-accent-500 bg-accent-500 hover:bg-accent-400"
            )}
          >
            <span className="sm:hidden">Orçamento</span>
            <span className="hidden sm:inline">Solicitar orçamento</span>
          </a>
        </div>
      </div>
    </header>
  );
}
