import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { FOOTER_COLUMNS } from "@/data/site";

const SOCIALS = [
  { label: "TikTok", href: "https://www.tiktok.com", icon: "tiktok" as const },
  { label: "Instagram", href: "https://www.instagram.com", icon: "reels" as const },
  { label: "YouTube", href: "https://www.youtube.com", icon: "shorts" as const },
  { label: "Telegram", href: "https://telegram.org", icon: "telegram" as const },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.7fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              AI-студия для создания вирусного контента в TikTok, Instagram Reels и YouTube Shorts.
            </p>
            <ul className="mt-6 flex gap-2" aria-label="Социальные сети">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-9 place-items-center rounded-lg text-zinc-400 ring-1 ring-inset ring-white/10 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <PlatformIcon platform={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-medium text-white">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-zinc-400 transition hover:text-zinc-100">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-zinc-400/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ViralLab AI. Все права защищены.</p>
          <p>Демонстрационная версия продукта. Показатели и отзывы на странице — примеры.</p>
        </div>
      </div>
    </footer>
  );
}
