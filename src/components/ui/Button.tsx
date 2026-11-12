import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-to-b from-brand-500 to-brand-700 shadow-[0_0_0_1px_rgb(167_139_250/0.5),0_8px_30px_-6px_rgb(139_92_246/0.65),inset_0_1px_0_rgb(255_255_255/0.25)] hover:shadow-[0_0_0_1px_rgb(196_181_253/0.7),0_10px_40px_-4px_rgb(139_92_246/0.85),inset_0_1px_0_rgb(255_255_255/0.3)] hover:brightness-110 active:scale-[0.98]",
  secondary:
    "text-zinc-100 bg-white/[0.04] ring-1 ring-inset ring-white/12 hover:bg-white/[0.08] hover:ring-white/20 active:scale-[0.98]",
  ghost: "text-zinc-300 hover:text-white hover:bg-white/[0.06]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}
