export const teamI18n = {
  zh: {
    hero: { title: "專業團隊" },
    services: {
      heading: "我們提供\n多元服務",
      items: [
        {
          num: "01",
          title: "網站開發",
          desc: "我們提供高品質客製化網站開發，從 UI/UX 設計到後端系統架構，全方位打造您的數位門面，確保卓越的使用者體驗與系統效能。",
        },
        {
          num: "02",
          title: "行動應用",
          desc: "React Native 與 Flutter 跨平台行動應用開發，一次開發同時覆蓋 iOS 與 Android，快速推進您的行動策略。",
        },
        {
          num: "03",
          title: "系統整合",
          desc: "串接第三方 API、金流系統、身分驗證等多元服務整合，確保您的業務流程無縫銜接、穩定運作。",
        },
        {
          num: "04",
          title: "技術顧問",
          desc: "提供技術選型、架構設計與代碼審查等專業顧問服務，協助您做出最優的技術決策，加速產品落地。",
        },
      ],
    },
    team: {
      heading: "PROFESSIONAL TEAM",
      members: [
        {
          name: "Juliana",
          role: "UI/UX Designer",
          specialties: [
            { text: "UIUX 設計", image: "/team/網頁設計.png" },
            { text: "前端開發", image: "/team/前端開發.png" },
            { text: "品牌視覺", image: "/team/美感設計.png" },
            { text: "互動設計", image: "/team/前端設計.png" },
            { text: "原型設計", image: "/team/專案管理.png" },
            { text: "使用者研究", image: "/team/行銷企劃.png" },
            { text: "動態設計", image: "/team/美感設計.png" },
            { text: "設計系統", image: "/team/前端設計.png" },
          ],
        },
        {
          name: "James",
          role: "Backend Engineer",
          specialties: [
            { text: "後端 API", image: "/team/後端開發.png" },
            { text: "資料庫設計", image: "/team/資料處理管理.png" },
            { text: "雲端部署", image: "/team/自動化流程.png" },
            { text: "系統架構", image: "/team/後端開發.png" },
            { text: "微服務", image: "/team/API串接.png" },
            { text: "資安防護", image: "/team/網路爬蟲.png" },
            { text: "DevOps", image: "/team/自動化流程.png" },
            { text: "效能優化", image: "/team/數據分析.png" },
          ],
        },
        {
          name: "Max",
          role: "Frontend Engineer",
          specialties: [
            { text: "SPA 開發", image: "/team/前端開發.png" },
            { text: "前端架構", image: "/team/前端設計.png" },
            { text: "響應式佈局", image: "/team/網頁設計.png" },
            { text: "動畫設計", image: "/team/美感設計.png" },
            { text: "狀態管理", image: "/team/數據分析.png" },
            { text: "元件設計", image: "/team/前端設計.png" },
            { text: "跨平台開發", image: "/team/前端開發.png" },
            { text: "TypeScript", image: "/team/後端開發.png" },
          ],
        },
      ],
    },
    grid: {
      heading: "我們提供\n多元服務",
      items: [
        { title: "前端開發", desc: "React、Vue、Next.js 現代框架，打造流暢的使用者體驗。" },
        { title: "後端開發", desc: "Node.js、Python、Go 強健後端，建構穩固的系統架構。" },
        { title: "雲端服務", desc: "AWS、GCP 雲端部署，確保服務高可用性與擴展性。" },
        { title: "行動應用", desc: "React Native、Flutter 跨平台開發，一份代碼多平台上架。" },
        { title: "系統整合", desc: "第三方 API、金流、身分驗證等服務整合串接。" },
        { title: "技術顧問", desc: "技術選型、架構設計、代碼審查等專業諮詢服務。" },
        { title: "UI/UX 設計", desc: "從原型設計到視覺規範，打造美觀且易用的介面體驗。" },
      ],
    },
    plans: {
      heading: "方案選擇",
      hint: {
        default: "請選擇一個方案以查看詳細內容",
        selected: "點擊主按鈕可取消選擇",
      },
      includesLabel: "包含項目",
      deliverablesLabel: "交付內容",
      items: [
        {
          id: "admin",
          title: "後台管理網站",
          en: "ADMIN PANEL",
          price: "NT$60,000",
          highlight: false,
          includes: ["登入權限控管", "數據總覽儀表板", "內容管理系統 (CMS)", "基礎資安防護"],
          deliverables: ["後台原始碼", "資料庫建置檔", "API 串接文件", "系統操作手冊"],
        },
        {
          id: "basic",
          title: "品牌官網基本款",
          en: "BASIC WEBSITE",
          price: "NT$30,000",
          highlight: true,
          includes: ["首頁與 4 個內容頁", "RWD 響應式設計", "基礎 SEO", "聯絡 CTA"],
          deliverables: ["PHP 原始碼", "前台頁面", "部署檔案", "驗收清單"],
        },

        {
          id: "custom",
          title: "客製系統開發",
          en: "CUSTOM SYSTEM",
          price: "NT$120,000",
          highlight: false,
          includes: [
            "需求訪談與 SA/SD",
            "客製化 UI/UX 設計",
            "第三方金流/API 串接",
            "複雜業務邏輯實作",
          ],
          deliverables: ["完整前後端系統", "系統架構圖", "單元測試報告", "原始碼與版權移轉"],
        },
      ],
    },
    plansHero: {
      badge: "Nivorae · 服務方案",
      title: "選擇最適合\n您的方案",
      desc: "無論您是需要品牌官網、後台管理系統，還是完整的客製化開發，我們都有對應的解決方案。",
    },
    pricing: {
      heading: "費用一覽",
      recommended: "推薦方案",
      cta: "立即諮詢",
      startingFrom: "起",
    },
  },
  en: {
    hero: { title: "ABOUT US" },
    services: {
      heading: "WE PROVIDE\nVARIOUS SERVICES",
      items: [
        {
          num: "01",
          title: "Web Development",
          desc: "High-quality custom web development — from UI/UX design to backend architecture, crafting your digital presence with exceptional user experience and performance.",
        },
        {
          num: "02",
          title: "Mobile App",
          desc: "Cross-platform mobile development with React Native & Flutter, covering iOS and Android from a single codebase to accelerate your mobile strategy.",
        },
        {
          num: "03",
          title: "System Integration",
          desc: "Seamlessly connect third-party APIs, payment gateways, and authentication services to streamline your business workflows and ensure reliable operations.",
        },
        {
          num: "04",
          title: "Tech Consulting",
          desc: "Expert guidance on tech stack selection, architecture design, and code review to help you make the best technical decisions and ship products faster.",
        },
      ],
    },
    team: {
      heading: "PROFESSIONAL TEAM",
      members: [
        {
          name: "Juliana",
          role: "UI/UX Designer",
          specialties: [
            { text: "UIUX Design", image: "/team/網頁設計.png" },
            { text: "Frontend Dev", image: "/team/前端開發.png" },
            { text: "Brand Identity", image: "/team/美感設計.png" },
            { text: "Interaction", image: "/team/前端設計.png" },
            { text: "Prototyping", image: "/team/專案管理.png" },
            { text: "User Research", image: "/team/行銷企劃.png" },
            { text: "Motion Design", image: "/team/美感設計.png" },
            { text: "Design System", image: "/team/前端設計.png" },
          ],
        },
        {
          name: "James",
          role: "Backend Engineer",
          specialties: [
            { text: "Backend API", image: "/team/後端開發.png" },
            { text: "Database", image: "/team/資料處理管理.png" },
            { text: "Cloud Deploy", image: "/team/自動化流程.png" },
            { text: "Architecture", image: "/team/後端開發.png" },
            { text: "Microservices", image: "/team/API串接.png" },
            { text: "Security", image: "/team/網路爬蟲.png" },
            { text: "DevOps", image: "/team/自動化流程.png" },
            { text: "Performance", image: "/team/數據分析.png" },
          ],
        },
        {
          name: "Max",
          role: "Frontend Engineer",
          specialties: [
            { text: "SPA Dev", image: "/team/前端開發.png" },
            { text: "Frontend Arch", image: "/team/前端設計.png" },
            { text: "Responsive", image: "/team/網頁設計.png" },
            { text: "Animation", image: "/team/美感設計.png" },
            { text: "State Mgmt", image: "/team/數據分析.png" },
            { text: "Component Design", image: "/team/前端設計.png" },
            { text: "Cross-Platform", image: "/team/前端開發.png" },
            { text: "TypeScript", image: "/team/後端開發.png" },
          ],
        },
      ],
    },
    grid: {
      heading: "WE PROVIDE\nVARIOUS SERVICES",
      items: [
        {
          title: "Frontend",
          desc: "React, Vue, Next.js modern frameworks for smooth user experiences.",
        },
        {
          title: "Backend",
          desc: "Node.js, Python, Go for robust and scalable system architecture.",
        },
        {
          title: "Cloud",
          desc: "AWS, GCP deployments ensuring high availability and scalability.",
        },
        { title: "Mobile", desc: "React Native & Flutter cross-platform development solutions." },
        {
          title: "Integration",
          desc: "Third-party APIs, payment gateways, and auth service connections.",
        },
        {
          title: "Consulting",
          desc: "Tech selection, architecture design, and code review expertise.",
        },
        {
          title: "UI/UX Design",
          desc: "From prototyping to visual specs, crafting beautiful interfaces.",
        },
      ],
    },
    plans: {
      heading: "PRICING PLANS",
      hint: {
        default: "Select a plan to view details",
        selected: "Click the card to deselect",
      },
      includesLabel: "INCLUDES",
      deliverablesLabel: "DELIVERABLES",
      items: [
        {
          id: "basic",
          title: "Basic Website",
          en: "BASIC WEBSITE",
          price: "NT$30,000",
          highlight: false,
          includes: ["Home + 4 content pages", "Responsive design", "Basic SEO", "Contact CTA"],
          deliverables: [
            "PHP source code",
            "Frontend pages",
            "Deploy files",
            "Acceptance checklist",
          ],
        },
        {
          id: "admin",
          title: "Admin Panel",
          en: "ADMIN PANEL",
          price: "NT$60,000",
          highlight: true,
          includes: [
            "Login & access control",
            "Data overview dashboard",
            "Content management (CMS)",
            "Basic security",
          ],
          deliverables: [
            "Backend source code",
            "Database setup file",
            "API integration docs",
            "System manual",
          ],
        },
        {
          id: "custom",
          title: "Custom System",
          en: "CUSTOM SYSTEM",
          price: "NT$120,000",
          highlight: false,
          includes: [
            "Requirements & SA/SD",
            "Custom UI/UX design",
            "Payment/API integration",
            "Complex business logic",
          ],
          deliverables: [
            "Full frontend + backend",
            "System architecture diagram",
            "Unit test report",
            "Source code & IP transfer",
          ],
        },
      ],
    },
    plansHero: {
      badge: "Nivorae · Pricing Plans",
      title: "Pick a plan\nthat's right for you",
      desc: "Whether you need a brand website, an admin panel, or a fully custom system — we have a solution for you.",
    },
    pricing: {
      heading: "PRICING",
      recommended: "Recommended",
      cta: "Get in Touch",
      startingFrom: "from",
    },
  },
} as const;
