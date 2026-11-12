export type Platform = "tiktok" | "reels" | "shorts";
export type ContentStyle = "educational" | "humor" | "professional" | "motivational";
export type ContentLanguage = "ru" | "en";

export interface GeneratorInput {
  topic: string;
  audience: string;
  platform: Platform;
  style: ContentStyle;
  language: ContentLanguage;
}

export interface ScriptScene {
  time: string;
  label: string;
  visual: string;
  voiceover: string;
}

export interface GeneratedContent {
  id: string;
  input: GeneratorInput;
  hooks: string[];
  script: ScriptScene[];
  description: string;
  hashtags: string[];
  duration: { seconds: number; label: string; note: string };
  cta: string;
}

export type PostStatus = "published" | "scheduled" | "draft";
export type PostFormat = "education" | "trend" | "backstage" | "review" | "story";

export interface CalendarPost {
  id: string;
  week: number;
  day: number;
  time: string;
  title: string;
  platform: Platform;
  format: PostFormat;
  status: PostStatus;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export type AuthMode = "signup" | "login";
export type PlanId = "free" | "pro" | "business";
