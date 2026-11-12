"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { AuthButton } from "@/components/ui/AuthButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PLANS } from "@/data/site";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[400px] max-w-3xl -translate-y-1/2 rounded-full bg-brand-700/15 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Тарифы"
          title="Начните бесплатно. Растите без ограничений"
          description="Прозрачные цены без скрытых платежей. Демонстрационные цены — в долларах США."
        />

        <Reveal className="mt-10 flex justify-center">
          <div className="relative inline-grid grid-cols-2 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/10" role="radiogroup" aria-label="Период оплаты">
            {[
              { v: false, l: "Ежемесячно" },
              { v: true, l: "Ежегодно" },
            ].map((o) => (
              <button
                key={o.l}
                type="button"
                role="radio"
                aria-checked={yearly === o.v}
                onClick={() => setYearly(o.v)}
                className={cn("relative rounded-full px-5 py-2 text-sm font-medium transition", yearly === o.v ? "text-white" : "text-zinc-400 hover:text-white")}
              >
                {yearly === o.v && (
                  <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/15" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                <span className="relative flex items-center gap-2">
                  {o.l}
                  {o.v && <span className="rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-[10px] text-emerald-300">−20%</span>}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-6xl gap-4 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <Reveal key={plan.id} delay={i * 0.08} className="h-full min-w-0">
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl p-7 transition duration-300 hover:-translate-y-1 [&>*]:shrink-0",
                    plan.highlighted
                      ? "ring-gradient bg-gradient-to-b from-brand-600/20 via-ink-900 to-ink-900 shadow-[0_30px_100px_-30px_rgb(139_92_246/0.7)] lg:scale-[1.03]"
                      : "border border-white/[0.07] bg-ink-900/70 hover:border-white/15",
                  )}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500 px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-brand-600/40">
                      Популярный выбор
                    </span>
                  )}
                  <h3 className="font-mono text-sm font-semibold tracking-[0.16em] text-brand-200">{plan.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{plan.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <motion.span
                      key={price}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-5xl font-semibold tracking-tight text-white"
                    >
                      ${price}
                    </motion.span>
                    <span className="text-sm text-zinc-500">/ в месяц</span>
                  </div>
                  <p className="mt-1 h-4 text-xs text-zinc-600">
                    {plan.monthly === 0 ? "Навсегда бесплатно" : yearly ? `$${plan.yearly * 12} при оплате за год` : "Оплата ежемесячно"}
                  </p>

                  <AuthButton
                    plan={plan.id}
                    variant={plan.highlighted ? "primary" : "secondary"}
                    size="lg"
                    className="mt-7 w-full"
                    arrow={plan.highlighted}
                  >
                    {plan.cta}
                  </AuthButton>

                  <ul className="mt-8 space-y-3 border-t border-white/[0.06] pt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                        <span className={cn("mt-0.5 grid size-4 shrink-0 place-items-center rounded-full", plan.highlighted ? "bg-brand-500/25 text-brand-200" : "bg-white/[0.06] text-zinc-400")}>
                          <Check className="size-2.5" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
