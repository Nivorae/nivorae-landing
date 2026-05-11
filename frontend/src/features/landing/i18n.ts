export type Lang = "zh" | "en";

export const i18n = {
  zh: {
    nav: {
      plans: "方案",
      team: "團隊介紹",
    },
    hero: {
      badge: "三位工程師，無限可能",
      name: "Nivorae",
      tagline: "打造屬於您的數位未來",
      desc: "我們是由三位工程師組成的軟體開發團隊，專精客製化網站與行動應用程式開發，將您的創意轉化為高品質的數位產品。",
      scrollHint: "向下探索",
    },
    testimonials: {
      subtitle: "客戶怎麼說",
      title: "合作夥伴回饋",
      items: [
        {
          quote: "Nivorae 的交付速度與品質都超乎預期，是我們最信賴的技術夥伴。",
          name: "李明",
          title: "CEO @ TechStart",
        },
        {
          quote: "溝通清晰透明，能精準理解商業需求，每一次合作都非常順暢。",
          name: "陳雅婷",
          title: "產品總監 @ DesignLab",
        },
        {
          quote: "從設計到上線一氣呵成，技術能力扎實，強力推薦給每一位創業者。",
          name: "王志豪",
          title: "創辦人 @ GrowthCo",
        },
        {
          quote: "反應快速且深入理解業務邏輯，他們不只是開發團隊，更是夥伴。",
          name: "林佳慧",
          title: "行銷總監 @ MediaX",
        },
        {
          quote: "細節處理非常用心，交付的產品讓我們的用戶留下極深的印象。",
          name: "張翰宇",
          title: "CTO @ BuildBase",
        },
      ],
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
    testimonials: {
      subtitle: "Client Testimonials",
      title: "What Partners Say",
      items: [
        {
          quote:
            "Nivorae's speed and quality far exceeded our expectations. They are our most trusted technical partner.",
          name: "Li Ming",
          title: "CEO @ TechStart",
        },
        {
          quote:
            "Clear, transparent communication with precise understanding of business needs. Every collaboration has been seamless.",
          name: "Chen Yating",
          title: "Product Director @ DesignLab",
        },
        {
          quote:
            "Seamless from design to launch. Solid technical ability. Highly recommended to every founder.",
          name: "Wang Zhihao",
          title: "Founder @ GrowthCo",
        },
        {
          quote:
            "Fast responses and deep business logic understanding — they're more than a dev team, they're a true partner.",
          name: "Lin Jiahui",
          title: "Marketing Director @ MediaX",
        },
        {
          quote:
            "Meticulous attention to detail. The product they delivered left our users with a lasting impression.",
          name: "Zhang Hanyu",
          title: "CTO @ BuildBase",
        },
      ],
    },
    lang: {
      zh: "中文",
      en: "EN",
    },
  },
} as const;
