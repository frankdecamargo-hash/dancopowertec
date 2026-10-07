import Image from "next/image";
import { cn } from "@/lib/utils";

// Logos oficiais (Danco + Powertec) lado a lado. Os PNGs são pretos;
// `invert` deixa em branco para fundos escuros.
export default function BrandLogo({
  invert = false,
  className,
}: {
  invert?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/marca/logo-1.png"
        alt="Danco"
        width={209}
        height={47}
        className={cn("h-6 w-auto sm:h-7", invert && "invert")}
        priority
      />
      <span
        aria-hidden
        className={cn("h-6 w-px", invert ? "bg-white/30" : "bg-primary-300")}
      />
      <Image
        src="/marca/logo-2.png"
        alt="Powertec"
        width={227}
        height={47}
        className={cn("h-6 w-auto sm:h-7", invert && "invert")}
        priority
      />
    </span>
  );
}
