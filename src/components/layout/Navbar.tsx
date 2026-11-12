"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { AuthButton } from "@/components/ui/AuthButton";
import { NAV_ITEMS } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLockBody } from "@/hooks/useLockBody";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS.map((i) => i.id));
  useLockBody(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled || open
            ? "border-b border-white/[0.07] bg-ink-950/75 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8" aria-label="Основная навигация">
          <Logo />

          <ul className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.025] p-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-1.5 text-sm transition-colors",
                    active === item.id ? "text-white" : "text-zinc-400 hover:text-white",
                  )}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <AuthButton mode="login" variant="ghost" size="sm">
              Войти
            </AuthButton>
            <AuthButton size="sm" arrow>
              Начать бесплатно
            </AuthButton>
          </div>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl text-zinc-200 ring-1 ring-inset ring-white/10 transition hover:bg-white/[0.06] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ink-950/95 px-4 pb-8 pt-4 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/[0.06] py-4 text-lg font-medium text-zinc-100"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-zinc-600">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 grid grid-cols-[auto_1fr] gap-2.5 sm:flex sm:justify-end">
              <AuthButton mode="login" variant="secondary" size="md" onClick={() => setOpen(false)}>
                Войти
              </AuthButton>
              <AuthButton size="md" arrow onClick={() => setOpen(false)}>
                Начать бесплатно
              </AuthButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
