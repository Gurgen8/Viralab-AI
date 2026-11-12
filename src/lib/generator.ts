import {
  DURATION_RANGES,
  LANGUAGE_PACKS,
  PLATFORM_TAGS,
  STYLE_DURATION_SHIFT,
  type TemplateCtx,
} from "@/data/generator-templates";
import { PLATFORMS } from "@/lib/platforms";
import { capitalize, hashString, seededRandom } from "@/lib/utils";
import type { GeneratedContent, GeneratorInput, ScriptScene } from "@/types";

/**
 * Local demo generator.
 * Builds content from a curated template library — no external AI API is called.
 * Output is deterministic per (input, variant) so "Сгенерировать заново" yields new combinations.
 */

function pickDistinct<T>(items: readonly T[], count: number, rand: () => number): T[] {
  const pool = [...items];
  const result: T[] = [];
  while (result.length < count && pool.length > 0) {
    const idx = Math.floor(rand() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}

function toTag(word: string): string {
  return word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}

function buildHashtags(input: GeneratorInput, styleTags: string[], generic: string[]): string[] {
  const words = input.topic
    .split(/[^\p{L}\p{N}]+/u)
    .map(toTag)
    .filter((w) => w.length >= 4);
  const topicTags = words.slice(0, 3);
  const combined = words.length >= 2 ? [words.slice(0, 2).join("")] : [];
  const platformTags =
    input.language === "en"
      ? PLATFORM_TAGS[input.platform].filter((t) => /^[a-z]+$/.test(t))
      : [...PLATFORM_TAGS[input.platform]];
  const all = [...topicTags, ...combined, ...styleTags, ...platformTags, ...generic];
  return Array.from(new Set(all.filter(Boolean))).slice(0, 12).map((t) => `#${t}`);
}

function formatTime(seconds: number): string {
  return `0:${String(Math.round(seconds)).padStart(2, "0")}`;
}

export function generateContent(input: GeneratorInput, variant = 0): GeneratedContent {
  const pack = LANGUAGE_PACKS[input.language];
  const style = pack.styles[input.style];
  const seed = hashString(
    `${input.topic.trim().toLowerCase()}|${input.audience}|${input.platform}|${input.style}|${input.language}|${variant}`,
  );
  const rand = seededRandom(seed);

  const topic = input.topic.trim().replace(/[.!?]+$/, "");
  const fallbackAudience = input.language === "ru" ? "начинающий автор" : "a new creator";
  const ctx: TemplateCtx = {
    t: topic.charAt(0).toLowerCase() + topic.slice(1),
    T: capitalize(topic),
    a: input.audience.trim() || fallbackAudience,
    p: PLATFORMS[input.platform].label,
  };

  const hooks = pickDistinct(style.hooks, 3, rand).map((fn) => fn(ctx));
  const [problem] = pickDistinct(style.problem, 1, rand);
  const points = pickDistinct(style.points, 3, rand);
  const [proof] = pickDistinct(style.proof, 1, rand);
  const [description] = pickDistinct(style.description, 1, rand);
  const [cta] = pickDistinct(style.cta, 1, rand);

  const [min, max] = DURATION_RANGES[input.platform];
  const base = min + Math.round(rand() * (max - min));
  const seconds = Math.max(12, Math.min(58, base + STYLE_DURATION_SHIFT[input.style]));

  // Timeline proportions for the 5 scenes.
  const marks = [0, 3, seconds * 0.28, seconds * 0.72, seconds * 0.88, seconds];
  const ctaText = cta(ctx);
  const valueText = `${pack.valueIntro} ${points
    .map((fn, i) => `${pack.ordinals[i]} — ${fn(ctx)}.`)
    .join(" ")}`;

  const script: ScriptScene[] = [
    { label: pack.labels.hook, visual: pack.visuals.hook, voiceover: hooks[0] },
    { label: pack.labels.problem, visual: pack.visuals.problem, voiceover: problem(ctx) },
    { label: pack.labels.value, visual: pack.visuals.value, voiceover: valueText },
    { label: pack.labels.proof, visual: pack.visuals.proof, voiceover: proof(ctx) },
    { label: pack.labels.cta, visual: pack.visuals.cta, voiceover: ctaText },
  ].map((scene, i) => ({ ...scene, time: `${formatTime(marks[i])}–${formatTime(marks[i + 1])}` }));

  const label = input.language === "ru" ? `${seconds} секунд` : `${seconds} seconds`;

  return {
    id: `${seed.toString(36)}-${variant}`,
    input,
    hooks,
    script,
    description: description(ctx),
    hashtags: buildHashtags(input, style.tags, pack.genericTags),
    duration: { seconds, label, note: `${pack.durationNote(ctx.p)} ${style.delivery}` },
    cta: ctaText,
  };
}

export function scriptToText(content: GeneratedContent): string {
  return content.script
    .map((s) => `[${s.time}] ${s.label}\nВизуал: ${s.visual}\nТекст: ${s.voiceover}`)
    .join("\n\n");
}

export function contentToText(content: GeneratedContent): string {
  return [
    "ХУКИ:",
    ...content.hooks.map((h, i) => `${i + 1}. ${h}`),
    "",
    "СЦЕНАРИЙ:",
    scriptToText(content),
    "",
    "ОПИСАНИЕ:",
    content.description,
    "",
    "ХЕШТЕГИ:",
    content.hashtags.join(" "),
    "",
    `ДЛИТЕЛЬНОСТЬ: ${content.duration.label}`,
    `CTA: ${content.cta}`,
  ].join("\n");
}
