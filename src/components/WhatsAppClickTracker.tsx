"use client";

import { useEffect } from "react";
import { trackWhatsAppClick } from "@/lib/tracking";

// Um único listener para todos os links de WhatsApp da página, inclusive
// os que forem adicionados depois. Roda na fase de captura, antes da nova aba abrir.
export default function WhatsAppClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (!/(?:api\.whatsapp\.com|wa\.me)\//.test(link.href)) return;
      trackWhatsAppClick(link);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
