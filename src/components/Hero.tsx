import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { quoteHref, siteConfig } from "@/lib/site-config";

const HERO_IMAGES = [
  "/estrutura/fabrica-vista-de-cima.webp",
  "/obras/gerador-mtu.webp",
  "/estrutura/bobinadeira.webp",
  "/obras/transformador-oficina.webp",
  "/estrutura/fabrica-bombas.webp",
  "/obras/painel-media-tensao.webp",
  "/estrutura/producao-bancadas.webp",
  "/obras/gerador-icamento.webp",
  "/estrutura/fabrica-ponte-rolante.webp",
  "/obras/frota-caminhao-munck.webp",
];

export default function Hero() {
  return (
    <AnimatedMarqueeHero
      tagline={`Desde ${siteConfig.foundedYear} · ISO 9001 · NBR IEC 60079-79 (Ex) · Autorizada WEG`}
      title={
        <>
          Manutenção e rebobinamento
          <br className="hidden sm:block" />{" "}
          <span className="bg-gradient-to-r from-accent-500 to-signal-400 bg-clip-text text-transparent">
            de motores até 2.500 CV
          </span>
        </>
      }
      description="Recuperamos motores elétricos, motores à prova de explosão, motobombas, geradores e transformadores da indústria pesada, com laudo técnico, testes de bancada e rastreabilidade ISO 9001."
      ctaText="Solicitar orçamento técnico"
      ctaHref={quoteHref("hero")}
      images={HERO_IMAGES}
    />
  );
}
