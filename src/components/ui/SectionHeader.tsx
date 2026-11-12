import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "max-w-xl items-start",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-fade text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[44px]">
        {title}
      </h2>
      {description && <p className="text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">{description}</p>}
    </Reveal>
  );
}
