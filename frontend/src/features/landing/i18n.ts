export type Lang = "zh" | "en";

export const i18n = {
  zh: {
    nav: {
      plans: "方案",
      team: "開發人員介紹",
    },
    hero: {
      badge: "三位工程師，無限可能",
      name: "Nivorae",
      tagline: "打造屬於您的數位未來",
      desc: "我們是由三位工程師組成的軟體開發團隊，專精客製化網站與行動應用程式開發，將您的創意轉化為高品質的數位產品。",
      scrollHint: "向下探索",
    },
    lang: {
      zh: "中文",
      en: "EN",
    },
  },
  en: {
    nav: {
      plans: "Plans",
      team: "Our Team",
    },
    hero: {
      badge: "Three Engineers, Infinite Possibilities",
      name: "Nivorae",
      tagline: "Build Your Digital Future",
      desc: "We are a software development team of three engineers, specializing in custom website and mobile app development — turning your ideas into high-quality digital products.",
      scrollHint: "Scroll to explore",
    },
    lang: {
      zh: "中文",
      en: "EN",
    },
  },
} as const;
