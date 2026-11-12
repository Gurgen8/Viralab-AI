"use client";

import { motion } from "framer-motion";
import { MessageSquareText, Rocket, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STEPS = [
  {
    n: "01",
    icon: MessageSquareText,
    title: "Поделись идеей",
    text: "Введи тему, аудиторию и платформу.",
    visual: (
      <div className="space-y-2">
        <div className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-zinc-300 ring-1 ring-white/10">
          Как вести бюджет без стресса<span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-brand-300 align-middle" />
        </div>
        <div className="flex gap-1.5 text-[10px]">
          <span className="rounded-md bg-pink-500/10 px-2 py-1 text-pink-300">TikTok</span>
          <span className="rounded-md bg-white/[0.04] px-2 py-1 text-zinc-400">Студенты</span>
        </div>
      </div>
    ),
  },
  {
    n: "02",
    icon: Sparkles,
    title: "Получи результат от AI",
    text: "Создай сценарии, заголовки, описания и идеи публикаций.",
    visual: (
      <div className="space-y-1.5">
        {["w-full", "w-4/5", "w-11/12", "w-3/5"].map((w, i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full bg-gradient-to-r from-brand-400/70 to-fuchsia-400/40 ${w}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
          />
        ))}
      </div>
    ),
  },
  {
    n: "03",
    icon: Rocket,
    title: "Публикуй и развивайся",
    text: "Используй контент-стратегию для развития социальных сетей.",
    visual: (
      <svg viewBox="0 0 120 40" className="h-10 w-full" aria-hidden>
        <motion.path
          d="M0 34 C 20 32, 30 26, 45 24 S 70 20, 80 12 S 105 6, 120 2"
          fill="none"
          stroke="url(#how-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6 }}
        />
        <defs>
          <linearGradient id="how-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Как это работает"
          title="От идеи до публикации — три шага"
          description="Никаких сложных настроек. Вы приносите идею, ViralLab AI превращает её в план контента."
        />

        <ol className="relative mt-16 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Connector line (desktop) */}
          <div aria-hidden className="absolute left-[16%] right-[16%] top-[30px] hidden h-px bg-white/10 lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-brand-400 via-fuchsia-400 to-sky-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative z-10 grid size-[60px] place-items-center rounded-2xl bg-ink-900 ring-1 ring-white/15 shadow-[0_0_40px_-8px_rgb(139_92_246/0.6)]">
                <s.icon className="size-6 text-brand-200" />
              </span>
              <span className="mt-6 font-mono text-xs tracking-widest text-brand-300">{s.n}</span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{s.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-400">{s.text}</p>
              <div className="glass mt-6 w-full max-w-xs rounded-2xl p-4 text-left">{s.visual}</div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
