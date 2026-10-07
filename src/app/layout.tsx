import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Barlow_Condensed } from "next/font/google";
import AttributionCapture from "@/components/AttributionCapture";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// Defina NEXT_PUBLIC_GTM_ID (ex.: GTM-XXXXXXX) no ambiente de produção para
// ativar o Google Tag Manager (conversões do Google Ads, GA4, cliques no WhatsApp).
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const title =
  "Danco | Powertec | Manutenção e Rebobinamento de Motores Elétricos, Geradores e Transformadores";
const description =
  "Rebobinamento, rejuvenescimento e manutenção de motores elétricos até 2.500 CV, motores à prova de explosão, motobombas, geradores e transformadores para a indústria pesada. ISO 9001, NBR IEC 60079-79, Assistência Técnica Autorizada WEG. Parque fabril de 2.000 m² em Jaraguá do Sul - SC, atendendo SC, PR, SP e RS.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  keywords: [
    "rebobinamento de motores elétricos",
    "manutenção de motores elétricos",
    "manutenção de motores de média tensão",
    "motor à prova de explosão manutenção",
    "manutenção de geradores",
    "manutenção de transformadores",
    "manutenção de motobombas",
    "bombas submersíveis manutenção",
    "manutenção industrial Santa Catarina",
    "manutenção de motores Paraná",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.companyName,
    title,
    description,
    images: [{ url: "/estrutura/fabrica-vista-de-cima.webp", width: 1600, height: 1200 }],
  },
  icons: {
    icon: "/marca/favicon.png",
  },
};

// Dados estruturados: ajudam Google e assistentes de IA (ChatGPT, Gemini)
// a entender quem é a empresa, o que faz e onde atende.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#empresa`,
  name: siteConfig.companyName,
  alternateName: ["Danco Motores", "Powertec Geradores", "Danco Powertec"],
  description,
  url: siteConfig.url,
  image: `${siteConfig.url}/estrutura/fabrica-vista-de-cima.webp`,
  logo: `${siteConfig.url}/marca/favicon.png`,
  telephone: `+${siteConfig.phone}`,
  email: siteConfig.email,
  foundingDate: String(siteConfig.foundedYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.cep,
    addressCountry: "BR",
  },
  areaServed: [
    "Santa Catarina",
    "Paraná",
    "São Paulo",
    "Rio Grande do Sul",
  ].map((name) => ({ "@type": "State", name })),
  hasCredential: [
    "ISO 9001 (Bureau Veritas)",
    "ABNT NBR IEC 60079-79: reparo de equipamentos para atmosferas explosivas",
    "Assistência Técnica Autorizada WEG",
    "Assistência Técnica Autorizada WEG Energia",
  ],
  knowsAbout: [
    "Rebobinamento de motores elétricos",
    "Manutenção de motores elétricos de baixa e média tensão até 2.500 CV",
    "Reparo de motores à prova de explosão",
    "Manutenção de grupos geradores",
    "Manutenção de transformadores",
    "Manutenção de motobombas e bombas submersíveis",
    "Manutenção de subestações",
  ],
  sameAs: Object.values(siteConfig.social),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${jakarta.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-primary-900">
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AttributionCapture />
        {children}
      </body>
    </html>
  );
}
