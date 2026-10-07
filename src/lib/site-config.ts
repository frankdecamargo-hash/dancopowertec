// Dados centrais do site. Edite aqui para atualizar em todas as seções.
export const siteConfig = {
  companyName: "Danco | Powertec",
  companyShortName: "Danco Powertec",
  url: "https://dancopowertec.com.br",
  foundedYear: 2005,
  whatsappNumber: "5547999880544", // apenas números, com DDI 55 + DDD
  whatsappDisplay: "(47) 9 9988-0544",
  whatsappDefaultMessage:
    "Olá! Vim pelo site e preciso de um orçamento de manutenção.",
  phone: "554730540100",
  phoneDisplay: "(47) 3054-0100",
  email: "contato@dancomotores.com.br",
  address: {
    street: "R. Germano Stricker, 960 - Estrada Nova",
    city: "Jaraguá do Sul",
    state: "SC",
    complement: "Jaraguá do Sul - SC",
    cep: "89265-100",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Danco+Powertec+R.+Germano+Stricker+960+Jaragu%C3%A1+do+Sul",
  regions: ["SC", "PR", "SP", "RS"],
  social: {
    instagram: "https://www.instagram.com/dancopowertec/",
    linkedin: "https://www.linkedin.com/company/dancomotores/",
    facebook: "https://www.facebook.com/dancopowertec",
  },
  // ID do vídeo institucional no YouTube (ex.: em youtube.com/watch?v=ABC123, o ID é "ABC123").
  // Deixe vazio enquanto o vídeo da Fillmes não estiver publicado.
  institutionalVideoId: "",
};

export const whatsappHref = (
  message: string = siteConfig.whatsappDefaultMessage
) => {
  return `https://api.whatsapp.com/send/?phone=${siteConfig.whatsappNumber}&text=${encodeURIComponent(
    message
  )}`;
};

// Destino de todos os CTAs do site: WhatsApp com mensagem pronta.
// `origem` identifica o botão (aparece no link para o GTM medir); `servico`
// adapta a mensagem ao card clicado no carrossel.
// Para voltar a usar o formulário de qualificação, troque o retorno por
// `/orcamento?origem=...&servico=...` (a página /orcamento continua no projeto).
const SERVICE_MESSAGES: Record<string, string> = {
  motor: "rebobinamento / manutenção de motor elétrico",
  ex: "reparo de motor à prova de explosão",
  gerador: "manutenção de grupo gerador",
  transformador: "manutenção de transformador",
  bomba: "manutenção de motobomba / bomba submersível",
  subestacao: "manutenção de subestação / painel elétrico",
  preventiva: "um plano de manutenção preventiva",
};

const ORIGIN_MESSAGES: Record<string, string> = {
  "visita-fabrica": "Olá! Vim pelo site e gostaria de agendar uma visita técnica à fábrica da Danco | Powertec.",
  coleta: "Olá! Vim pelo site e gostaria de solicitar a coleta de um equipamento para orçamento.",
};

export const quoteHref = (origem: string, servico?: string) => {
  const service = servico && SERVICE_MESSAGES[servico];
  const message = service
    ? `Olá! Vim pelo site e preciso de orçamento para ${service}.`
    : ORIGIN_MESSAGES[origem] ?? siteConfig.whatsappDefaultMessage;
  return whatsappHref(message);
};

export const phoneHref = `tel:+${siteConfig.phone}`;
