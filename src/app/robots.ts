import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Gerado no build: o site é publicado como export estático.
export const dynamic = "force-static";

// Libera buscadores e crawlers de IA (ChatGPT/OpenAI, Perplexity, Claude, Gemini).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
