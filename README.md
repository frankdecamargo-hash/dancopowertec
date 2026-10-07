# Landing page — Danco | Powertec

Next.js 16 + Tailwind 4 + motion, com a mesma base da LP do Dr. Pandini.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

> Rode o projeto fora do Google Drive (ex.: `Desktop\Clientes\...`). O Drive
> não aguenta o `node_modules` e o `npm install` falha com `EBADF`.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Telefone, WhatsApp, e-mail, endereço, redes, vídeo institucional | `src/lib/site-config.ts` |
| Serviços do carrossel | `src/components/ServicesCarousel.tsx` |
| Logos de clientes | `src/components/ClientLogos.tsx` + `public/clientes/` |
| Certificados (PDFs) | `src/components/Certifications.tsx` + `public/certificados/` |
| Galeria de obras | `src/components/ProjectsGallery.tsx` + `public/obras/` |
| Vídeos verticais (Shorts) | `src/components/VideoReels.tsx` — a seção só aparece quando houver IDs |
| FAQ | `src/components/FAQ.tsx` |
| Texto para IAs (ChatGPT etc.) | `public/llms.txt` |
| Perguntas do formulário de orçamento e regra de MQL | `src/lib/lead-form.ts` |

## Tags instaladas

- **Google Tag Manager** `GTM-PTDTSVJK` no `<head>` + `noscript` no `<body>` (`src/app/layout.tsx`).
  Pode ser trocado por `NEXT_PUBLIC_GTM_ID` sem mexer no código.
- **Meta Pixel** `1310133514653481` com PageView em todas as páginas.

Para medir os cliques no WhatsApp pelo GTM: acionador "Clique - Apenas links"
com URL do clique contendo `api.whatsapp.com`.

## CTAs

Todos os CTAs abrem o WhatsApp (47) 9 9988-0544 com uma mensagem pronta,
adaptada ao botão (cards de serviço, visita à fábrica, coleta). A regra fica em
`quoteHref` em `src/lib/site-config.ts`.

## Formulário de orçamento (/orcamento), desativado

O formulário de qualificação continua no projeto, mas nenhum botão aponta para
ele. Para reativar, faça `quoteHref` voltar a retornar
`/orcamento?origem=...&servico=...`. Com `?servico=`, ele pula a pergunta do equipamento.

- **Pessoa física** e **compra de produto novo** encerram o formulário com uma
  mensagem explicando o foco da empresa. A linha vai para a planilha sem dados
  pessoais, com status `desqualificado_*`, para medir a qualidade das campanhas.
- **Empresas e órgãos públicos** seguem até o fim. O status é `mql` (grande porte,
  contrato, equipamento Ex ou setor foco) ou `lead`.
- No obrigado aparece o botão do WhatsApp com o resumo da solicitação.

### Planilha

1. Crie a planilha e cole `integracoes/google-sheets-apps-script.gs` em Extensões > Apps Script.
2. Publique como App da Web (executar como você, acesso: qualquer pessoa).
3. Coloque a URL `/exec` em `NEXT_PUBLIC_LEADS_ENDPOINT`.

Sem essa variável o formulário funciona, mas os leads **não são salvos** (só aparecem no console).

### Conversões

Variáveis em `.env.example`:

- `NEXT_PUBLIC_GOOGLE_ADS_ID` + `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`: conversão do Google Ads no envio.
- `NEXT_PUBLIC_OPENAI_PIXEL_ID`: evento `lead_created` do ChatGPT Ads no envio.
- `NEXT_PUBLIC_GTM_ID`: troca o container do GTM (padrão `GTM-PTDTSVJK`). Eventos no dataLayer: `lead_form_start`,
  `lead_disqualified`, `lead_submit` (com `lead_status`) e `whatsapp_click`.
- A URL do obrigado recebe `?conversao=obrigado&status=mql|lead`, útil para conversão por URL.

O mesmo `event_id` vai para a planilha e para os pixels, permitindo deduplicar
conversões offline depois. UTMs, gclid, gbraid, wbraid e oppref (ChatGPT) são
capturados na chegada ao site e gravados junto com o lead.

## Pendências com o cliente

- [ ] IDs de conversão do Google Ads e pixel do ChatGPT Ads da conta Danco
- [ ] Vídeo institucional (Fillmes) → `institutionalVideoId` no site-config
- [ ] Shorts da fábrica (Fillmes) → `VideoReels.tsx`
- [ ] Logos oficiais de Positivo, Automatique, Grupo Cometa, EZA e Bufom
- [ ] Depoimentos reais ou cases (nome, empresa, cargo) para uma seção de depoimentos
- [ ] PDF do certificado Bureau Veritas (ISO 9001 / NBR IEC 60079-79), credencial WEG Energia e Altri
- [ ] Validar: fluxo "laudo + orçamento antes de executar", bases em PR/SP/RS e números (+80 colaboradores, +2.500 clientes)
- [ ] Domínio/subdomínio da LP e ajustar `url` no site-config
