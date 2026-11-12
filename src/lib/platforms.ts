import type { Platform } from "@/types";

export interface PlatformMeta {
  id: Platform;
  label: string;
  short: string;
  /** Tailwind classes for chips */
  chip: string;
  /** Hex color for charts */
  color: string;
}

export const PLATFORMS: Record<Platform, PlatformMeta> = {
  tiktok: {
    id: "tiktok",
    label: "TikTok",
    short: "TikTok",
    chip: "bg-pink-500/10 text-pink-300 ring-pink-400/20",
    color: "#f472b6",
  },
  reels: {
    id: "reels",
    label: "Instagram Reels",
    short: "Reels",
    chip: "bg-violet-500/10 text-violet-300 ring-violet-400/20",
    color: "#a78bfa",
  },
  shorts: {
    id: "shorts",
    label: "YouTube Shorts",
    short: "Shorts",
    chip: "bg-sky-500/10 text-sky-300 ring-sky-400/20",
    color: "#60a5fa",
  },
};

export const PLATFORM_LIST: PlatformMeta[] = [PLATFORMS.tiktok, PLATFORMS.reels, PLATFORMS.shorts];
