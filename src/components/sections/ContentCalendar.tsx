"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, ChevronLeft, ChevronRight, Clock, Plus, RotateCcw, Trash2, X } from "lucide-react";
import { useId, useMemo, useState, type FormEvent } from "react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FORMAT_LABELS, INITIAL_POSTS, STATUS_META, STATUS_ORDER, WEEKDAYS, WEEKDAYS_SHORT } from "@/data/calendar";
import { useMounted } from "@/hooks/useMounted";
import { PLATFORMS, PLATFORM_LIST } from "@/lib/platforms";
import { cn } from "@/lib/utils";
import type { CalendarPost, Platform, PostFormat, PostStatus } from "@/types";

type Filter = "all" | Platform;

function weekDates(offset: number): Date[] {
  const now = new Date();
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7) + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

const fmtDay = (d: Date) => d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }).replace(".", "");

export function ContentCalendar() {
  const mounted = useMounted();
  const { toast } = useToast();
  const [posts, setPosts] = useState<CalendarPost[]>(INITIAL_POSTS);
  const [week, setWeek] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [addDay, setAddDay] = useState<number | null>(null);

  const dates = useMemo(() => (mounted ? weekDates(week) : null), [mounted, week]);
  const todayIdx = mounted && week === 0 ? (new Date().getDay() + 6) % 7 : -1;

  const visible = posts.filter((p) => p.week === week && (filter === "all" || p.platform === filter));
  const weekPosts = posts.filter((p) => p.week === week);
  const selected = posts.find((p) => p.id === selectedId) ?? null;

  const stats = STATUS_ORDER.map((s) => ({ s, n: weekPosts.filter((p) => p.status === s).length }));

  const cycleStatus = (id: string) =>
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: STATUS_ORDER[(STATUS_ORDER.indexOf(p.status) + 1) % 3] } : p)),
    );

  const remove = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setSelectedId(null);
    toast("Публикация удалена", "info");
  };

  const rangeLabel = dates ? `${fmtDay(dates[0])} — ${fmtDay(dates[6])}` : "Текущая неделя";

  return (
    <section id="calendar" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Контент-календарь"
          title="Неделя публикаций — под контролем"
          description="Планируйте ролики на все платформы, следите за статусами и не теряйте регулярность. Кликните по публикации, чтобы изменить статус, или добавьте новую."
        />

        <Reveal className="mt-14">
          <div className="glass rounded-3xl p-4 sm:p-6">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWeek((w) => w - 1)}
                  className="grid size-9 place-items-center rounded-lg text-zinc-400 ring-1 ring-inset ring-white/10 transition hover:bg-white/[0.06] hover:text-white"
                  aria-label="Предыдущая неделя"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <div className="min-w-[150px] text-center">
                  <p className="text-sm font-semibold text-white">{rangeLabel}</p>
                  <p className="text-[11px] text-zinc-500">
                    {week === 0 ? "Эта неделя" : week > 0 ? `Через ${week} нед.` : `${-week} нед. назад`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWeek((w) => w + 1)}
                  className="grid size-9 place-items-center rounded-lg text-zinc-400 ring-1 ring-inset ring-white/10 transition hover:bg-white/[0.06] hover:text-white"
                  aria-label="Следующая неделя"
                >
                  <ChevronRight className="size-4" />
                </button>
                {week !== 0 && (
                  <button
                    type="button"
                    onClick={() => setWeek(0)}
                    className="ml-1 inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-brand-300 hover:text-brand-200"
                  >
                    <RotateCcw className="size-3" /> Сегодня
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex flex-wrap gap-1 rounded-xl bg-white/[0.03] p-1 ring-1 ring-white/[0.07]" role="radiogroup" aria-label="Фильтр по платформе">
                  {(["all", ...PLATFORM_LIST.map((p) => p.id)] as Filter[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      role="radio"
                      aria-checked={filter === f}
                      onClick={() => setFilter(f)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition",
                        filter === f ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white",
                      )}
                    >
                      {f === "all" ? "Все" : (
                        <>
                          <PlatformIcon platform={f} className="size-3.5" /> {PLATFORMS[f].short}
                        </>
                      )}
                    </button>
                  ))}
                </div>
                <Button size="sm" onClick={() => setAddDay(todayIdx >= 0 ? todayIdx : 0)}>
                  <Plus className="size-4" /> Добавить
                </Button>
              </div>
            </div>

            {/* Status summary */}
            <div className="mt-4 flex flex-wrap gap-2">
              {stats.map(({ s, n }) => (
                <span key={s} className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] ring-1", STATUS_META[s].className)}>
                  <span className={cn("size-1.5 rounded-full", STATUS_META[s].dot)} />
                  {STATUS_META[s].label}: {n}
                </span>
              ))}
            </div>

            {/* Week grid */}
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
              {WEEKDAYS.map((day, i) => {
                const dayPosts = visible.filter((p) => p.day === i).sort((a, b) => a.time.localeCompare(b.time));
                return (
                  <div
                    key={day}
                    className={cn(
                      "flex min-h-[150px] flex-col rounded-2xl border bg-ink-900/70 p-2.5 xl:min-h-[260px]",
                      i === todayIdx ? "border-brand-400/40 shadow-[0_0_30px_-12px_rgb(139_92_246/0.7)]" : "border-white/[0.06]",
                    )}
                  >
                    <div className="mb-2 flex items-center justify-between px-1">
                      <div>
                        <p className={cn("text-xs font-semibold", i === todayIdx ? "text-brand-200" : "text-zinc-300")}>
                          <span className="xl:hidden">{day}</span>
                          <span className="hidden xl:inline">{WEEKDAYS_SHORT[i]}</span>
                        </p>
                        <p className="text-[10px] text-zinc-600">{dates ? fmtDay(dates[i]) : " "}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAddDay(i)}
                        className="grid size-6 place-items-center rounded-md text-zinc-600 transition hover:bg-white/[0.06] hover:text-white"
                        aria-label={`Добавить публикацию: ${day}`}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <ul className="flex flex-1 flex-col gap-1.5">
                      <AnimatePresence initial={false}>
                        {dayPosts.map((p) => (
                          <motion.li
                            key={p.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                          >
                            <button
                              type="button"
                              onClick={() => setSelectedId(p.id)}
                              className={cn(
                                "w-full rounded-xl bg-white/[0.03] p-2.5 text-left ring-1 ring-white/[0.06] transition hover:-translate-y-0.5 hover:bg-white/[0.06] hover:ring-white/15",
                                p.status === "draft" && "opacity-75",
                              )}
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-mono text-[10px] text-zinc-500">{p.time}</span>
                                <span className={cn("grid size-5 place-items-center rounded-md ring-1", PLATFORMS[p.platform].chip)}>
                                  <PlatformIcon platform={p.platform} className="size-3" />
                                </span>
                              </div>
                              <p className="mt-1 line-clamp-2 text-xs font-medium leading-snug text-zinc-100">{p.title}</p>
                              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-zinc-500">
                                <span className={cn("size-1.5 rounded-full", STATUS_META[p.status].dot)} />
                                {STATUS_META[p.status].label}
                              </div>
                            </button>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                      {dayPosts.length === 0 && (
                        <li className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/[0.07] p-3 text-center text-[11px] text-zinc-600">
                          Нет публикаций
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-center text-[11px] text-zinc-600">
              Демо-данные: изменения хранятся только в этой вкладке браузера.
            </p>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && (
          <Sheet key="detail" onClose={() => setSelectedId(null)} title="Публикация">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold leading-snug text-white">{selected.title}</h4>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <Info label="День">{WEEKDAYS[selected.day]}</Info>
                <Info label="Время">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5 text-zinc-500" /> {selected.time}
                  </span>
                </Info>
                <Info label="Платформа">
                  <span className="inline-flex items-center gap-1.5">
                    <PlatformIcon platform={selected.platform} className="size-3.5" /> {PLATFORMS[selected.platform].label}
                  </span>
                </Info>
                <Info label="Тип контента">{FORMAT_LABELS[selected.format]}</Info>
              </dl>
              <div>
                <p className="mb-2 text-xs text-zinc-500">Статус</p>
                <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label="Статус публикации">
                  {STATUS_ORDER.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={selected.status === s}
                      onClick={() => setPosts((prev) => prev.map((p) => (p.id === selected.id ? { ...p, status: s } : p)))}
                      className={cn(
                        "rounded-lg px-2 py-2 text-xs font-medium ring-1 transition",
                        selected.status === s ? STATUS_META[s].className : "text-zinc-500 ring-white/10 hover:text-white",
                      )}
                    >
                      {STATUS_META[s].label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="secondary" className="flex-1" onClick={() => cycleStatus(selected.id)}>
                  Следующий статус
                </Button>
                <Button variant="secondary" className="text-rose-300 hover:text-rose-200" onClick={() => remove(selected.id)} aria-label="Удалить публикацию">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </Sheet>
        )}
        {addDay !== null && (
          <Sheet key="add" onClose={() => setAddDay(null)} title="Новая публикация">
            <AddPostForm
              defaultDay={addDay}
              onSubmit={(post) => {
                setPosts((prev) => [...prev, { ...post, id: `p${Date.now()}`, week }]);
                setAddDay(null);
                if (filter !== "all" && filter !== post.platform) setFilter("all");
                toast(`Добавлено: ${WEEKDAYS[post.day]}, ${post.time}`);
              }}
            />
          </Sheet>
        )}
      </AnimatePresence>
    </section>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/[0.06]">
      <dt className="text-[11px] text-zinc-500">{label}</dt>
      <dd className="mt-0.5 text-zinc-100">{children}</dd>
    </div>
  );
}

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div
      className="fixed inset-0 z-[65] flex items-end justify-center sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong relative max-h-[90vh] w-full overflow-y-auto rounded-t-3xl p-6 sm:max-w-md sm:rounded-3xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-medium text-zinc-300">
            <CalendarPlus className="size-4 text-brand-300" /> {title}
          </p>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Закрыть"
          >
            <X className="size-4" />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

const selectCls =
  "h-10 w-full rounded-xl bg-white/[0.04] px-3 text-sm text-white ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-brand-400/60 [&>option]:bg-ink-800";

function AddPostForm({
  defaultDay,
  onSubmit,
}: {
  defaultDay: number;
  onSubmit: (p: Omit<CalendarPost, "id" | "week">) => void;
}) {
  const id = useId();
  const [title, setTitle] = useState("");
  const [day, setDay] = useState(defaultDay);
  const [time, setTime] = useState("18:00");
  const [platform, setPlatform] = useState<Platform>("tiktok");
  const [format, setFormat] = useState<PostFormat>("education");
  const [status, setStatus] = useState<PostStatus>("scheduled");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3) return setError("Введите название — минимум 3 символа");
    if (!/^\d{2}:\d{2}$/.test(time)) return setError("Укажите время публикации");
    onSubmit({ title: title.trim(), day, time, platform, format, status });
  };

  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      <div>
        <label htmlFor={`${id}-t`} className="mb-1.5 block text-xs text-zinc-400">Название</label>
        <input
          id={`${id}-t`}
          value={title}
          maxLength={80}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(null);
          }}
          placeholder="Например: 5 идей для Reels на неделю"
          className={selectCls}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${id}-d`} className="mb-1.5 block text-xs text-zinc-400">День</label>
          <select id={`${id}-d`} value={day} onChange={(e) => setDay(Number(e.target.value))} className={selectCls}>
            {WEEKDAYS.map((d, i) => (
              <option key={d} value={i}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-time`} className="mb-1.5 block text-xs text-zinc-400">Время</label>
          <input id={`${id}-time`} type="time" value={time} onChange={(e) => setTime(e.target.value)} className={cn(selectCls, "[color-scheme:dark]")} />
        </div>
        <div>
          <label htmlFor={`${id}-p`} className="mb-1.5 block text-xs text-zinc-400">Платформа</label>
          <select id={`${id}-p`} value={platform} onChange={(e) => setPlatform(e.target.value as Platform)} className={selectCls}>
            {PLATFORM_LIST.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-f`} className="mb-1.5 block text-xs text-zinc-400">Тип контента</label>
          <select id={`${id}-f`} value={format} onChange={(e) => setFormat(e.target.value as PostFormat)} className={selectCls}>
            {(Object.keys(FORMAT_LABELS) as PostFormat[]).map((f) => (
              <option key={f} value={f}>{FORMAT_LABELS[f]}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-s`} className="mb-1.5 block text-xs text-zinc-400">Статус</label>
        <select id={`${id}-s`} value={status} onChange={(e) => setStatus(e.target.value as PostStatus)} className={selectCls}>
          {STATUS_ORDER.map((s) => (
            <option key={s} value={s}>{STATUS_META[s].label}</option>
          ))}
        </select>
      </div>
      {error && <p role="alert" className="text-xs text-rose-400">{error}</p>}
      <Button type="submit" className="mt-2 w-full">
        <Plus className="size-4" /> Добавить в календарь
      </Button>
    </form>
  );
}
