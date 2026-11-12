import type { ContentLanguage, ContentStyle } from "@/types";

/** Context passed to every template. t = topic (as typed), T = capitalized topic, a = audience, p = platform label. */
export interface TemplateCtx {
  t: string;
  T: string;
  a: string;
  p: string;
}

type Tpl = (c: TemplateCtx) => string;

export interface StylePack {
  hooks: Tpl[];
  problem: Tpl[];
  points: Tpl[];
  proof: Tpl[];
  description: Tpl[];
  cta: Tpl[];
  delivery: string;
  tags: string[];
}

export interface LanguagePack {
  labels: { hook: string; problem: string; value: string; proof: string; cta: string };
  visuals: { hook: string; problem: string; value: string; proof: string; cta: string };
  valueIntro: string;
  ordinals: [string, string, string];
  durationNote: (p: string) => string;
  genericTags: string[];
  styles: Record<ContentStyle, StylePack>;
}

const ru: LanguagePack = {
  labels: { hook: "Хук", problem: "Проблема", value: "Ценность", proof: "Доказательство", cta: "Призыв к действию" },
  visuals: {
    hook: "Крупный план, старт без приветствия. Текст хука крупно в верхней трети кадра.",
    problem: "Смена ракурса или jump cut. На экране — короткая подпись с болью зрителя.",
    value: "Три быстрые смены кадра — по одной на пункт. Нумерация и субтитры обязательны.",
    proof: "Экран «до / после», скриншот или демонстрация результата в кадре.",
    cta: "Возврат к крупному плану. Стрелка на кнопку подписки, текст CTA на экране.",
  },
  valueIntro: "Вот что реально работает.",
  ordinals: ["Первое", "Второе", "Третье"],
  durationNote: (p) => `Оптимально для удержания в ${p}: первые 3 секунды решают, досмотрят ли видео до конца.`,
  genericTags: ["контент", "советы", "полезное"],
  styles: {
    educational: {
      hooks: [
        (c) => `${c.T}: 3 ошибки, которые совершают почти все — и как их избежать.`,
        (c) => `Сохрани это видео, если тебе нужна тема «${c.t}» без воды.`,
        (c) => `За 30 секунд объясню то, на что у меня ушли месяцы. Тема — ${c.t}.`,
        (c) => `Если вы — ${c.a}, этот разбор сэкономит вам кучу времени.`,
        (c) => `Почему с темой «${c.t}» у большинства ничего не выходит? Объясняю на пальцах.`,
        (c) => `Один принцип, который полностью меняет подход к теме «${c.t}».`,
      ],
      problem: [
        (c) => `Знакомо? Тратишь часы на тему «${c.t}», а результата нет. Проблема не в тебе — проблема в подходе.`,
        () => `Большинство советов в интернете противоречат друг другу. Поэтому вы и застряли.`,
      ],
      points: [
        (c) => `начни с одного конкретного шага в теме «${c.t}», а не со всего сразу`,
        () => `показывай результат, а не процесс — так проще понять, что работает`,
        () => `закрепи знания на одном реальном примере уже сегодня`,
        () => `убери всё лишнее: 20% действий дают 80% результата`,
        () => `замеряй прогресс раз в неделю, а не каждый день`,
      ],
      proof: [
        () => `Проверь сам: сделай этот шаг сегодня и сравни результат через неделю.`,
        () => `Я применил это на практике — разница видна уже в первые дни.`,
      ],
      description: [
        (c) => `${c.T} — коротко и по делу. Разобрали главные ошибки и рабочий план действий. Сохраняй, чтобы не потерять 📌`,
        (c) => `Полезный разбор: ${c.t} — без воды и сложных терминов. Какой пункт оказался самым полезным? Пиши в комментариях 👇`,
      ],
      cta: [
        () => `Сохрани видео, чтобы вернуться к нему позже, и подпишись — завтра вторая часть.`,
        () => `Напиши в комментариях «ХОЧУ» — пришлю чек-лист по этой теме.`,
        () => `Подпишись, если хочешь больше коротких разборов без воды.`,
      ],
      delivery: "Спокойный уверенный темп, ключевые слова выделены текстом.",
      tags: ["обучение", "лайфхаки"],
    },
    humor: {
      hooks: [
        (c) => `POV: ты третий час разбираешься в теме «${c.t}» и всё ещё ничего не понял.`,
        (c) => `${c.T} глазами новичка vs глазами профи 😅`,
        (c) => `Я в 3 часа ночи, изучая тему «${c.t}»:`,
        (c) => `Объясняю «${c.t}» так, будто тебе 5 лет и ты очень занят.`,
        (c) => `Ожидание vs реальность: ${c.t}.`,
        (c) => `Если бы у темы «${c.t}» был отзыв на картах — он был бы таким.`,
      ],
      problem: [
        () => `Сначала думаешь: «Да что тут сложного?» Через пять минут — уже гуглишь, как жить дальше.`,
        (c) => `Все вокруг делают вид, что разбираются в теме «${c.t}». Спойлер: нет.`,
      ],
      points: [
        () => `перестань делать вид, что всё понял с первого раза — никто не понял`,
        () => `начни с самого простого, героем можно стать и во второй серии`,
        () => `смейся над ошибками — это дешевле, чем психолог`,
        () => `делай маленькими шагами, как будто идёшь по лего в темноте`,
        () => `спроси совета у того, у кого уже получилось`,
      ],
      proof: [
        () => `Да, я тоже через это прошёл. Нет, я не горжусь первой попыткой.`,
        () => `Реакция моего друга, когда у него наконец получилось, — бесценна.`,
      ],
      description: [
        (c) => `${c.T}, но с юмором 😂 Узнал себя? Отметь друга, который точно такой же.`,
        (c) => `Когда тема «${c.t}» объясняется честно 🙃 Смотри до конца — там самое жизненное.`,
      ],
      cta: [
        () => `Отметь друга, который делает точно так же 😂`,
        () => `Подпишись, если узнал себя. Мы тут все такие.`,
        () => `Ставь лайк, если досмотрел — значит, это было про тебя.`,
      ],
      delivery: "Быстрый темп, мимика и паузы перед панчлайном.",
      tags: ["юмор", "жиза"],
    },
    professional: {
      hooks: [
        (c) => `${c.T}: что важно знать до того, как принимать решение.`,
        (c) => `Как подходят к теме «${c.t}» компании, которые растут быстрее рынка.`,
        (c) => `3 метрики, на которые стоит смотреть, если вы работаете с темой «${c.t}».`,
        (c) => `Короткий кейс: системный подход к теме «${c.t}» и измеримый результат.`,
        (c) => `Если вы — ${c.a}, вот рабочий фреймворк, который можно внедрить уже сегодня.`,
        (c) => `Главная ошибка в теме «${c.t}», которую я вижу у 8 из 10 команд.`,
      ],
      problem: [
        () => `Решения принимаются на интуиции, а не на данных. Итог — потерянный бюджет и время.`,
        (c) => `В теме «${c.t}» много шума и мало системности. Это и тормозит рост.`,
      ],
      points: [
        () => `зафиксируйте одну ключевую метрику и измеряйте её еженедельно`,
        () => `стандартизируйте процесс — чек-лист экономит до трети времени`,
        () => `тестируйте гипотезы малыми итерациями, а не большими запусками`,
        () => `делегируйте рутину и автоматизируйте повторяющиеся задачи`,
        () => `сравнивайте результаты с базовой линией, а не с ожиданиями`,
      ],
      proof: [
        () => `На экране — пример дашборда до и после внедрения подхода.`,
        () => `Такой подход позволяет принимать решения за минуты, а не за недели.`,
      ],
      description: [
        (c) => `${c.T}: практичный фреймворк без лишней теории. Подходит для команд и специалистов, которым важен измеримый результат.`,
        (c) => `Разбираем тему «${c.t}» с точки зрения процессов и метрик. Сохраните для команды и поделитесь с коллегами.`,
      ],
      cta: [
        () => `Сохраните видео для команды и подпишитесь на еженедельные разборы.`,
        () => `Напишите в комментариях, какую метрику вы отслеживаете в первую очередь.`,
        () => `Ссылка на шаблон фреймворка — в профиле.`,
      ],
      delivery: "Уверенная деловая подача, графика и цифры на экране.",
      tags: ["бизнес", "стратегия"],
    },
    motivational: {
      hooks: [
        (c) => `Ты не отстаёшь. Ты просто ещё не начал по-настоящему. ${c.T} — с чего начать.`,
        (c) => `Через год ты скажешь себе спасибо за то, что сегодня разобрался в теме «${c.t}».`,
        (c) => `Все начинали с нуля. Вот первый шаг в теме «${c.t}».`,
        (c) => `Если вы — ${c.a}, это видео для вас. Не листайте.`,
        (c) => `Хватит ждать идеального момента. ${c.T} начинается с одного действия.`,
        (c) => `Я чуть не сдался, пока не понял одну простую вещь. Тема — ${c.t}.`,
      ],
      problem: [
        () => `Кажется, что все вокруг уже успели, а ты всё ещё на старте. Это иллюзия.`,
        () => `Страх ошибки останавливает сильнее, чем отсутствие знаний.`,
      ],
      points: [
        () => `сделай один маленький шаг сегодня — не завтра и не в понедельник`,
        () => `сравнивай себя только с собой вчерашним`,
        () => `окружи себя людьми, которые уже прошли этот путь`,
        () => `отмечай каждую маленькую победу — это топливо для следующего шага`,
        () => `дисциплина важнее мотивации: просто не пропускай два дня подряд`,
      ],
      proof: [
        () => `Год назад я был ровно там же, где ты сейчас. Разница — в ежедневных шагах.`,
        () => `Каждый, кем ты восхищаешься, когда-то сделал свой первый неловкий шаг.`,
      ],
      description: [
        (c) => `${c.T} — это путь, а не точка. Начни сегодня, даже если страшно 🔥 Напиши «старт», если ты в деле.`,
        (c) => `Напоминание для тех, кто сомневается: в теме «${c.t}» всё начинается с первого шага 💜 Сохрани и пересматривай, когда опускаются руки.`,
      ],
      cta: [
        () => `Напиши «СТАРТ» в комментариях и сделай первый шаг прямо сейчас.`,
        () => `Сохрани видео и пересматривай, когда захочется всё бросить.`,
        () => `Подпишись — каждый день короткая доза мотивации и практики.`,
      ],
      delivery: "Эмоциональная подача, нарастающая музыка, крупные титры.",
      tags: ["мотивация", "саморазвитие"],
    },
  },
};

const en: LanguagePack = {
  labels: { hook: "Hook", problem: "Problem", value: "Value", proof: "Proof", cta: "Call to action" },
  visuals: {
    hook: "Close-up, no greeting. Hook text large in the upper third of the frame.",
    problem: "Angle change or jump cut. On-screen caption naming the viewer's pain.",
    value: "Three quick cuts — one per point. Numbering and captions are a must.",
    proof: "Before / after split, screenshot or live demo of the result.",
    cta: "Back to close-up. Arrow to the follow button, CTA text on screen.",
  },
  valueIntro: "Here's what actually works.",
  ordinals: ["First", "Second", "Third"],
  durationNote: (p) => `Optimal for retention on ${p}: the first 3 seconds decide whether people watch to the end.`,
  genericTags: ["content", "tips", "learnontiktok"],
  styles: {
    educational: {
      hooks: [
        (c) => `${c.T}: 3 mistakes almost everyone makes — and how to avoid them.`,
        (c) => `Save this if you want "${c.t}" explained without the fluff.`,
        (c) => `In 30 seconds I'll explain what took me months to learn about "${c.t}".`,
        (c) => `If you're ${c.a}, this breakdown will save you hours.`,
        (c) => `Why does "${c.t}" not work for most people? Here's the simple answer.`,
        (c) => `One principle that completely changes how you approach "${c.t}".`,
      ],
      problem: [
        (c) => `Sound familiar? Hours spent on "${c.t}" and no results. It's not you — it's the approach.`,
        () => `Most advice online contradicts itself. That's why you're stuck.`,
      ],
      points: [
        (c) => `start with one concrete step in "${c.t}", not everything at once`,
        () => `show the result, not the process — it's easier to see what works`,
        () => `lock it in with one real example today`,
        () => `cut the noise: 20% of actions drive 80% of results`,
        () => `measure progress weekly, not daily`,
      ],
      proof: [
        () => `Test it yourself: do this today and compare in a week.`,
        () => `I applied this in practice — the difference showed up within days.`,
      ],
      description: [
        (c) => `${c.T} — short and to the point. The key mistakes and a clear action plan. Save it for later 📌`,
        (c) => `A no-fluff breakdown of "${c.t}". Which point helped the most? 👇`,
      ],
      cta: [
        () => `Save this video and follow — part two drops tomorrow.`,
        () => `Comment "WANT" and I'll send you the checklist.`,
        () => `Follow for more short, no-fluff breakdowns.`,
      ],
      delivery: "Calm, confident pace with key words highlighted as text.",
      tags: ["education", "lifehacks"],
    },
    humor: {
      hooks: [
        (c) => `POV: it's hour three of figuring out "${c.t}" and you still have no idea.`,
        (c) => `${c.T}: beginner vs pro 😅`,
        (c) => `Me at 3 AM researching "${c.t}":`,
        (c) => `Explaining "${c.t}" like you're 5 and very busy.`,
        (c) => `Expectation vs reality: ${c.t}.`,
        (c) => `If "${c.t}" had a Google review, it would sound like this.`,
      ],
      problem: [
        () => `First you think "how hard can it be?" Five minutes later you're googling how to live.`,
        (c) => `Everyone pretends they understand "${c.t}". Spoiler: they don't.`,
      ],
      points: [
        () => `stop pretending you got it the first time — nobody did`,
        () => `start small, you can be the hero in episode two`,
        () => `laugh at your mistakes — it's cheaper than therapy`,
        () => `take tiny steps, like walking on LEGO in the dark`,
        () => `ask someone who already pulled it off`,
      ],
      proof: [
        () => `Yes, I've been there. No, I'm not proud of my first try.`,
        () => `My friend's face when it finally worked — priceless.`,
      ],
      description: [
        (c) => `${c.T}, but make it funny 😂 Tag the friend who does exactly this.`,
        (c) => `When "${c.t}" gets explained honestly 🙃 Watch till the end.`,
      ],
      cta: [
        () => `Tag a friend who does exactly this 😂`,
        () => `Follow if you felt personally attacked.`,
        () => `Like if you watched till the end — it was about you.`,
      ],
      delivery: "Fast pace, facial expressions and a pause before the punchline.",
      tags: ["funny", "relatable"],
    },
    professional: {
      hooks: [
        (c) => `${c.T}: what to know before you make a decision.`,
        (c) => `How fast-growing companies approach "${c.t}".`,
        (c) => `3 metrics to watch if you work with "${c.t}".`,
        (c) => `Quick case: a systematic approach to "${c.t}" and measurable results.`,
        (c) => `If you're ${c.a}, here's a framework you can apply today.`,
        (c) => `The #1 mistake with "${c.t}" I see in 8 out of 10 teams.`,
      ],
      problem: [
        () => `Decisions are made on gut feeling, not data. The result: wasted budget and time.`,
        (c) => `"${c.t}" is full of noise and short on systems. That's what slows growth.`,
      ],
      points: [
        () => `pick one key metric and track it weekly`,
        () => `standardize the process — a checklist saves up to a third of the time`,
        () => `test hypotheses in small iterations, not big launches`,
        () => `delegate routine work and automate repeatable tasks`,
        () => `compare results to a baseline, not to expectations`,
      ],
      proof: [
        () => `On screen: a dashboard before and after applying the approach.`,
        () => `This lets you make decisions in minutes, not weeks.`,
      ],
      description: [
        (c) => `${c.T}: a practical framework without the theory. Built for teams who care about measurable results.`,
        (c) => `Breaking down "${c.t}" through processes and metrics. Save it for your team.`,
      ],
      cta: [
        () => `Save this for your team and follow for weekly breakdowns.`,
        () => `Comment which metric you track first.`,
        () => `Framework template — link in bio.`,
      ],
      delivery: "Confident business delivery with graphics and numbers on screen.",
      tags: ["business", "strategy"],
    },
    motivational: {
      hooks: [
        (c) => `You're not behind. You just haven't really started. ${c.T} — where to begin.`,
        (c) => `A year from now you'll thank yourself for figuring out "${c.t}" today.`,
        (c) => `Everyone started from zero. Here's step one for "${c.t}".`,
        (c) => `If you're ${c.a}, this one's for you. Don't scroll.`,
        (c) => `Stop waiting for the perfect moment. ${c.T} starts with one action.`,
        (c) => `I almost quit before I understood one simple thing about "${c.t}".`,
      ],
      problem: [
        () => `It feels like everyone else already made it. That's an illusion.`,
        () => `Fear of failing stops you more than lack of knowledge.`,
      ],
      points: [
        () => `take one small step today — not tomorrow, not Monday`,
        () => `compare yourself only to who you were yesterday`,
        () => `surround yourself with people who've walked this path`,
        () => `celebrate small wins — they fuel the next step`,
        () => `discipline beats motivation: just never skip two days in a row`,
      ],
      proof: [
        () => `A year ago I was exactly where you are. The difference is daily steps.`,
        () => `Everyone you admire once took an awkward first step.`,
      ],
      description: [
        (c) => `${c.T} is a journey, not a destination. Start today, even if it's scary 🔥 Comment "start" if you're in.`,
        (c) => `A reminder for anyone doubting: "${c.t}" starts with step one 💜 Save it for the hard days.`,
      ],
      cta: [
        () => `Comment "START" and take your first step right now.`,
        () => `Save this and rewatch it when you feel like quitting.`,
        () => `Follow for a daily dose of motivation and practice.`,
      ],
      delivery: "Emotional delivery, building music, bold captions.",
      tags: ["motivation", "selfgrowth"],
    },
  },
};

export const LANGUAGE_PACKS: Record<ContentLanguage, LanguagePack> = { ru, en };

export const PLATFORM_TAGS = {
  tiktok: ["tiktok", "fyp", "рекомендации"],
  reels: ["reels", "instagram", "reelsinstagram"],
  shorts: ["shorts", "youtubeshorts", "ytshorts"],
} as const;

/** Base duration window (seconds) per platform, adjusted per style. */
export const DURATION_RANGES = {
  tiktok: [21, 34],
  reels: [15, 30],
  shorts: [30, 45],
} as const;

export const STYLE_DURATION_SHIFT: Record<ContentStyle, number> = {
  educational: 6,
  humor: -5,
  professional: 3,
  motivational: 0,
};

export const TOPIC_EXAMPLES = [
  { topic: "Как вести бюджет без стресса", audience: "студенты и молодые специалисты" },
  { topic: "Утренняя рутина продуктивного человека", audience: "фрилансеры" },
  { topic: "Продвижение кофейни в соцсетях", audience: "владельцы малого бизнеса" },
  { topic: "Ошибки новичков в спортзале", audience: "начинающие спортсмены" },
];
