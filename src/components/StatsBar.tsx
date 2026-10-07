const STATS = [
  { value: "20+ anos", label: "de experiência" },
  { value: "2.500 CV", label: "potência máxima atendida" },
  { value: "2.000 m²", label: "de parque fabril próprio" },
  { value: "+80", label: "colaboradores" },
  { value: "+2.500", label: "clientes atendidos" },
];

const CYCLE_SECONDS = 15;

export default function StatsBar() {
  return (
    <section className="border-b border-primary-100 bg-white py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Mobile: carrossel em looping destacando um número por vez */}
        <div className="sm:hidden">
          <div className="relative h-24">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-stat-highlight absolute inset-0 flex flex-col items-center justify-center text-center"
                style={{
                  animationDelay: `${-(index * (CYCLE_SECONDS / STATS.length))}s`,
                }}
              >
                <p className="font-display text-5xl font-bold text-primary-950">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide text-primary-500 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center gap-2">
            {STATS.map((stat, index) => (
              <span
                key={stat.label}
                className="animate-stat-dot h-1.5 w-1.5 rounded-full bg-accent-500"
                style={{
                  animationDelay: `${-(index * (CYCLE_SECONDS / STATS.length))}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Desktop/tablet: layout em linha */}
        <div className="hidden sm:flex sm:flex-wrap sm:justify-between sm:gap-x-8 sm:gap-y-8">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={
                index !== 0 ? "border-l border-primary-100 pl-6 lg:pl-8" : ""
              }
            >
              <p className="font-display text-4xl font-bold text-primary-950 lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium tracking-wide text-primary-500 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
