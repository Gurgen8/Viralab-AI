"use client";

import {
  CalendarDays,
  ChartColumn,
  Hash,
  House,
  Lightbulb,
  Settings,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { cn } from "@/lib/utils";

const SPARK = [12, 18, 15, 22, 19, 28, 24, 35, 31, 44, 39, 52, 48, 61];

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${40 - (v / max) * 36}`).join(" ");
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,40 ${pts} 100,40`} fill="url(#spark-fill)" />
      <motion.polyline
        points={pts}
        fill="none"
        stroke="#c4b5fd"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
      />
    </svg>
  );
}

const SIDEBAR = [House, Lightbulb, WandSparkles, Hash, CalendarDays, ChartColumn];

const HOOKS = [
  "3 ошибки в бюджете, которые съедают зарплату",
  "Сохрани, если хочешь копить без стресса",
  "За 30 секунд объясню то, что банк не скажет",
];

const TIMELINE = [
  { label: "Хук", w: "12%", c: "from-fuchsia-400 to-pink-500" },
  { label: "Проблема", w: "18%", c: "from-violet-400 to-fuchsia-500" },
  { label: "Ценность", w: "42%", c: "from-brand-400 to-brand-600" },
  { label: "Пруф", w: "15%", c: "from-sky-400 to-brand-500" },
  { label: "CTA", w: "13%", c: "from-sky-300 to-sky-500" },
];

export function HeroMockup() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 shadow-[0_40px_120px_-30px_rgb(139_92_246/0.45)] sm:rounded-[20px]">
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto hidden rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-500 sm:block">
          app.virallab.ai/studio
        </div>
        <span className="ml-auto rounded-md bg-brand-500/15 px-2 py-0.5 text-[10px] font-medium text-brand-300 sm:ml-0">
          Демо-данные
        </span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-14 shrink-0 flex-col items-center gap-2 border-r border-white/[0.06] py-4 sm:flex">
          {SIDEBAR.map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "grid size-9 place-items-center rounded-lg",
                i === 2 ? "bg-brand-500/20 text-brand-300 ring-1 ring-brand-400/30" : "text-zinc-600",
              )}
            >
              <Icon className="size-4" />
            </span>
          ))}
          <span className="mt-auto grid size-9 place-items-center text-zinc-600">
            <Settings className="size-4" />
          </span>
        </aside>

        <div className="grid min-w-0 flex-1 gap-4 p-4 sm:p-5 md:grid-cols-[1.55fr_1fr]">
          {/* Studio column */}
          <div className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[11px] text-zinc-500">Студия · Новый сценарий</p>
                <p className="text-sm font-semibold text-white sm:text-base">Как вести бюджет без стресса</p>
              </div>
              <div className="flex gap-1.5">
                {(["tiktok", "reels", "shorts"] as const).map((p, i) => (
                  <span
                    key={p}
                    className={cn(
                      "grid size-7 place-items-center rounded-lg ring-1",
                      i === 0 ? "bg-pink-500/15 text-pink-300 ring-pink-400/30" : "text-zinc-500 ring-white/10",
                    )}
                  >
                    <PlatformIcon platform={p} className="size-3.5" />
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
                <Sparkles className="size-3.5 text-brand-300" /> Варианты хука
              </div>
              <ul className="space-y-1.5">
                {HOOKS.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs sm:text-[13px]",
                      i === 0 ? "bg-brand-500/15 text-white ring-1 ring-brand-400/30" : "text-zinc-400",
                    )}
                  >
                    <span className="font-mono text-[10px] text-zinc-500">0{i + 1}</span>
                    <span className="truncate">{h}</span>
                    {i === 0 && (
                      <span className="ml-auto shrink-0 rounded bg-emerald-400/15 px-1.5 py-0.5 text-[10px] text-emerald-300">
                        лучший
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="mb-2.5 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="font-medium">Структура сценария</span>
                <span className="font-mono text-zinc-500">0:00 – 0:28</span>
              </div>
              <div className="flex h-2 gap-1 overflow-hidden rounded-full">
                {TIMELINE.map((t, i) => (
                  <motion.span
                    key={t.label}
                    style={{ width: t.w }}
                    className={cn("h-full origin-left rounded-full bg-gradient-to-r", t.c)}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.12, duration: 0.5 }}
                  />
                ))}
              </div>
              <div className="mt-2 hidden justify-between text-[10px] text-zinc-500 sm:flex">
                {TIMELINE.map((t) => (
                  <span key={t.label}>{t.label}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats column */}
          <div className="hidden min-w-0 space-y-4 md:block">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="text-[11px] text-zinc-500">Просмотры за 14 дней</p>
              <div className="flex items-baseline gap-2">
                <AnimatedNumber value={128.4} decimals={1} suffix="K" className="text-2xl font-semibold text-white" />
                <span className="text-[11px] font-medium text-emerald-400">+38%</span>
              </div>
              <Sparkline data={SPARK} className="mt-2 h-14 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-[11px] text-zinc-500">Удержание</p>
                <AnimatedNumber value={64} suffix="%" className="text-lg font-semibold text-white" />
                <div className="mt-2 h-1 rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-fuchsia-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: "64%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                  />
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-[11px] text-zinc-500">Ср. просмотр</p>
                <AnimatedNumber value={14.2} decimals={1} suffix=" с" className="text-lg font-semibold text-white" />
                <p className="mt-1.5 text-[10px] text-emerald-400">+2,1 с</p>
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="mb-2 text-[11px] text-zinc-500">Ближайшие публикации</p>
              {[
                { d: "Вт 18:00", t: "Тренд: ожидание vs реальность", p: "tiktok" as const },
                { d: "Чт 19:00", t: "Обзор 5 приложений", p: "shorts" as const },
              ].map((x) => (
                <div key={x.t} className="flex items-center gap-2 py-1.5 text-xs">
                  <PlatformIcon platform={x.p} className="size-3.5 text-zinc-400" />
                  <span className="truncate text-zinc-300">{x.t}</span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-zinc-500">{x.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
