import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { Footer } from "./Footer";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft className="size-4" /> На главную
          </Link>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-300">Правовая информация</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-zinc-500">Обновлено: {updated}</p>
        <div className="mt-6 rounded-xl border border-amber-300/15 bg-amber-300/[0.05] p-4 text-sm text-amber-100/80">
          Это шаблон документа для демонстрационной версии. Перед запуском продукта замените текст на юридически
          проверенную версию.
        </div>
        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-zinc-400 [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
