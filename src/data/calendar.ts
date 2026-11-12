import type { CalendarPost, PostFormat, PostStatus } from "@/types";

export const WEEKDAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
export const WEEKDAYS_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const FORMAT_LABELS: Record<PostFormat, string> = {
  education: "Обучающее",
  trend: "Тренд",
  backstage: "Закулисье",
  review: "Обзор",
  story: "Сторителлинг",
};

export const STATUS_META: Record<PostStatus, { label: string; className: string; dot: string }> = {
  published: { label: "Опубликовано", className: "text-emerald-300 bg-emerald-400/10 ring-emerald-400/20", dot: "bg-emerald-400" },
  scheduled: { label: "Запланировано", className: "text-violet-200 bg-violet-400/10 ring-violet-400/25", dot: "bg-violet-400" },
  draft: { label: "Черновик", className: "text-zinc-300 bg-white/5 ring-white/10", dot: "bg-zinc-400" },
};

export const STATUS_ORDER: PostStatus[] = ["draft", "scheduled", "published"];

export const INITIAL_POSTS: CalendarPost[] = [
  { id: "p1", week: 0, day: 0, time: "09:00", title: "3 ошибки в бюджете новичка", platform: "tiktok", format: "education", status: "published" },
  { id: "p2", week: 0, day: 0, time: "19:30", title: "Как я планирую неделю за 10 минут", platform: "reels", format: "story", status: "published" },
  { id: "p3", week: 0, day: 1, time: "18:00", title: "Тренд: «ожидание vs реальность»", platform: "tiktok", format: "trend", status: "published" },
  { id: "p4", week: 0, day: 2, time: "12:00", title: "Закулисье съёмки рекламы", platform: "shorts", format: "backstage", status: "scheduled" },
  { id: "p5", week: 0, day: 3, time: "19:00", title: "Обзор 5 приложений для монтажа", platform: "shorts", format: "review", status: "scheduled" },
  { id: "p6", week: 0, day: 3, time: "21:00", title: "Мотивация: первый шаг", platform: "reels", format: "story", status: "draft" },
  { id: "p7", week: 0, day: 4, time: "17:30", title: "Хук, который удержал 72% зрителей", platform: "tiktok", format: "education", status: "scheduled" },
  { id: "p8", week: 0, day: 5, time: "11:00", title: "Субботний влог из студии", platform: "reels", format: "backstage", status: "draft" },
];
