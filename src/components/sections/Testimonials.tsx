import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/data/site";
import { cn } from "@/lib/utils";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Примеры отзывов"
          title="Как ViralLab AI может помочь разным авторам"
          description="Это иллюстративные сценарии использования от демонстрационных профилей, а не отзывы реальных клиентов."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className="h-full min-w-0">
              <figure className="flex h-full flex-col rounded-3xl border border-white/[0.07] bg-ink-900/70 p-6 transition sm:p-7 hover:border-white/15">
                <Quote className="size-6 text-brand-400/60" aria-hidden />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-zinc-300">«{t.text}»</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <span className={cn("grid size-10 place-items-center rounded-full bg-gradient-to-br text-xs font-semibold text-white", t.gradient)} aria-hidden>
                    {t.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug text-white">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                  <span className="ml-auto shrink-0 rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] text-zinc-400 ring-1 ring-white/10">Пример</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
