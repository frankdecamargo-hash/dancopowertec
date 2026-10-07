import {
  Droplets,
  Factory,
  Flame,
  Leaf,
  Mountain,
  ScrollText,
  UtensilsCrossed,
  Zap,
  MapPin,
} from "lucide-react";

const SECTORS = [
  {
    icon: Leaf,
    title: "Sucroalcooleiro",
    description: "Motores de moendas, bombas e geradores que operam em safra, sem margem para parada.",
  },
  {
    icon: ScrollText,
    title: "Papel e celulose",
    description: "Motores de média tensão e acionamentos de linhas contínuas de produção.",
  },
  {
    icon: Mountain,
    title: "Mineração",
    description: "Máquinas de grande porte em regime severo: britadores, correias e bombeamento.",
  },
  {
    icon: Flame,
    title: "Fundição e siderurgia",
    description: "Motores especiais e à prova de explosão para ambientes críticos.",
  },
  {
    icon: Droplets,
    title: "Saneamento",
    description: "Bombas submersíveis e motobombas de captação e estações de tratamento.",
  },
  {
    icon: UtensilsCrossed,
    title: "Alimentos",
    description: "Refrigeração, processamento e utilidades que não podem parar.",
  },
  {
    icon: Zap,
    title: "Energia",
    description: "Grupos geradores, alternadores, transformadores e subestações.",
  },
  {
    icon: Factory,
    title: "Petroquímico e indústria pesada",
    description: "Equipamentos para atmosferas explosivas e operações de alta exigência.",
  },
];

export default function Sectors() {
  return (
    <section id="setores" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-accent-500 uppercase">
            Setores atendidos
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary-950 sm:text-4xl">
            Feito para quem não pode parar a produção
          </h2>
          <p className="mt-4 text-base text-primary-600">
            Atendemos indústrias de médio e grande porte com fluxo contínuo de
            manutenção, onde cada hora de máquina parada custa caro.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((sector) => (
            <div
              key={sector.title}
              className="group rounded-2xl border border-primary-100 bg-sand-50 p-6 transition-colors duration-300 hover:border-accent-500/40 hover:bg-white hover:shadow-lg hover:shadow-primary-950/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-accent-500 shadow-sm transition-colors group-hover:bg-accent-500 group-hover:text-white">
                <sector.icon size={22} />
              </div>
              <h3 className="mt-5 font-semibold text-primary-950">
                {sector.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                {sector.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-primary-950 px-6 py-5 text-center sm:flex-row sm:text-left">
          <MapPin size={20} className="shrink-0 text-accent-400" />
          <p className="text-sm text-primary-200">
            <span className="font-semibold text-white">
              Atendimento em Santa Catarina, Paraná, São Paulo e Rio Grande do Sul
            </span>, com coleta e entrega em frota própria.
          </p>
        </div>
      </div>
    </section>
  );
}
