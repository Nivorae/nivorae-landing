export type Lang = "zh" | "en";

export const i18n = {
  zh: {
    nav: {
      home: "首頁",
      plans: "方案",
      team: "團隊介紹",
      qa: "常見問題",
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
    theme: {
      light: "日",
      dark: "夜",
      label: "主題切換",
    },
  },
  en: {
    nav: {
      home: "Home",
      plans: "Plans",
      team: "Our Team",
      qa: "Q&A",
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
    theme: {
      light: "Day",
      dark: "Night",
      label: "Theme",
    },
  },
} as const;
