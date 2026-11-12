"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ_ITEMS } from "@/data/site";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:px-8">
        <SectionHeader
          align="left"
          eyebrow="FAQ"
          title="Частые вопросы"
          description="Не нашли ответ? Начните с бесплатного тарифа — это лучший способ понять, подходит ли вам ViralLab AI."
        />
        <Reveal>
          <ul className="divide-y divide-white/[0.07] rounded-3xl border border-white/[0.07] bg-ink-900/60">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      type="button"
                      id={`${baseId}-q${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${baseId}-a${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-medium text-white transition hover:text-brand-100"
                    >
                      {item.q}
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full ring-1 transition duration-300",
                          isOpen ? "rotate-45 bg-brand-500/20 text-brand-200 ring-brand-400/30" : "text-zinc-400 ring-white/10",
                        )}
                      >
                        <Plus className="size-3.5" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${baseId}-a${i}`}
                        role="region"
                        aria-labelledby={`${baseId}-q${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-zinc-400">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
