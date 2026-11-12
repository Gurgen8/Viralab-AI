"use client";

import { motion } from "framer-motion";
import { Clapperboard, Clock, FileText, Hash, Megaphone, RotateCcw, Sparkles, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { contentToText, scriptToText } from "@/lib/generator";
import { PLATFORMS } from "@/lib/platforms";
import { cn } from "@/lib/utils";
import type { ContentStyle, GeneratedContent } from "@/types";

export const STYLE_LABELS: Record<ContentStyle, string> = {
  educational: "Образовательный",
  humor: "Юмористический",
  professional: "Профессиональный",
  motivational: "Мотивационный",
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } }),
};

function Block({
  index,
  icon,
  title,
  copyText,
  copyLabel,
  children,
  className,
}: {
  index: number;
  icon: ReactNode;
  title: string;
  copyText?: string;
  copyLabel?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.article
      custom={index}
      variants={item}
      initial="hidden"
      animate="show"
      className={cn("rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5", className)}
    >
      <header className="mb-3 flex items-center justify-between gap-3">
        <h4 className="flex items-center gap-2 text-sm font-medium text-white">
          <span className="grid size-7 place-items-center rounded-lg bg-white/[0.05] text-brand-300 ring-1 ring-white/10">{icon}</span>
          {title}
        </h4>
        {copyText && <CopyButton text={copyText} label={copyLabel ?? `Копировать: ${title}`} visibleLabel="Копировать" showLabel />}
      </header>
      {children}
    </motion.article>
  );
}

export function GeneratorResults({
  content,
  onRegenerate,
}: {
  content: GeneratedContent;
  onRegenerate: () => void;
}) {
  const platform = PLATFORMS[content.input.platform];

  return (
    <div className="space-y-4" aria-live="polite">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ring-1", platform.chip)}>
            <PlatformIcon platform={platform.id} className="size-3.5" /> {platform.label}
          </span>
          <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-zinc-300 ring-1 ring-white/10">
            {STYLE_LABELS[content.input.style]}
          </span>
          <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-zinc-300 ring-1 ring-white/10">
            {content.input.language === "ru" ? "Русский" : "English"}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-white/10 transition hover:bg-white/[0.06] hover:text-white"
          >
            <RotateCcw className="size-3.5" /> Другой вариант
          </button>
          <CopyButton text={contentToText(content)} label="Скопировать всё" toastMessage="Весь пакет контента скопирован" showLabel />
        </div>
      </motion.div>

      <Block index={0} icon={<Zap className="size-3.5" />} title="Цепляющее начало — 3 варианта">
        <ol className="space-y-2">
          {content.hooks.map((hook, i) => (
            <li
              key={hook}
              className={cn(
                "group flex items-start gap-3 rounded-xl p-3 ring-1 transition",
                i === 0 ? "bg-brand-500/[0.09] ring-brand-400/25" : "bg-white/[0.02] ring-white/[0.06] hover:ring-white/15",
              )}
            >
              <span className="mt-0.5 font-mono text-[11px] text-zinc-500">0{i + 1}</span>
              <p className="flex-1 text-sm leading-relaxed text-zinc-100">{hook}</p>
              <CopyButton text={hook} label={`Копировать хук ${i + 1}`} toastMessage={`Хук ${i + 1} скопирован`} />
            </li>
          ))}
        </ol>
      </Block>

      <Block index={1} icon={<Clapperboard className="size-3.5" />} title="Сценарий" copyText={scriptToText(content)} copyLabel="Копировать сценарий">
        <ol className="relative space-y-4 border-l border-white/10 pl-5">
          {content.script.map((scene, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden
                className="absolute -left-[25px] top-1 size-2.5 rounded-full bg-gradient-to-br from-brand-300 to-fuchsia-500 ring-4 ring-ink-900"
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] text-brand-300">{scene.time}</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">{scene.label}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-zinc-100">{scene.voiceover}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                <span className="text-zinc-400">Визуал:</span> {scene.visual}
              </p>
            </li>
          ))}
        </ol>
      </Block>

      <div className="grid gap-4 xl:grid-cols-2">
        <Block index={2} icon={<FileText className="size-3.5" />} title="Описание" copyText={content.description} copyLabel="Копировать описание">
          <p className="text-sm leading-relaxed text-zinc-200">{content.description}</p>
        </Block>
        <Block index={3} icon={<Hash className="size-3.5" />} title="Хештеги" copyText={content.hashtags.join(" ")} copyLabel="Копировать хештеги">
          <ul className="flex flex-wrap gap-1.5">
            {content.hashtags.map((tag) => (
              <li key={tag} className="rounded-lg bg-sky-400/[0.08] px-2 py-1 text-xs text-sky-200 ring-1 ring-sky-400/15">
                {tag}
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Block index={4} icon={<Clock className="size-3.5" />} title="Длительность" copyText={content.duration.label} copyLabel="Копировать длительность">
          <p className="text-2xl font-semibold tracking-tight text-white">{content.duration.label}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{content.duration.note}</p>
        </Block>
        <Block index={5} icon={<Megaphone className="size-3.5" />} title="Призыв к действию" copyText={content.cta} copyLabel="Копировать призыв к действию">
          <p className="text-sm leading-relaxed text-zinc-200">{content.cta}</p>
        </Block>
      </div>
    </div>
  );
}

export function GeneratorEmpty({ onExample }: { onExample: () => void }) {
  const items = [
    { icon: Zap, t: "3 варианта хука" },
    { icon: Clapperboard, t: "Покадровый сценарий" },
    { icon: FileText, t: "Описание публикации" },
    { icon: Hash, t: "Хештеги" },
    { icon: Clock, t: "Длительность" },
    { icon: Megaphone, t: "Призыв к действию" },
  ];
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-6 py-12 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-brand-500/30 blur-2xl" aria-hidden />
        <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/30 to-fuchsia-500/20 text-brand-200 ring-1 ring-brand-400/30">
          <Sparkles className="size-6" />
        </span>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-white">Здесь появится ваш контент</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
        Опишите тему слева и нажмите «Сгенерировать контент». Получите готовый пакет для публикации:
      </p>
      <ul className="mt-6 grid w-full max-w-md grid-cols-2 gap-2 text-left sm:grid-cols-3">
        {items.map(({ icon: Icon, t }) => (
          <li key={t} className="flex items-center gap-2 rounded-lg bg-white/[0.025] px-2.5 py-2 text-xs text-zinc-400 ring-1 ring-white/[0.06]">
            <Icon className="size-3.5 shrink-0 text-brand-300" /> {t}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onExample}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 transition hover:text-brand-200"
      >
        Попробовать на примере →
      </button>
    </div>
  );
}

const STEPS = ["Разбираем тему и аудиторию", "Подбираем хуки из библиотеки", "Собираем сценарий и описание", "Подбираем хештеги"];

export function GeneratorLoading({ step }: { step: number }) {
  return (
    <div className="space-y-4" role="status" aria-label="Генерация контента">
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
        <ul className="space-y-3">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-3 text-sm">
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full text-[10px] transition",
                  i < step && "bg-emerald-400/15 text-emerald-300",
                  i === step && "bg-brand-500/20 text-brand-200",
                  i > step && "bg-white/5 text-zinc-600",
                )}
              >
                {i < step ? "✓" : i === step ? <span className="size-1.5 animate-pulse rounded-full bg-brand-300" /> : i + 1}
              </span>
              <span className={cn(i <= step ? "text-zinc-200" : "text-zinc-600")}>{s}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 via-fuchsia-400 to-sky-400"
            animate={{ width: `${Math.min(100, ((step + 1) / STEPS.length) * 100)}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-2.5 rounded-2xl border border-white/[0.06] p-5">
          <div className="skeleton h-4 w-1/3 rounded" />
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-5/6 rounded" />
        </div>
      ))}
    </div>
  );
}
