import type { CSSProperties } from "react";

// Logos em /public/clientes. Para adicionar um cliente, coloque o arquivo
// na pasta e inclua uma linha aqui.
const CLIENTS = [
  { name: "Klabin", logo: "/clientes/klabin.png" },
  { name: "Seara", logo: "/clientes/seara.png" },
  { name: "Sanepar", logo: "/clientes/sanepar.png" },
  { name: "Sabesp", logo: "/clientes/sabesp.png" },
  { name: "Casan", logo: "/clientes/casan.png" },
  { name: "BRK Ambiental", logo: "/clientes/brk.png" },
  { name: "Cremer", logo: "/clientes/cremer.png" },
  { name: "Grupo Menegotti", logo: "/clientes/menegotti.png" },
  { name: "Metisa", logo: "/clientes/metisa.png" },
  { name: "Haco", logo: "/clientes/haco.jpg" },
  { name: "Multsoy", logo: "/clientes/multsoy.png" },
  { name: "Krona", logo: "/clientes/krona.png" },
  { name: "Vogel Sanger", logo: "/clientes/vogel-sanger.jpg" },
  { name: "Samae Jaraguá do Sul", logo: "/clientes/samae.png" },
  { name: "CSM", logo: "/clientes/csm.png" },
  { name: "Visan", logo: "/clientes/visan.png" },
  { name: "Aromitalia", logo: "/clientes/aromitalia.png" },
];

// Clientes citados no kickoff que ainda não têm logo oficial no site.
// Substituir por logos assim que o cliente enviar.
const MORE_CLIENTS = ["Positivo", "Automatique", "Grupo Cometa"];

export default function ClientLogos() {
  const copies = 2;
  const track = Array.from({ length: copies }, () => CLIENTS).flat();
  const marqueeStyle = {
    "--marquee-distance": `-${(100 / copies).toFixed(4)}%`,
  } as CSSProperties;

  return (
    <section id="clientes" className="overflow-hidden bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
        <p className="text-sm font-semibold tracking-wide text-accent-500 uppercase">
          Quem confia
        </p>
        <h2 className="mt-3 text-2xl font-bold text-primary-950 sm:text-3xl">
          Grandes operações já confiam seus equipamentos à Danco | Powertec
        </h2>
      </div>

      <div className="mt-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="animate-marquee-fast flex w-max gap-5" style={marqueeStyle}>
          {track.map((client, i) => (
            <li
              key={i}
              className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-primary-100 bg-white px-6 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.logo}
                alt={i < CLIENTS.length ? client.name : ""}
                loading="lazy"
                className="max-h-11 w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>

      {MORE_CLIENTS.length > 0 && (
        <p className="mx-auto mt-8 max-w-3xl px-6 text-center text-sm text-primary-500">
          Entre outros:{" "}
          <span className="font-semibold text-primary-800">
            {MORE_CLIENTS.join(" · ")}
          </span>{" "}
          e centenas de indústrias no Sul e Sudeste.
        </p>
      )}
    </section>
  );
}
