import content from "./landingContent.json";

export type Lang = "zh" | "en";

export const i18n = {
  zh: {
    nav: content.nav.zh,
    hero: content.hero.zh,
    lang: content.lang.zh,
    theme: content.theme.zh,
  },
  en: {
    nav: content.nav.en,
    hero: content.hero.en,
    lang: content.lang.en,
    theme: content.theme.en,
  },
} as const;
