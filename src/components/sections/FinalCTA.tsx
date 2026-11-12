import { Sparkles } from "lucide-react";
import { AuthButton } from "@/components/ui/AuthButton";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-ink-900 px-6 py-16 text-center sm:px-12 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="bg-dots mask-radial absolute inset-0 opacity-70" />
          <div className="absolute -bottom-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(139_92_246/0.55),rgb(236_72_153/0.15)_45%,transparent_70%)]" />
        </div>
        <div className="relative">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/[0.06] text-brand-200 ring-1 ring-white/15">
            <Sparkles className="size-5" />
          </span>
          <h2 className="text-fade mx-auto mt-6 max-w-3xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">
            Твоя следующая вирусная идея начинается здесь
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-zinc-400 sm:text-lg">
            Преврати креативность в системную стратегию развития контента.
          </p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <AuthButton size="lg" arrow>
              Начать бесплатно
            </AuthButton>
            <ButtonLink href="/#platform" variant="secondary" size="lg">
              Попробовать генератор
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
