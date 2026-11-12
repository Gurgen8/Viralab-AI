import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-8 place-items-center rounded-[10px] bg-gradient-to-br from-brand-400 via-brand-600 to-fuchsia-600 shadow-[0_0_24px_-4px_rgb(139_92_246/0.8),inset_0_1px_0_rgb(255_255_255/0.35)]",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-[18px] text-white" fill="none">
        <path d="M5 4.5 12 19l7-14.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="8.2" r="1.9" fill="currentColor" />
      </svg>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/#top" className={cn("flex items-center gap-2.5 rounded-lg", className)} aria-label="ViralLab AI — на главную">
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight text-white">
        ViralLab <span className="text-brand-300">AI</span>
      </span>
    </Link>
  );
}
