import { PlatformIcon } from "@/components/ui/PlatformIcon";

const ITEMS = [
  "Идеи для роликов",
  "Хуки за 3 секунды",
  "Сценарии с таймкодами",
  "Описания и хештеги",
  "Контент-календарь",
  "Аналитика удержания",
];

export function PlatformStrip() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative border-y border-white/[0.06] bg-white/[0.01] py-5" aria-label="Ключевые возможности">
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee gap-10 pr-10">
          {row.map((t, i) => (
            <li key={i} className="flex items-center gap-3 whitespace-nowrap text-sm text-zinc-400" aria-hidden={i >= ITEMS.length}>
              <PlatformIcon platform={(["tiktok", "reels", "shorts"] as const)[i % 3]} className="size-4 text-brand-300/70" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
