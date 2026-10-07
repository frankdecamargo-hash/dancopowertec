"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ClipboardCheck, PlayCircle, Volume2, VolumeX } from "lucide-react";
import { quoteHref } from "@/lib/site-config";
import CtaButton from "@/components/CtaButton";

interface Reel {
  // Cole aqui o ID do vídeo do YouTube (ex.: em youtube.com/watch?v=ABC123, o ID é "ABC123").
  // Deixe vazio para manter o slot como placeholder.
  youtubeId?: string;
  title: string;
}

// Vídeos verticais (Shorts) produzidos pela Fillmes. Cole os IDs do YouTube
// aqui; enquanto a lista estiver vazia a seção não aparece no site.
const REELS: Reel[] = [
  // { youtubeId: "ABC123", title: "Rebobinamento de motor 500 CV" },
];

function postToPlayer(iframe: HTMLIFrameElement | null, func: string) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args: [] }),
    "https://www.youtube.com"
  );
}

function ReelCard({ reel }: { reel: Reel }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearby(entry.isIntersecting),
      { rootMargin: "800px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    postToPlayer(iframeRef.current, muted ? "unMute" : "mute");
    setMuted((prev) => !prev);
  };

  return (
    <div
      ref={cardRef}
      className="relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl bg-primary-900 shadow-lg shadow-primary-950/40 sm:w-[240px]"
    >
      {reel.youtubeId ? (
        <>
          {isNearby ? (
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${reel.youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&cc_load_policy=0&iv_load_policy=3&disablekb=1`}
              title={reel.title}
              className="absolute"
              style={{ top: "-48%", left: "-40%", width: "180%", height: "180%" }}
              allow="autoplay; encrypted-media"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Ativar som" : "Silenciar"}
            className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-950/70 text-white backdrop-blur-sm transition-colors hover:bg-primary-950/90"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </>
      ) : (
        <div className="absolute inset-3 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary-700 p-4 text-center">
          <PlayCircle size={28} className="text-primary-400" />
          <p className="text-xs font-medium text-primary-300">
            {reel.title}
          </p>
          <p className="text-[10px] text-primary-500">
            Inserir ID do vídeo do YouTube
          </p>
        </div>
      )}
    </div>
  );
}

export default function VideoReels() {
  if (REELS.length === 0) return null;

  // Com poucos vídeos únicos, repetimos mais vezes para a faixa ficar
  // larga o bastante e o loop parecer contínuo em telas grandes.
  const copies = Math.max(3, Math.ceil(18 / REELS.length));
  const track = Array.from({ length: copies }, () => REELS).flat();
  const marqueeStyle = {
    "--marquee-distance": `-${(100 / copies).toFixed(4)}%`,
  } as CSSProperties;

  return (
    <section className="overflow-hidden border-b border-primary-800 bg-gradient-to-r from-primary-950 to-primary-800 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
        <p className="text-sm font-semibold tracking-wide text-accent-400 uppercase">
          Por dentro da fábrica
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Veja o trabalho de perto
        </h2>
        <p className="mt-4 text-base text-primary-300">
          Bastidores reais de rebobinamentos, testes e atendimentos em campo.
        </p>
      </div>

      <div className="mt-14 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-6" style={marqueeStyle}>
          {track.map((reel, i) => (
            <ReelCard key={i} reel={reel} />
          ))}
        </div>
      </div>

      <div className="mt-14 flex justify-center px-6">
        <CtaButton href={quoteHref("videos")} icon={<ClipboardCheck size={18} />}>
          Solicitar orçamento técnico
        </CtaButton>
      </div>
    </section>
  );
}
