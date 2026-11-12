import type { Platform } from "@/types";
import { cn } from "@/lib/utils";

/** Simplified, generic platform glyphs (not official logos). */
export function PlatformIcon({ platform, className }: { platform: Platform | "telegram"; className?: string }) {
  const cls = cn("size-4", className);
  switch (platform) {
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <path
            d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "reels":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="17" cy="7" r="1.1" fill="currentColor" />
        </svg>
      );
    case "shorts":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="2" />
          <path d="m10.5 9.5 4 2.5-4 2.5v-5Z" fill="currentColor" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <path d="m21 4-18 7.5 6 2 2 6 3.5-4.5 4.5 3.5L21 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="m9 13.5 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}
