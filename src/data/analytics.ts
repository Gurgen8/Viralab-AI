import { seededRandom } from "@/lib/utils";
import type { Platform } from "@/types";

/** All numbers here are demo data, generated deterministically. */

export type AnalyticsFilter = "all" | Platform;
export type Period = 7 | 30;

export interface DayPoint {
  day: string;
  views: number;
  engagement: number;
}

const PROFILE: Record<Platform, { base: number; eng: number; watch: number; retention: number }> = {
  tiktok: { base: 21000, eng: 7.9, watch: 14.2, retention: 61 },
  reels: { base: 13500, eng: 6.1, watch: 11.6, retention: 55 },
  shorts: { base: 9800, eng: 5.2, watch: 19.4, retention: 49 },
};

function series(platform: Platform, length: number): DayPoint[] {
  const rand = seededRandom(platform.length * 977 + length);
  const { base, eng } = PROFILE[platform];
  return Array.from({ length }, (_, i) => {
    const trend = 1 + (i / length) * 0.65;
    const spike = rand() > 0.86 ? 1.9 + rand() : 1;
    const wave = 1 + Math.sin(i / 2.3) * 0.12;
    return {
      day: `${i + 1}`,
      views: Math.round(base * trend * wave * spike * (0.8 + rand() * 0.4)),
      engagement: +(eng * (0.85 + rand() * 0.3) * (spike > 1 ? 1.25 : 1)).toFixed(2),
    };
  });
}

const DAY_LABELS_7 = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function getSeries(filter: AnalyticsFilter, period: Period): DayPoint[] {
  const platforms: Platform[] = filter === "all" ? ["tiktok", "reels", "shorts"] : [filter];
  const merged = platforms
    .map((p) => series(p, period))
    .reduce<DayPoint[]>((acc, s) => {
      s.forEach((pt, i) => {
        if (!acc[i]) acc[i] = { ...pt };
        else {
          acc[i].views += pt.views;
          acc[i].engagement = +((acc[i].engagement + pt.engagement) / 2).toFixed(2);
        }
      });
      return acc;
    }, []);
  return merged.map((pt, i) => ({
    ...pt,
    day: period === 7 ? DAY_LABELS_7[i] : `${i + 1}`,
  }));
}

export function getKpis(filter: AnalyticsFilter, period: Period) {
  const data = getSeries(filter, period);
  const prev = getSeries(filter, period).map((d) => d.views * 0.78);
  const views = data.reduce((s, d) => s + d.views, 0);
  const prevViews = prev.reduce((s, v) => s + v, 0);
  const platforms: Platform[] = filter === "all" ? ["tiktok", "reels", "shorts"] : [filter];
  const avg = (key: "watch" | "retention") =>
    platforms.reduce((s, p) => s + PROFILE[p][key], 0) / platforms.length;
  const engagement = data.reduce((s, d) => s + d.engagement, 0) / data.length;
  return {
    views,
    viewsDelta: ((views - prevViews) / prevViews) * 100,
    engagement,
    engagementDelta: period === 7 ? 1.8 : 3.4,
    watchTime: avg("watch"),
    watchDelta: period === 7 ? 0.9 : 2.1,
    retention: avg("retention"),
    retentionDelta: period === 7 ? 2.4 : 4.7,
  };
}

export function getRetention(filter: AnalyticsFilter) {
  const platforms: Platform[] = filter === "all" ? ["tiktok", "reels", "shorts"] : [filter];
  const r = platforms.reduce((s, p) => s + PROFILE[p].retention, 0) / platforms.length;
  return [0, 3, 6, 10, 15, 20, 25, 30].map((sec) => {
    const value = sec === 0 ? 100 : 100 - (100 - r) * (1 - Math.exp(-sec / 7)) - sec * 0.35;
    return { sec: `${sec}с`, value: Math.max(10, Math.round(value)) };
  });
}

export const TOP_POSTS: Array<{
  title: string;
  platform: Platform;
  views: number;
  er: number;
  retention: number;
}> = [
  { title: "3 ошибки в бюджете, которые съедают зарплату", platform: "tiktok", views: 184200, er: 11.4, retention: 72 },
  { title: "Утро продуктивного человека: честная версия", platform: "reels", views: 96700, er: 9.1, retention: 64 },
  { title: "Почему ваша кофейня не растёт в соцсетях", platform: "shorts", views: 71300, er: 7.8, retention: 58 },
  { title: "POV: первый день в спортзале", platform: "tiktok", views: 65900, er: 12.6, retention: 69 },
];
