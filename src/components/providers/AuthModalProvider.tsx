"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CircleCheck, LoaderCircle, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useLockBody } from "@/hooks/useLockBody";
import { PLANS } from "@/data/site";
import type { AuthMode, PlanId } from "@/types";
import { cn } from "@/lib/utils";

interface OpenOptions {
  mode?: AuthMode;
  plan?: PlanId;
}

const AuthContext = createContext<{ openAuth: (opts?: OpenOptions) => void } | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; mode: AuthMode; plan: PlanId }>({
    open: false,
    mode: "signup",
    plan: "free",
  });

  const openAuth = useCallback((opts?: OpenOptions) => {
    setState({ open: true, mode: opts?.mode ?? "signup", plan: opts?.plan ?? "free" });
  }, []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ openAuth }), [openAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {state.open && (
          <AuthDialog
            key="auth"
            mode={state.mode}
            plan={state.plan}
            onClose={close}
            onModeChange={(mode) => setState((s) => ({ ...s, mode }))}
            onPlanChange={(plan) => setState((s) => ({ ...s, plan }))}
          />
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthModal must be used inside AuthModalProvider");
  return ctx;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function AuthDialog({
  mode,
  plan,
  onClose,
  onModeChange,
  onPlanChange,
}: {
  mode: AuthMode;
  plan: PlanId;
  onClose: () => void;
  onModeChange: (m: AuthMode) => void;
  onPlanChange: (p: PlanId) => void;
}) {
  useLockBody(true);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("input")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input, a[href], [tabindex]:not([tabindex="-1"])',
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && name.trim().length < 2) return setError("Введите имя — минимум 2 символа");
    if (!EMAIL_RE.test(email.trim())) return setError("Введите корректный email, например name@mail.com");
    setError(null);
    setStatus("loading");
    setTimeout(() => setStatus("done"), 900);
  };

  const planMeta = PLANS.find((p) => p.id === plan)!;

  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong relative w-full max-w-[420px] overflow-hidden rounded-2xl p-6 shadow-2xl shadow-black/60 sm:p-8"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-brand-600/30 blur-3xl" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Закрыть"
        >
          <X className="size-4" />
        </button>

        {status === "done" ? (
          <div className="relative flex flex-col items-center py-4 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="grid size-14 place-items-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/30"
            >
              <CircleCheck className="size-7 text-emerald-400" />
            </motion.div>
            <h2 id={titleId} className="mt-5 text-xl font-semibold text-white">
              {mode === "signup" ? "Заявка принята (демо)" : "Вход выполнен (демо)"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Это демонстрационная версия сайта: данные никуда не отправляются и не сохраняются. Чтобы включить
              настоящую регистрацию, подключите бэкенд авторизации.
            </p>
            <Button className="mt-6 w-full" onClick={onClose}>
              Вернуться к платформе
            </Button>
          </div>
        ) : (
          <div className="relative">
            <LogoMark className="size-10" />
            <h2 id={titleId} className="mt-5 text-xl font-semibold tracking-tight text-white">
              {mode === "signup" ? "Создайте аккаунт ViralLab AI" : "С возвращением"}
            </h2>
            <p className="mt-1.5 text-sm text-zinc-400">
              {mode === "signup" ? "Начните создавать вирусный контент уже сегодня." : "Войдите, чтобы продолжить работу."}
            </p>

            {mode === "signup" && (
              <div className="mt-5 grid grid-cols-3 gap-1 rounded-xl bg-white/[0.04] p-1 ring-1 ring-white/10" role="radiogroup" aria-label="Тариф">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={plan === p.id}
                    onClick={() => onPlanChange(p.id)}
                    className={cn(
                      "rounded-lg py-1.5 text-xs font-semibold tracking-wide transition",
                      plan === p.id ? "bg-brand-600 text-white shadow" : "text-zinc-400 hover:text-white",
                    )}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={submit} className="mt-5 space-y-3" noValidate>
              {mode === "signup" && (
                <Field label="Имя" value={name} onChange={setName} placeholder="Как к вам обращаться" autoComplete="name" />
              )}
              <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="name@mail.com" autoComplete="email" />
              {error && (
                <p className="text-xs text-rose-400" role="alert">
                  {error}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <>
                    {mode === "signup"
                      ? `Продолжить с тарифом ${planMeta.name}`
                      : "Войти"}
                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-4 text-center text-xs text-zinc-500">
              {mode === "signup" ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}{" "}
              <button
                type="button"
                className="font-medium text-brand-300 hover:text-brand-200"
                onClick={() => {
                  setError(null);
                  onModeChange(mode === "signup" ? "login" : "signup");
                }}
              >
                {mode === "signup" ? "Войти" : "Зарегистрироваться"}
              </button>
            </p>
            <p className="mt-4 rounded-lg bg-white/[0.03] px-3 py-2 text-center text-[11px] leading-relaxed text-zinc-500 ring-1 ring-white/5">
              Демо-режим: форма проверяет ввод, но не создаёт аккаунт.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-zinc-400">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-xl bg-white/[0.04] px-3.5 text-sm text-white ring-1 ring-inset ring-white/10 transition placeholder:text-zinc-600 focus:bg-white/[0.06] focus:outline-none focus:ring-brand-400/60"
      />
    </div>
  );
}
