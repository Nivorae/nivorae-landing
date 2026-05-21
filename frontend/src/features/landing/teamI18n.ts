import content from "./landingContent.json";

export const teamI18n = {
  zh: {
    hero: { title: content.team.zh.heroTitle },
    services: {
      heading: content.team.zh.servicesHeading,
      items: content.team.zh.services,
    },
    team: {
      heading: content.team.zh.teamHeading,
      members: content.team.zh.members,
    },
    process: content.plans.zh.process,
    plans: {
      heading: "方案選擇",
      hint: { default: "請選擇一個方案以查看詳細內容", selected: "點擊主按鈕可取消選擇" },
      includesLabel: "包含項目",
      deliverablesLabel: "交付內容",
      items: content.plans.zh.items,
    },
    plansHero: content.plans.zh.plansHero,
    pricing: content.plans.zh.pricing,
    partnership: content.plans.zh.partnership,
  },
  en: {
    hero: { title: content.team.en.heroTitle },
    services: {
      heading: content.team.en.servicesHeading,
      items: content.team.en.services,
    },
    team: {
      heading: content.team.en.teamHeading,
      members: content.team.en.members,
    },
    process: content.plans.en.process,
    plans: {
      heading: "PRICING PLANS",
      hint: { default: "Select a plan to view details", selected: "Click the card to deselect" },
      includesLabel: "INCLUDES",
      deliverablesLabel: "DELIVERABLES",
      items: content.plans.en.items,
    },
    plansHero: content.plans.en.plansHero,
    pricing: content.plans.en.pricing,
    partnership: content.plans.en.partnership,
  },
} as const;
