"use client";

import { useInView } from "framer-motion";
import { ArrowUpRight, Clock, Eye, Heart, Lightbulb, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getKpis, getRetention, getSeries, TOP_POSTS, type AnalyticsFilter, type Period } from "@/data/analytics";
import { PLATFORMS, PLATFORM_LIST } from "@/lib/platforms";
import { cn, formatCompact, formatNumber } from "@/lib/utils";

const ChartSkeleton = () => <div className="skeleton h-full w-full rounded-xl" />;
const ViewsChart = dynamic(() => import("@/components/dashboard/Charts").then((m) => m.ViewsChart), {
  ssr: false,
  loading: ChartSkeleton,
});
const RetentionChart = dynamic(() => import("@/components/dashboard/Charts").then((m) => m.RetentionChart), {
  ssr: false,
  loading: ChartSkeleton,
});

const FILTERS: Array<{ id: AnalyticsFilter; label: string }> = [
  { id: "all", label: "Все платформы" },
  ...PLATFORM_LIST.map((p) => ({ id: p.id as AnalyticsFilter, label: p.short })),
];

function Delta({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-400/10 px-1.5 py-0.5 text-[11px] font-medium text-emerald-300">
      <ArrowUpRight className="size-3" aria-hidden />+{formatNumber(value, 1)}%
    </span>
  );
}

export function Analytics() {
  const [filter, setFilter] = useState<AnalyticsFilter>("all");
  const [period, setPeriod] = useState<Period>(30);
  const chartsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartsRef, { once: true, margin: "-120px" });

  const series = useMemo(() => getSeries(filter, period), [filter, period]);
  const kpis = useMemo(() => getKpis(filter, period), [filter, period]);
  const retention = useMemo(() => getRetention(filter), [filter]);
  const posts = TOP_POSTS.filter((p) => filter === "all" || p.platform === filter);

  const cards = [
    { icon: Eye, label: "Просмотры", value: kpis.views, format: formatCompact, delta: kpis.viewsDelta },
    { icon: Heart, label: "Вовлечённость", value: kpis.engagement, decimals: 1, suffix: "%", delta: kpis.engagementDelta },
    { icon: Clock, label: "Ср. время просмотра", value: kpis.watchTime, decimals: 1, suffix: " с", delta: kpis.watchDelta },
    { icon: Users, label: "Удержание до 50%", value: kpis.retention, suffix: "%", delta: kpis.retentionDelta },
  ];

  return (
    <section id="analytics" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-sky-600/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Аналитика контента"
          title="Понимай, что работает — и делай больше этого"
          description="Все ключевые метрики коротких видео в одном дашборде. Переключайте платформы и период — графики обновятся."
        />

        <Reveal className="mt-14">
          <div className="glass overflow-hidden rounded-3xl p-4 sm:p-6">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-1 rounded-xl bg-white/[0.03] p-1 ring-1 ring-white/[0.07]" role="tablist" aria-label="Платформа">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={filter === f.id}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition",
                      filter === f.id ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white",
                    )}
                  >
                    {f.id !== "all" && <PlatformIcon platform={f.id} className="size-3.5" />}
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-amber-300/10 px-2 py-1 text-[11px] font-medium text-amber-200 ring-1 ring-amber-300/20">
                  Демонстрационные данные
                </span>
                <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1 ring-1 ring-white/[0.07]" role="radiogroup" aria-label="Период">
                  {([7, 30] as Period[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      role="radio"
                      aria-checked={period === p}
                      onClick={() => setPeriod(p)}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                        period === p ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white",
                      )}
                    >
                      {p} дней
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* KPI */}
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {cards.map((c) => (
                <div key={c.label} className="rounded-2xl border border-white/[0.06] bg-ink-900/70 p-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <c.icon className="size-3.5 text-zinc-500" aria-hidden /> {c.label}
                  </div>
                  <div className="mt-2 flex flex-wrap items-baseline gap-2">
                    <AnimatedNumber
                      value={c.value}
                      decimals={c.decimals}
                      suffix={c.suffix}
                      format={c.format}
                      className="text-2xl font-semibold tracking-tight text-white sm:text-[28px]"
                    />
                    <Delta value={c.delta} />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div ref={chartsRef} className="mt-3 grid gap-3 lg:grid-cols-[1.7fr_1fr]">
              <div className="rounded-2xl border border-white/[0.06] bg-ink-900/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">Просмотры по дням</h3>
                  <span className="text-[11px] text-zinc-500">
                    {filter === "all" ? "Все платформы" : PLATFORMS[filter].label} · {period} дней
                  </span>
                </div>
                <div className="h-[240px] sm:h-[260px]">
                  {inView ? <ViewsChart key={`${filter}-${period}`} data={series} period={period} /> : <ChartSkeleton />}
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-ink-900/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">Удержание аудитории</h3>
                  <span className="text-[11px] text-zinc-500">% зрителей по секундам</span>
                </div>
                <div className="h-[180px]">
                  {inView ? <RetentionChart key={filter} data={retention} /> : <ChartSkeleton />}
                </div>
                <p className="mt-3 flex gap-2 rounded-xl bg-brand-500/[0.08] p-3 text-xs leading-relaxed text-zinc-300 ring-1 ring-brand-400/15">
                  <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-brand-300" aria-hidden />
                  Основной отток — на 3–6 секунде. Попробуйте показать результат раньше и сократить вступление.
                </p>
              </div>
            </div>

            {/* Top posts */}
            <div className="mt-3 rounded-2xl border border-white/[0.06] bg-ink-900/70 p-4">
              <h3 className="mb-3 text-sm font-medium text-white">Лучшие публикации</h3>
              {posts.length === 0 ? (
                <p className="py-6 text-center text-sm text-zinc-500">Нет публикаций для выбранной платформы</p>
              ) : (
                <div className="-mx-4 overflow-x-auto px-4 scroll-thin">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead>
                      <tr className="text-[11px] uppercase tracking-wider text-zinc-500">
                        <th className="pb-2 font-medium">Публикация</th>
                        <th className="pb-2 font-medium">Платформа</th>
                        <th className="pb-2 text-right font-medium">Просмотры</th>
                        <th className="pb-2 text-right font-medium">ER</th>
                        <th className="pb-2 text-right font-medium">Удержание</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((p, i) => (
                        <tr key={p.title} className="border-t border-white/[0.05] transition hover:bg-white/[0.02]">
                          <td className="py-3 pr-4">
                            <span className="mr-2 font-mono text-[11px] text-zinc-600">0{i + 1}</span>
                            <span className="text-zinc-200">{p.title}</span>
                          </td>
                          <td className="py-3 pr-4">
                            <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] ring-1", PLATFORMS[p.platform].chip)}>
                              <PlatformIcon platform={p.platform} className="size-3" /> {PLATFORMS[p.platform].short}
                            </span>
                          </td>
                          <td className="py-3 text-right font-mono text-zinc-200">{formatCompact(p.views)}</td>
                          <td className="py-3 text-right font-mono text-zinc-200">{formatNumber(p.er, 1)}%</td>
                          <td className="py-3 text-right font-mono text-zinc-200">{p.retention}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
