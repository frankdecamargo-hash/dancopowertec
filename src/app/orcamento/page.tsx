import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import LeadForm from "@/components/lead-form/LeadForm";

export const metadata: Metadata = {
  title: "Solicitar orçamento | Danco | Powertec",
  description:
    "Solicite o orçamento de manutenção ou rebobinamento do seu motor, gerador, transformador ou motobomba industrial.",
  robots: { index: false, follow: true },
};

export default function OrcamentoPage() {
  return (
    <main className="bg-blueprint relative min-h-dvh flex-1 bg-primary-950 pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(240,90,26,0.16),transparent_55%)]"
      />

      <div className="relative bg-gradient-to-r from-accent-600 via-accent-500 to-accent-600 px-4 py-3 text-center text-[11px] font-extrabold tracking-wide text-white uppercase sm:text-xs">
        Atendimento exclusivo para indústrias e empresas
      </div>

      <div className="relative mx-auto w-full max-w-xl px-5 sm:px-6">
        <div className="flex items-center justify-between py-7 sm:py-9">
          <Link href="/" aria-label="Voltar ao site">
            <BrandLogo invert className="gap-2 sm:gap-3 [&_img]:h-5 sm:[&_img]:h-6" />
          </Link>
          <Link
            href="/"
            className="hidden items-center gap-1.5 text-xs text-primary-400 hover:text-white sm:inline-flex"
          >
            <ArrowLeft size={14} /> Voltar ao site
          </Link>
        </div>

        <LeadForm />
      </div>
    </main>
  );
}
