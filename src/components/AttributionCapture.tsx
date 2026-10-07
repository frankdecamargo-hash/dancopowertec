"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/tracking";

// Salva UTMs, gclid e oppref assim que a pessoa chega ao site, para que
// continuem disponíveis quando ela abrir o formulário de orçamento.
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
