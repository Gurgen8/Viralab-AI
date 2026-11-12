"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Play, TrendingUp, Users } from "lucide-react";
import { useRef } from "react";
import { HeroMockup } from "@/components/dashboard/HeroMockup";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { AuthButton } from "@/components/ui/AuthButton";
import { ButtonLink } from "@/components/ui/Button";
import { PlatformIcon } from "@/components/ui/PlatformIcon";

const ease = [0.22, 1, 0.36, 1] as const;

function FloatingCard({
  className,
  delay,
  children,
}: {
  className: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease }}
      className={`absolute z-20 hidden lg:block ${className}`}
    >
      <div className="glass-strong rounded-2xl p-3.5 shadow-[0_20px_60px_-15px_rgb(0_0_0/0.8)]">{children}</div>
    </motion.div>
  );
}

function Ring({ value }: { value: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 40 40" className="size-11 -rotate-90" aria-hidden>
      <circle cx="20" cy="20" r={r} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="3.5" />
      <motion.circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - value / 100) }}
        transition={{ duration: 1.6, delay: 1.2, ease }}
      />
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Hero() {
  const mockRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mockRef, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(124_58_237/0.38),transparent_65%)]" />
        <div className="absolute left-[8%] top-[420px] h-[360px] w-[360px] rounded-full bg-fuchsia-600/15 blur-[120px]" />
        <div className="absolute right-[6%] top-[520px] h-[380px] w-[380px] rounded-full bg-sky-600/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-brand-400/25 bg-brand-500/[0.08] py-1.5 pl-2 pr-4 text-xs font-medium text-brand-200 sm:text-[13px]">
              <span className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_25%,rgb(255_255_255/0.08)_50%,transparent_75%)] bg-[length:200%_100%]" />
              <span className="relative size-1.5 animate-pulse-dot rounded-full bg-brand-300" />
              <span className="relative rounded-full bg-brand-500/25 px-2 py-0.5 text-[11px] text-white">Новое</span>
              <span className="relative">AI-студия контента</span>
            </span>
          </motion.div>

          <h1 className="mt-7 animate-rise text-balance text-[40px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[76px]"
          >
            <span className="text-fade">Хватит просто публиковать.</span>
            <br />
            <span className="text-fade">Создавай </span>
            <span className="text-gradient">вирусный контент</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease }}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Твоя AI-студия для TikTok, Instagram Reels и YouTube Shorts. Генерируй идеи, создавай сценарии и
            развивай свои социальные сети быстрее.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease }}
            className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <AuthButton size="lg" arrow>
              Начать бесплатно
            </AuthButton>
            <ButtonLink href="/#platform" variant="secondary" size="lg">
              <Play className="size-4 fill-current" />
              Посмотреть платформу
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500 sm:text-[13px]"
          >
            <li className="flex items-center gap-1.5">
              <PlatformIcon platform="tiktok" className="size-3.5" /> TikTok
            </li>
            <li className="flex items-center gap-1.5">
              <PlatformIcon platform="reels" className="size-3.5" /> Instagram Reels
            </li>
            <li className="flex items-center gap-1.5">
              <PlatformIcon platform="shorts" className="size-3.5" /> YouTube Shorts
            </li>
            <li className="hidden h-3 w-px bg-white/10 sm:block" aria-hidden />
            <li>Бесплатный тариф навсегда</li>
          </motion.ul>
        </div>

        {/* Product mockup */}
        <div ref={mockRef} className="relative mx-auto mt-16 max-w-5xl [perspective:1600px] sm:mt-20">
          <div aria-hidden className="absolute -inset-x-10 -top-10 bottom-0 rounded-[40px] bg-gradient-to-b from-brand-600/25 via-fuchsia-600/10 to-transparent blur-3xl" />

          <FloatingCard className="-left-3 top-16 xl:-left-20" delay={0.9}>
            <div className="flex items-center gap-3 pr-2 animate-float">
              <Ring value={72} />
              <div>
                <AnimatedNumber value={18.6} decimals={1} suffix="%" className="text-lg font-semibold text-white" />
                <p className="text-[11px] text-zinc-400">Вовлечённость</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="-left-3 top-52 xl:-left-14" delay={1.05}>
            <div className="flex items-center gap-3 pr-2">
              <span className="grid size-10 place-items-center rounded-xl bg-pink-500/15 text-pink-300 ring-1 ring-pink-400/25">
                <Users className="size-4" />
              </span>
              <div>
                <AnimatedNumber value={24} prefix="+" suffix="%" className="text-lg font-semibold text-white" />
                <p className="text-[11px] text-zinc-400">Рост подписчиков</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="-right-3 top-10 xl:-right-16" delay={1.2}>
            <div className="w-52 animate-float-slow">
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                <TrendingUp className="size-3.5 text-emerald-400" /> Тренд недели
              </div>
              <p className="mt-1.5 text-[13px] font-medium leading-snug text-white">«Ожидание vs реальность» в нише финансов</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="rounded-md bg-emerald-400/10 px-1.5 py-0.5 text-[11px] font-medium text-emerald-300">
                  +312% упоминаний
                </span>
                <PlatformIcon platform="tiktok" className="size-3.5 text-zinc-500" />
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="-right-3 top-56 xl:-right-10" delay={1.35}>
            <div className="flex items-center gap-3 pr-1">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/25">
                <Heart className="size-4" />
              </span>
              <div>
                <AnimatedNumber value={9.4} decimals={1} suffix="K" className="text-lg font-semibold text-white" />
                <p className="text-[11px] text-zinc-400">Лайков за сутки</p>
              </div>
            </div>
          </FloatingCard>

          <motion.div
            style={{ rotateX, scale }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="relative origin-top"
          >
            <HeroMockup />
          </motion.div>
          <p className="relative mt-4 text-center text-xs text-zinc-600">Пример интерфейса платформы · демонстрационные данные</p>
        </div>
      </div>
    </section>
  );
}
