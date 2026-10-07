// Perguntas do formulário de orçamento e regras de qualificação.
// Para mudar textos ou opções, edite apenas este arquivo.

export type Answers = {
  tipoCliente: string;
  necessidade: string;
  equipamento: string;
  porte: string;
  situacao: string;
  setor: string;
  cargo: string;
  empresa: string;
  cidade: string;
  nome: string;
  whatsapp: string;
  email: string;
};

export const emptyAnswers: Answers = {
  tipoCliente: "",
  necessidade: "",
  equipamento: "",
  porte: "",
  situacao: "",
  setor: "",
  cargo: "",
  empresa: "",
  cidade: "",
  nome: "",
  whatsapp: "",
  email: "",
};

// Motivos que encerram o formulário sem enviar o lead ao comercial.
export type StopReason = "pessoa_fisica" | "produto_novo";

export interface Option {
  label: string;
  value: string;
  hint?: string;
  stop?: StopReason;
}

type OptionField = Exclude<keyof Answers, "empresa" | "cidade" | "nome" | "whatsapp" | "email">;

export interface OptionStep {
  id: string;
  kind: "options";
  field: OptionField;
  progressLabel: string;
  eyebrow: string;
  title: string | ((a: Answers) => string);
  description?: string;
  options: Option[] | ((a: Answers) => Option[]);
  columns?: 2;
  skip?: (a: Answers, preset: Preset) => boolean;
}

export interface InputField {
  name: "empresa" | "cidade" | "nome" | "whatsapp" | "email";
  label: string;
  placeholder: string;
  type?: "text" | "tel" | "email";
  autoComplete?: string;
  optional?: boolean;
}

export interface FieldsStep {
  id: string;
  kind: "fields";
  progressLabel: string;
  eyebrow: string;
  title: string | ((a: Answers) => string);
  description?: string;
  fields: InputField[];
  submit?: boolean;
}

export type Step = OptionStep | FieldsStep;

// Preenchimento vindo do botão clicado na landing page (?servico=...).
export type Preset = { equipamento?: string };

const EQUIP = {
  motor: "Motor elétrico",
  ex: "Motor à prova de explosão (Ex)",
  bomba: "Motobomba ou bomba submersível",
  gerador: "Gerador ou alternador",
  transformador: "Transformador",
  subestacao: "Subestação ou painel elétrico",
  varios: "Vários tipos de equipamento",
} as const;

export const SERVICE_PRESETS: Record<string, Preset> = {
  motor: { equipamento: EQUIP.motor },
  ex: { equipamento: EQUIP.ex },
  bomba: { equipamento: EQUIP.bomba },
  gerador: { equipamento: EQUIP.gerador },
  transformador: { equipamento: EQUIP.transformador },
  subestacao: { equipamento: EQUIP.subestacao },
};

const NEED_CONTRACT = "Contrato de manutenção para vários equipamentos";

function porteOptions(a: Answers): Option[] {
  const unknown = { label: "Não sei informar", value: "Não sei informar" };
  switch (a.equipamento) {
    case EQUIP.gerador:
      return [
        { label: "Até 150 kVA", value: "Até 150 kVA" },
        { label: "150 a 500 kVA", value: "150 a 500 kVA" },
        { label: "Acima de 500 kVA", value: "Acima de 500 kVA" },
        unknown,
      ];
    case EQUIP.transformador:
    case EQUIP.subestacao:
      return [
        { label: "Até 300 kVA", value: "Até 300 kVA" },
        { label: "300 kVA a 1 MVA", value: "300 kVA a 1 MVA" },
        { label: "Acima de 1 MVA", value: "Acima de 1 MVA" },
        unknown,
      ];
    case EQUIP.varios:
      return [
        { label: "Até 10 equipamentos", value: "Até 10 equipamentos" },
        { label: "De 10 a 50 equipamentos", value: "De 10 a 50 equipamentos" },
        { label: "Mais de 50 equipamentos", value: "Mais de 50 equipamentos" },
        unknown,
      ];
    default:
      return [
        { label: "Até 50 CV", value: "Até 50 CV" },
        { label: "De 50 a 200 CV", value: "De 50 a 200 CV" },
        { label: "De 200 a 1.000 CV", value: "De 200 a 1.000 CV" },
        { label: "Acima de 1.000 CV", value: "Acima de 1.000 CV" },
        unknown,
      ];
  }
}

export const STEPS: Step[] = [
  {
    id: "tipo",
    kind: "options",
    field: "tipoCliente",
    progressLabel: "Perfil",
    eyebrow: "Vamos começar.",
    title: "Para quem é o atendimento?",
    description: "Assim direcionamos sua solicitação para a equipe certa.",
    options: [
      {
        label: "Empresa privada",
        hint: "Indústria, comércio ou prestadora de serviços",
        value: "Empresa privada",
      },
      {
        label: "Órgão público ou empresa estatal",
        hint: "Prefeituras, autarquias, saneamento, energia",
        value: "Órgão público / estatal",
      },
      {
        label: "Pessoa física",
        hint: "Uso residencial ou pessoal",
        value: "Pessoa física",
        stop: "pessoa_fisica",
      },
    ],
  },
  {
    id: "necessidade",
    kind: "options",
    field: "necessidade",
    progressLabel: "Necessidade",
    eyebrow: "Entendendo a demanda.",
    title: "O que você precisa hoje?",
    options: [
      {
        label: "Reparo ou rebobinamento de um equipamento",
        value: "Reparo ou rebobinamento",
      },
      {
        label: "Manutenção preventiva ou atendimento em campo",
        value: "Manutenção preventiva / em campo",
      },
      { label: "Contrato de manutenção para vários equipamentos", value: NEED_CONTRACT },
      {
        label: "Comprar um equipamento ou peça nova",
        value: "Compra de equipamento ou peça nova",
        stop: "produto_novo",
      },
    ],
  },
  {
    id: "equipamento",
    kind: "options",
    field: "equipamento",
    progressLabel: "Equipamento",
    eyebrow: "Sobre o equipamento.",
    title: "Qual é o equipamento?",
    options: Object.values(EQUIP).map((value) => ({ label: value, value })),
    skip: (_a, preset) => Boolean(preset.equipamento),
  },
  {
    id: "porte",
    kind: "options",
    field: "porte",
    progressLabel: "Porte",
    eyebrow: "Sobre o equipamento.",
    title: (a) =>
      a.equipamento === EQUIP.varios
        ? "Quantos equipamentos precisam de manutenção?"
        : "Qual é a potência do equipamento?",
    description: "Uma estimativa já ajuda nossa equipe técnica a preparar o atendimento.",
    options: porteOptions,
  },
  {
    id: "situacao",
    kind: "options",
    field: "situacao",
    progressLabel: "Urgência",
    eyebrow: "Prioridade.",
    title: "Qual é a situação do equipamento hoje?",
    options: [
      { label: "Parado, com a produção afetada", value: "Parado (urgente)" },
      { label: "Funcionando, mas com falha, ruído ou aquecimento", value: "Funcionando com falha" },
      { label: "Parada programada ou manutenção preventiva", value: "Parada programada" },
      { label: "Ainda estou levantando orçamentos", value: "Levantando orçamentos" },
    ],
    skip: (a) => a.necessidade === NEED_CONTRACT,
  },
  {
    id: "setor",
    kind: "options",
    field: "setor",
    progressLabel: "Setor",
    eyebrow: "Sobre a empresa.",
    title: "Qual é o setor da empresa?",
    columns: 2,
    options: [
      "Sucroalcooleiro",
      "Papel e celulose",
      "Mineração",
      "Fundição e siderurgia",
      "Saneamento",
      "Alimentos e bebidas",
      "Energia",
      "Petroquímico e químico",
      "Metalmecânico",
      "Têxtil",
      "Outro setor industrial",
      "Comércio ou serviços",
    ].map((value) => ({ label: value, value })),
  },
  {
    id: "empresa",
    kind: "fields",
    progressLabel: "Empresa",
    eyebrow: "Sobre a empresa.",
    title: "Qual empresa você representa?",
    fields: [
      {
        name: "empresa",
        label: "Nome da empresa",
        placeholder: "Nome da empresa",
        autoComplete: "organization",
      },
      {
        name: "cidade",
        label: "Cidade / UF da unidade",
        placeholder: "Ex.: Maringá - PR",
        autoComplete: "address-level2",
      },
    ],
  },
  {
    id: "cargo",
    kind: "options",
    field: "cargo",
    progressLabel: "Seu papel",
    eyebrow: "Quase lá.",
    title: "Qual é a sua área na empresa?",
    options: [
      { label: "Manutenção ou engenharia", value: "Manutenção / engenharia" },
      { label: "Compras ou suprimentos", value: "Compras / suprimentos" },
      { label: "Diretoria ou proprietário", value: "Diretoria / proprietário" },
      { label: "Outra área", value: "Outra área" },
    ],
  },
  {
    id: "contato",
    kind: "fields",
    progressLabel: "Contato",
    eyebrow: "Última etapa.",
    title: "Para quem enviamos o orçamento?",
    description: "Nosso time comercial vai entrar em contato por este WhatsApp.",
    submit: true,
    fields: [
      { name: "nome", label: "Seu nome", placeholder: "Nome e sobrenome", autoComplete: "name" },
      {
        name: "whatsapp",
        label: "WhatsApp",
        placeholder: "(47) 99999-9999",
        type: "tel",
        autoComplete: "tel",
      },
      {
        name: "email",
        label: "E-mail corporativo (opcional)",
        placeholder: "voce@empresa.com.br",
        type: "email",
        autoComplete: "email",
        optional: true,
      },
    ],
  },
];

export const STOP_MESSAGES: Record<StopReason, { title: string; text: string; backLabel: string }> = {
  pessoa_fisica: {
    title: "Nosso atendimento é exclusivo para empresas",
    text: "A Danco | Powertec não atende pessoa física para manutenção de pequenos equipamentos. Nosso foco é a manutenção de motores, geradores, transformadores e bombas de indústrias e empresas.",
    backLabel: "Na verdade, represento uma empresa",
  },
  produto_novo: {
    title: "Não vendemos equipamentos ou peças novas",
    text: "Nosso foco é serviço: reparo, rebobinamento e manutenção de motores elétricos, geradores, transformadores e motobombas. Se o seu equipamento parou ou está com falha, podemos ajudar.",
    backLabel: "Preciso de manutenção em um equipamento",
  },
};

const ICP_SECTORS = [
  "Sucroalcooleiro",
  "Papel e celulose",
  "Mineração",
  "Fundição e siderurgia",
  "Saneamento",
  "Energia",
  "Petroquímico e químico",
];

const LARGE_SIZES = [
  "De 200 a 1.000 CV",
  "Acima de 1.000 CV",
  "Acima de 500 kVA",
  "300 kVA a 1 MVA",
  "Acima de 1 MVA",
  "De 10 a 50 equipamentos",
  "Mais de 50 equipamentos",
];

// "mql": perfil ideal (grande porte, contrato, Ex ou setor foco). "lead": demais empresas.
export function qualify(a: Answers): "mql" | "lead" {
  const isMql =
    a.necessidade === NEED_CONTRACT ||
    a.equipamento === EQUIP.ex ||
    LARGE_SIZES.includes(a.porte) ||
    ICP_SECTORS.includes(a.setor);
  return isMql ? "mql" : "lead";
}

export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length > 10) return d.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  if (d.length > 6) return d.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  if (d.length > 2) return d.replace(/^(\d{2})(\d+)/, "($1) $2");
  return d;
}

export function validateField(field: InputField, value: string) {
  const v = value.trim();
  if (!v) return field.optional ? "" : "Campo obrigatório";
  if (field.name === "whatsapp" && v.replace(/\D/g, "").length < 10) return "Informe um WhatsApp com DDD";
  if (field.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "E-mail inválido";
  if (field.name === "nome" && v.length < 3) return "Informe seu nome";
  return "";
}
