"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Flame, GraduationCap, Info, Laugh, LoaderCircle, Sparkles } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { GeneratorEmpty, GeneratorLoading, GeneratorResults, STYLE_LABELS } from "@/components/dashboard/GeneratorResults";
import { Button } from "@/components/ui/Button";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TOPIC_EXAMPLES } from "@/data/generator-templates";
import { generateContent } from "@/lib/generator";
import { PLATFORM_LIST } from "@/lib/platforms";
import { cn } from "@/lib/utils";
import type { ContentLanguage, ContentStyle, GeneratedContent, GeneratorInput } from "@/types";

const STYLE_OPTIONS: { id: ContentStyle; icon: typeof Laugh }[] = [
  { id: "educational", icon: GraduationCap },
  { id: "humor", icon: Laugh },
  { id: "professional", icon: Briefcase },
  { id: "motivational", icon: Flame },
];

const LANGUAGES: { id: ContentLanguage; label: string }[] = [
  { id: "ru", label: "Русский" },
  { id: "en", label: "English" },
];

const MAX_TOPIC = 140;
const STEP_MS = 420;

const fieldCls =
  "w-full rounded-xl bg-white/[0.035] px-3.5 text-sm text-white ring-1 ring-inset ring-white/10 transition placeholder:text-zinc-600 hover:ring-white/15 focus:bg-white/[0.05] focus:outline-none focus:ring-brand-400/60";

function Label({ htmlFor, children, hint }: { htmlFor?: string; children: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <label htmlFor={htmlFor} className="text-xs font-medium text-zinc-300">
        {children}
      </label>
      {hint}
    </div>
  );
}

export function Generator() {
  const topicId = useId();
  const audienceId = useId();
  const [form, setForm] = useState<GeneratorInput>({
    topic: "",
    audience: "",
    platform: "tiktok",
    style: "educational",
    language: "ru",
  });
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const variantRef = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const update = <K extends keyof GeneratorInput>(key: K, value: GeneratorInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const run = (input: GeneratorInput, variant: number) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStatus("loading");
    setStep(0);
    for (let i = 1; i <= 3; i++) timers.current.push(setTimeout(() => setStep(i), STEP_MS * i));
    timers.current.push(
      setTimeout(() => {
        setResult(generateContent(input, variant));
        setStatus("done");
      }, STEP_MS * 4),
    );
    if (window.innerWidth < 1024) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const topic = form.topic.trim();
    if (topic.length < 3) {
      setError("Опишите тему — минимум 3 символа");
      document.getElementById(topicId)?.focus();
      return;
    }
    setError(null);
    variantRef.current = 0;
    run({ ...form, topic }, 0);
  };

  const regenerate = () => {
    if (!result) return;
    variantRef.current += 1;
    run(result.input, variantRef.current);
  };

  const applyExample = (i = 0) => {
    const ex = TOPIC_EXAMPLES[i];
    const next = { ...form, topic: ex.topic, audience: ex.audience };
    setForm(next);
    setError(null);
    return next;
  };

  return (
    <section id="platform" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-40 mx-auto h-[500px] max-w-4xl rounded-full bg-brand-700/15 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={<>Платформа · AI Content Generator</>}
          title={
            <>
              Опиши идею — получи <span className="text-gradient">готовый пакет</span> для публикации
            </>
          }
          description="Хуки, сценарий, описание, хештеги и CTA за один клик. Попробуйте прямо здесь — регистрация не нужна."
        />

        <Reveal className="mx-auto mt-8 flex max-w-2xl items-start gap-2.5 rounded-xl border border-amber-300/15 bg-amber-300/[0.05] px-4 py-3 text-left text-xs leading-relaxed text-amber-100/80 sm:text-[13px]">
          <Info className="mt-0.5 size-4 shrink-0 text-amber-300" />
          <p>
            <strong className="font-semibold text-amber-200">Демо-режим.</strong> AI API не подключён: результат
            собирается локально из подготовленной библиотеки шаблонов с учётом вашей темы, аудитории, платформы и стиля.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="glass relative overflow-hidden rounded-3xl p-2 shadow-[0_40px_120px_-40px_rgb(124_58_237/0.5)]">
            <div className="grid gap-2 lg:grid-cols-[400px_1fr]">
              {/* Form */}
              <form
                onSubmit={submit}
                noValidate
                className="rounded-[20px] border border-white/[0.06] bg-ink-900/80 p-5 sm:p-6"
                aria-label="Параметры генерации"
              >
                <div className="mb-6 flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/25">
                    <Sparkles className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Новый контент</p>
                    <p className="text-[11px] text-zinc-500">Заполните поля и запустите генерацию</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label
                      htmlFor={topicId}
                      hint={
                        <span className={cn("font-mono text-[10px]", form.topic.length > MAX_TOPIC - 15 ? "text-amber-300" : "text-zinc-600")}>
                          {form.topic.length}/{MAX_TOPIC}
                        </span>
                      }
                    >
                      Тема или идея публикации <span className="text-brand-300">*</span>
                    </Label>
                    <textarea
                      id={topicId}
                      rows={3}
                      maxLength={MAX_TOPIC}
                      value={form.topic}
                      onChange={(e) => {
                        update("topic", e.target.value);
                        if (error) setError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
                      }}
                      placeholder="Например: как вести бюджет без стресса"
                      aria-invalid={!!error}
                      aria-describedby={error ? `${topicId}-err` : undefined}
                      className={cn(fieldCls, "resize-none py-3 leading-relaxed", error && "ring-rose-400/50")}
                    />
                    {error && (
                      <p id={`${topicId}-err`} role="alert" className="mt-1.5 text-xs text-rose-400">
                        {error}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {TOPIC_EXAMPLES.map((ex, i) => (
                        <button
                          key={ex.topic}
                          type="button"
                          onClick={() => applyExample(i)}
                          className="rounded-full bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-400 ring-1 ring-white/[0.08] transition hover:bg-white/[0.07] hover:text-white"
                        >
                          {ex.topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={audienceId}>Целевая аудитория</Label>
                    <input
                      id={audienceId}
                      value={form.audience}
                      maxLength={80}
                      onChange={(e) => update("audience", e.target.value)}
                      placeholder="Например: студенты и молодые специалисты"
                      className={cn(fieldCls, "h-11")}
                    />
                  </div>

                  <fieldset>
                    <legend className="mb-2 text-xs font-medium text-zinc-300">Платформа</legend>
                    <div className="grid grid-cols-3 gap-1.5" role="radiogroup">
                      {PLATFORM_LIST.map((p) => {
                        const active = form.platform === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => update("platform", p.id)}
                            className={cn(
                              "flex flex-col items-center gap-1.5 rounded-xl px-2 py-2.5 text-[11px] font-medium ring-1 ring-inset transition",
                              active ? cn(p.chip, "ring-current/30") : "text-zinc-400 ring-white/10 hover:bg-white/[0.04] hover:text-white",
                            )}
                          >
                            <PlatformIcon platform={p.id} className="size-[18px]" />
                            {p.short}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-xs font-medium text-zinc-300">Стиль</legend>
                    <div className="grid grid-cols-2 gap-1.5" role="radiogroup">
                      {STYLE_OPTIONS.map(({ id, icon: Icon }) => {
                        const active = form.style === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => update("style", id)}
                            className={cn(
                              "flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium ring-1 ring-inset transition",
                              active
                                ? "bg-brand-500/15 text-white ring-brand-400/40"
                                : "text-zinc-400 ring-white/10 hover:bg-white/[0.04] hover:text-white",
                            )}
                          >
                            <Icon className={cn("size-4", active ? "text-brand-300" : "text-zinc-500")} />
                            {STYLE_LABELS[id]}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-xs font-medium text-zinc-300">Язык контента</legend>
                    <div className="inline-grid grid-cols-2 gap-1 rounded-xl bg-white/[0.03] p-1 ring-1 ring-white/10" role="radiogroup">
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          role="radio"
                          aria-checked={form.language === l.id}
                          onClick={() => update("language", l.id)}
                          className={cn(
                            "rounded-lg px-4 py-1.5 text-xs font-medium transition",
                            form.language === l.id ? "bg-white/10 text-white shadow" : "text-zinc-500 hover:text-white",
                          )}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <Button type="submit" size="lg" className="mt-7 w-full" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" /> Генерируем…
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" /> Сгенерировать контент
                    </>
                  )}
                </Button>
                <p className="mt-2.5 text-center text-[11px] text-zinc-600">⌘ / Ctrl + Enter — быстрый запуск</p>
              </form>

              {/* Results */}
              <div ref={resultsRef} className="scroll-mt-24 rounded-[20px] border border-white/[0.06] bg-ink-900/60 p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={status === "done" ? result?.id : status}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    {status === "idle" && (
                      <GeneratorEmpty
                        onExample={() => {
                          const next = applyExample(0);
                          variantRef.current = 0;
                          run(next, 0);
                        }}
                      />
                    )}
                    {status === "loading" && <GeneratorLoading step={step} />}
                    {status === "done" && result && <GeneratorResults content={result} onRegenerate={regenerate} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
