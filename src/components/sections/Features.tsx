"use client";

import { motion } from "framer-motion";
import { CalendarDays, ChartColumn, Clapperboard, FileText, Hash, Lightbulb, type LucideIcon } from "lucide-react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

function SpotlightCard({
  icon: Icon,
  title,
  description,
  accent,
  className,
  index,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  className?: string;
  index: number;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/70 p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/15 sm:p-7",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), ${accent}, transparent 60%)` }}
      />
      <div className="relative">
        <span className="grid size-11 place-items-center rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition duration-300 group-hover:scale-110 group-hover:bg-white/[0.08]">
          <Icon className="size-5 text-brand-200" />
        </span>
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
      {children && <div className="relative mt-6 flex-1">{children}</div>}
    </motion.article>
  );
}

const IDEAS = [
  { t: "«Ожидание vs реальность» в вашей нише", s: 94 },
  { t: "3 мифа, в которые верит ваша аудитория", s: 88 },
  { t: "Один день из жизни за 30 секунд", s: 81 },
];

const BARS = [38, 52, 44, 66, 58, 81, 74];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Возможности"
          title="Всё, что нужно для роста — в одной студии"
          description="Шесть инструментов, которые закрывают путь от идеи до анализа результата. Без десятка вкладок и разрозненных сервисов."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <SpotlightCard
            index={0}
            icon={Lightbulb}
            title="Генератор вирусных идей"
            description="Идеи под вашу нишу и аудиторию с оценкой вирусного потенциала — больше никакого «о чём снять сегодня?»."
            accent="rgb(139 92 246 / 0.16)"
            className="md:col-span-3 lg:col-span-4"
          >
            <ul className="space-y-2">
              {IDEAS.map((idea, i) => (
                <li key={idea.t} className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5 ring-1 ring-white/[0.06]">
                  <span className="font-mono text-[11px] text-zinc-500">0{i + 1}</span>
                  <span className="min-w-0 flex-1 truncate text-sm text-zinc-200">{idea.t}</span>
                  <span className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-white/10 sm:block">
                    <motion.span
                      className="block h-full rounded-full bg-gradient-to-r from-brand-400 to-fuchsia-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${idea.s}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    />
                  </span>
                  <span className="w-8 text-right font-mono text-xs text-brand-200">{idea.s}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>

          <SpotlightCard
            index={1}
            icon={Clapperboard}
            title="AI-сценарист видео"
            description="Покадровый сценарий: хук, проблема, ценность, доказательство и призыв к действию с таймкодами."
            accent="rgb(236 72 153 / 0.14)"
            className="md:col-span-3 lg:col-span-2"
          >
            <div className="space-y-1.5 font-mono text-[11px]">
              {["0:00 Хук", "0:03 Проблема", "0:08 Ценность", "0:22 CTA"].map((l, i) => (
                <div key={l} className="flex items-center gap-2 text-zinc-400">
                  <span className={cn("h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-brand-400", ["w-6", "w-10", "w-20", "w-8"][i])} />
                  {l}
                </div>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard
            index={2}
            icon={FileText}
            title="Генератор описаний"
            description="Подписи, которые дочитывают: с эмоцией, структурой и вопросом для комментариев."
            accent="rgb(96 165 250 / 0.14)"
            className="md:col-span-2"
          />

          <SpotlightCard
            index={3}
            icon={Hash}
            title="Подбор хештегов"
            description="Сочетание тематических, нишевых и платформенных тегов вместо случайного набора."
            accent="rgb(139 92 246 / 0.16)"
            className="md:col-span-2"
          >
            <div className="flex flex-wrap gap-1.5">
              {["#бюджет", "#финансы", "#советы", "#reels"].map((t) => (
                <span key={t} className="rounded-md bg-sky-400/[0.08] px-2 py-0.5 text-[11px] text-sky-200 ring-1 ring-sky-400/15">
                  {t}
                </span>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard
            index={4}
            icon={CalendarDays}
            title="Контент-календарь"
            description="Неделя публикаций на одном экране: платформы, форматы и статусы."
            accent="rgb(236 72 153 / 0.14)"
            className="md:col-span-2"
          >
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 14 }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "aspect-square rounded-[5px]",
                    [1, 3, 4, 8, 10, 12].includes(i) ? "bg-brand-400/60" : [6, 11].includes(i) ? "bg-pink-400/50" : "bg-white/[0.05]",
                  )}
                />
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard
            index={5}
            icon={ChartColumn}
            title="Аналитика эффективности"
            description="Просмотры, вовлечённость, удержание и лучшие публикации — с рекомендациями, что улучшить в следующем ролике."
            accent="rgb(96 165 250 / 0.14)"
            className="md:col-span-6"
          >
            <div className="flex h-24 items-end gap-2 sm:gap-3">
              {BARS.map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-brand-600/40 to-sky-400/70"
                  style={{ height: `${h}%` }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
