import type { ReactNode } from "react";

interface CtaButtonProps {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
}

export default function CtaButton({
  href,
  children,
  icon,
  className = "",
  variant = "primary",
}: CtaButtonProps) {
  const external = href.startsWith("http");

  if (variant === "ghost") {
    return (
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/50 hover:bg-white/10 ${className}`}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent-500 to-accent-400 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(240,90,26,0.35)] transition-[transform,box-shadow] duration-300 ease-out hover:scale-105 hover:shadow-[0_12px_28px_-8px_rgba(240,90,26,0.6)] ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-500 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
      />
      <span className="relative inline-flex items-center gap-2">
        {icon}
        {children}
      </span>
    </a>
  );
}
