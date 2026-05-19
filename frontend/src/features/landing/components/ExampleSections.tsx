import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  PenTool,
  Zap,
  Layers,
  Terminal,
  Star,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { Image } from "@/components/ui/image";

// ─── TiltCard ───────────────────────────────────────────────────────────────

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(yPct * 20);
    setRotateY(xPct * -20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      style={{ perspective: 1000 }}
      className={className}
    >
      <div className="w-full h-full transform-style-3d shadow-2xl shadow-black/50">{children}</div>
    </motion.div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

const heroCardData = [
  {
    Icon: Globe,
    title: "Web Development",
    desc: "React & Next.js apps with native SEO and blazing performance.",
  },
  {
    Icon: Smartphone,
    title: "Mobile App",
    desc: "Cross-platform iOS & Android with native-feel UX on both platforms.",
  },
  {
    Icon: PenTool,
    title: "UI/UX Design",
    desc: "Intuitive interfaces that convert visitors into loyal customers.",
  },
  {
    Icon: Zap,
    title: "Performance",
    desc: "100/100 Lighthouse scores. Speed that users and search engines love.",
  },
  {
    Icon: Layers,
    title: "Architecture",
    desc: "Scalable, maintainable systems built to grow with your business.",
  },
  {
    Icon: Terminal,
    title: "Full Stack",
    desc: "End-to-end ownership from database schema to production deploy.",
  },
];

const CARD_WIDTH = 260;
const CARD_HEIGHT = 280;
const CARD_GAP = 24;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;
const TOTAL_CARDS = 10;
const SCROLL_SPEED = 0.8;
const ARC_PARABOLA = 0.00025;
const ARC_ROTATION = 0.012;

export function ExHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>(Array(TOTAL_CARDS).fill(null));
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let containerWidth = container.offsetWidth;
    let cx = containerWidth / 2;
    const positions = Array.from({ length: TOTAL_CARDS }, (_, i) => i * CARD_STRIDE);

    const onResize = () => {
      containerWidth = container.offsetWidth;
      cx = containerWidth / 2;
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      for (let i = 0; i < TOTAL_CARDS; i += 1) {
        positions[i] -= SCROLL_SPEED;
        if (positions[i] <= -CARD_STRIDE) {
          positions[i] = Math.max(...positions) + CARD_STRIDE;
        }
        const el = cardEls.current[i];
        if (el) {
          const x = positions[i];
          const dx = x + CARD_WIDTH / 2 - cx;
          const y = -(ARC_PARABOLA * dx * dx);
          const rot = -(ARC_ROTATION * dx);
          el.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${rot}deg)`;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-16 pb-8 px-4 bg-background text-foreground overflow-hidden mt-20">
      <div className="relative text-center max-w-4xl mx-auto mb-6">
        <div className="absolute -left-24 top-40 hidden lg:flex flex-col items-center rotate-[-5deg]">
          <span className="font-serif italic text-xl text-muted-foreground mb-1">
            Fast
            <br />
            Professional
          </span>
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            className="text-muted-foreground stroke-current"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M50 10 Q 10 15 15 50" />
            <path d="M25 45 L 15 50 L 10 40" />
          </svg>
        </div>

        <h1 className="text-[2.75rem] sm:text-6xl md:text-[5rem] leading-[1.05] font-bold text-foreground tracking-tight">
          打造卓越的
          <br />
          數位體驗
        </h1>

        <div className="absolute -right-24 top-40 hidden lg:flex flex-col items-center rotate-[-5deg]">
          <span className="font-serif italic text-xl text-muted-foreground mb-1">
            Elevate
            <br />
            your brand
          </span>
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            className="text-muted-foreground stroke-current"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 10 Q 50 15 45 50" />
            <path d="M35 45 L 45 50 L 50 40" />
          </svg>
        </div>
      </div>

      <p className="text-center text-muted-foreground text-base md:text-lg max-w-[600px] mx-auto mb-6 leading-relaxed">
        從零到一的高效能 Web 與 App 開發。
        <br className="hidden md:block" />
        我們不只寫程式，為您建構可擴展、
        <br className="hidden md:block" />
        現代化且極具質感的數位產品。
      </p>

      <div
        ref={containerRef}
        className="relative w-full max-w-[1400px] h-[400px] overflow-hidden mx-auto -mt-8"
      >
        {Array.from({ length: TOTAL_CARDS }, (_, i) => {
          const { Icon, title, desc } = heroCardData[i % heroCardData.length];
          return (
            <div
              key={i}
              ref={(el) => {
                cardEls.current[i] = el;
              }}
              className="absolute top-[100px] bg-card border border-border rounded-[32px] shadow-lg p-7 flex flex-col justify-start"
              style={{ width: CARD_WIDTH, height: CARD_HEIGHT, willChange: "transform" }}
            >
              <div className="w-14 h-14 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <Icon size={24} />
              </div>
              <h3 className="font-bold text-xl text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

export function ExServices() {
  const services = [
    {
      icon: <Globe className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Web 應用程式開發",
      desc: "使用 React 與 Next.js 打造高互動、高轉換率的現代化網站。極致效能與原生 SEO 支援，讓您的產品在搜尋引擎脫穎而出。",
    },
    {
      icon: <Smartphone className="w-8 h-8 md:w-12 md:h-12" />,
      title: "iOS / Android App",
      desc: "採用 React Native 或原生技術開發跨平台應用，確保在雙平台上皆能提供流暢、原生的使用者體驗。",
    },
    {
      icon: <PenTool className="w-8 h-8 md:w-12 md:h-12" />,
      title: "UI/UX 介面設計",
      desc: "從使用者旅程地圖出發，設計符合現代美學且直覺的介面，提升轉換率與品牌信任感。",
    },
  ];

  return (
    <section id="services" className="py-32 relative bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-4">Service Scope</h2>
          <p className="text-muted-foreground text-lg">專注核心技術，提供全方位數位解決方案</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <TiltCard key={s.title}>
              <div className="border border-border bg-card rounded-3xl p-8 h-full relative group backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                <div className="text-accent-foreground mb-6">{s.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  {s.desc}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

export function ExProcess() {
  return (
    <section
      id="process"
      className="py-24 bg-background text-foreground flex flex-col items-center justify-center border-y border-border/50 font-sans overflow-hidden"
    >
      <h2 className="text-4xl font-bold mb-20 text-center text-foreground">我們的開發模式</h2>
      <div className="max-w-6xl w-full px-6 flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Left Panel */}
        <div className="bg-[#1d1d1f] rounded-[2rem] p-8 md:p-10 w-full md:w-[45%] flex flex-col justify-between relative shadow-2xl shrink-0 border border-white/[0.03]">
          <div className="relative pt-12 pb-8 flex items-start gap-2">
            <div className="relative w-[160px] h-[200px] shrink-0 z-10 left-10">
              <div className="absolute inset-0 bg-white/[0.02] border border-white/10 rounded-2xl transform -translate-x-10 -translate-y-6 scale-[0.85] backdrop-blur-sm" />
              <div className="absolute inset-0 bg-white/[0.04] border border-white/20 rounded-2xl transform -translate-x-5 -translate-y-3 scale-[0.92] backdrop-blur-md" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-indigo-600/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20">
                <div className="w-full h-full opacity-60 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-indigo-900 to-black mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg">
                    <Smartphone size={28} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex-1 mt-[-20px] ml-6">
              <div className="absolute -left-12 top-0 w-[120px] h-[30px] border-t border-r border-dashed border-gray-400/50 rounded-tr-[10px]" />
              <div className="absolute right-0 top-[29px] w-6 border-t border-dashed border-gray-400/50" />
              <div className="absolute right-0 top-[24px] text-gray-500 text-xs">→</div>

              <div className="flex flex-col items-center">
                <span className="text-[#7cd5e4] font-bold text-[15px] mb-3 tracking-wide block relative -top-[18px] ml-6">
                  Nivorae
                </span>
                <div className="border border-white/20 rounded-[1.5rem] p-2.5 flex flex-col gap-2 w-[130px] bg-[#2a2a2a] shadow-xl relative z-10">
                  <div className="bg-white rounded-xl py-2 flex flex-col items-center justify-center shadow-sm">
                    <Layers size={16} className="text-gray-400 mb-1" />
                    <span className="text-[10px] font-bold text-gray-800 tracking-wide">
                      Architecture
                    </span>
                  </div>
                  <div className="bg-white rounded-xl py-2 flex flex-col items-center justify-center shadow-sm">
                    <PenTool size={16} className="text-gray-400 mb-1" />
                    <span className="text-[10px] font-bold text-gray-800 tracking-wide">
                      UI/UX Design
                    </span>
                  </div>
                  <div className="bg-white rounded-xl py-2 flex flex-col items-center justify-center shadow-sm">
                    <Terminal size={16} className="text-gray-400 mb-1" />
                    <span className="text-[10px] font-bold text-gray-800 tracking-wide">
                      Development
                    </span>
                  </div>
                </div>
                <div className="bg-[#7cd5e4] text-[#111] px-4 py-1 rounded-[10px] text-[11px] font-extrabold tracking-wide mt-[-10px] z-20">
                  Dev Team
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-12">
            <p className="text-gray-300 text-[13px] leading-[1.8] font-medium tracking-wide">
              Nova-Flow 是我們將複雜專案解構的標準化引擎，
              <br />
              提取核心的業務 <span className="text-white">Specs</span> 與{" "}
              <span className="text-white">Design</span> 成分，
              <br />
              基於其組合為您打造全新架構、介面及終端產品體驗。
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-[55%] flex flex-col py-6 md:py-2">
          <div className="flex items-end gap-4 mb-10">
            <h2 className="text-[40px] font-bold text-[#7cd5e4] leading-none tracking-tight">
              Nivorae
            </h2>
            <span className="text-[13px] font-medium text-gray-300 mb-1">
              將需求拆解並自動化擴展的開發引擎
            </span>
          </div>

          <div className="relative pl-[96px] flex-1 flex flex-col mt-4">
            <div className="absolute left-[47px] top-6 bottom-4 w-px border-l-[1.5px] border-dashed border-gray-600/50" />

            {/* Input Row */}
            <div className="relative mb-12">
              <div className="absolute -left-[96px] top-4 w-[84px] bg-white text-black py-2 rounded-xl text-[14px] font-semibold text-center shadow-md">
                Input
              </div>
              <div className="flex flex-wrap items-end gap-x-5 gap-y-6 h-full pl-6">
                <div className="flex items-end gap-3">
                  <div className="w-[110px] h-[110px] rounded-[14px] bg-gray-800 overflow-hidden relative shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-[50px] h-[50px] rounded-[10px] bg-white overflow-hidden mb-2 relative shadow-md p-1">
                      <div className="w-full h-full bg-gray-300 rounded-[6px]" />
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium tracking-wide">
                      spec A
                    </span>
                  </div>
                </div>

                <div className="h-[1.5px] w-6 bg-gray-600 mb-9 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-[45%] w-2 h-2 bg-gray-600 rounded-full" />
                </div>

                <div className="flex items-end gap-3">
                  <div className="w-[96px] h-[96px] rounded-[14px] bg-gray-800 overflow-hidden relative shadow-lg mb-1">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-[44px] h-[44px] rounded-[10px] bg-[#1d1d1f] overflow-hidden mb-2 relative shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 opacity-90 scale-90 rounded-[6px] m-auto" />
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium tracking-wide">
                      design B
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Cue Row */}
            <div className="relative mb-14">
              <div className="absolute -left-[96px] top-1 w-[84px] bg-white/[0.12] text-gray-300 py-[6px] rounded-[10px] text-[12px] font-medium text-center backdrop-blur-sm">
                Voice Cue
              </div>
              <div className="pl-6 text-[13px] tracking-wide">
                <span className="text-gray-400">我希望打造一個在這個 </span>
                <span className="text-yellow-500/90 font-medium">產業中</span>
                <span className="text-gray-400"> 具備高度視覺衝擊且 </span>
                <span className="text-yellow-500/90 font-medium">效能極佳的專案</span>
                <span className="text-gray-400">。</span>
              </div>
            </div>

            {/* Trigger Row */}
            <div className="relative mb-14">
              <div className="absolute -left-[96px] top-1/2 -translate-y-1/2 w-[84px] bg-white text-black py-2 rounded-xl text-[14px] font-semibold text-center shadow-md">
                Trigger
              </div>
              <div className="pl-6 flex flex-col gap-3">
                <div className="bg-[#1d1d1f] rounded-[14px] px-5 py-[14px] flex items-center gap-3">
                  <div className="text-gray-300">
                    <Layers size={18} />
                  </div>
                  <span className="text-[13px] font-bold text-white tracking-wide">
                    Dev Team{" "}
                    <span className="font-normal text-gray-400 ml-2">
                      基於拆解的規格元件進行敏捷開發作業
                    </span>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="bg-[#1d1d1f] rounded-[14px] p-4 flex flex-col justify-center items-center text-center">
                    <span className="text-[#7cd5e4] font-medium text-[13px] mb-1">Frontend</span>
                    <span className="text-gray-500 text-[11px]">React / UI 實作</span>
                  </div>
                  <div className="bg-[#1d1d1f] rounded-[14px] p-4 flex flex-col justify-center items-center text-center">
                    <span className="text-[#7cd5e4] font-medium text-[13px] mb-1">Backend</span>
                    <span className="text-gray-500 text-[11px]">架構與資料庫</span>
                  </div>
                  <div className="bg-[#1d1d1f] rounded-[14px] p-4 flex flex-col justify-center items-center text-center">
                    <span className="text-[#7cd5e4] font-medium text-[13px] mb-1">Testing</span>
                    <span className="text-gray-500 text-[11px]">品質與效能驗證</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Row */}
            <div className="relative">
              <div className="absolute -left-[96px] top-1 w-[84px] bg-[#7cd5e4] text-[#111] py-2 rounded-xl text-[14px] font-semibold text-center shadow-md">
                Output
              </div>
              <div className="pl-6">
                <div className="bg-[#1d1d1f] rounded-[14px] px-5 py-[14px] mb-5">
                  <span className="text-[13px] text-gray-300 tracking-wide font-medium">
                    Nova_Tech 經過嚴密建置所交付的全新數位資產
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-[14px] font-medium text-gray-500 pl-3">
                  <span className="hover:text-white transition-colors cursor-pointer">Web App</span>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    iOS / Android
                  </span>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Source Code
                  </span>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Handover
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TechStack ───────────────────────────────────────────────────────────────

export function ExTechStack() {
  return (
    <section className="py-32 relative overflow-hidden bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Technical Stack</h2>
        <p className="text-muted-foreground text-lg mb-16">現代化技術棧，確保高效能與易維護性</p>

        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {[
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "PostgreSQL",
            "Node.js",
            "Vercel",
            "AWS",
            "Docker",
          ].map((tech) => (
            <div
              key={tech}
              className="px-6 py-3 rounded-full border border-border bg-card text-sm font-medium tracking-wide"
            >
              {tech}
            </div>
          ))}
        </div>

        <div className="border border-border bg-card p-10 rounded-3xl max-w-3xl mx-auto relative overflow-hidden text-left backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/40 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-2xl bg-muted/40 flex items-center justify-center shrink-0 border border-border">
              <Terminal className="text-accent-foreground" size={32} />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">產權完全移交，原始碼 100% 交付</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                我們深知新創與企業的痛點。專案結案時，我們提供完整的原始碼、Git
                權限、部署文件與架構說明，絕不綁架您的技術資產。您可以隨時交接給內部團隊接手。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio ───────────────────────────────────────────────────────────────

const portfolioProjects = [
  {
    id: 1,
    color: "bg-[#ffa600]",
    colorHex: "#ffa600",
    image: "/feature_Scorder.png",
    textColor: "text-white",
    tagText: "上線 15%",
    title: "Scorder 餐廳線上點餐系統",
    tech: "React / TypeScript / Tailwind",
    desc: "針對客戶端、廚房端、管理端進行開發，提供線上點餐、桌號管理、庫存管理、訂單追蹤等功能。",
  },
  {
    id: 2,
    color: "bg-[#1575ce]",
    colorHex: "#1575ce",
    image: "/feature_araS.png",
    textColor: "text-white",
    tagText: "互動 75%",
    title: "araS 資產統計APP",
    tech: "React / Next.js / Tailwind / PostgreSQL /Clerk",
    desc: "累計資產統計視覺呈現，以簡單視覺化呈現資產統計數據，並呈現退休計畫。",
  },
  {
    id: 3,
    color: "bg-[#f3e45f]",
    colorHex: "#f3e45f",
    image: "/feature_U-turn.png",
    textColor: "text-white",
    tagText: "完成 100%",
    title: "U TURN 羽球分組系統",
    tech: "React / PostgreSQL / Clerk / Tailwind / Zeabur",
    desc: "羽球分組系統，提供羽球分組、成員配對、會員機制功能。",
  },
];

export function ExPortfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const p = portfolioProjects[activeIndex];
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <section
      id="portfolio"
      className="py-24 bg-background flex flex-col items-center text-foreground overflow-hidden border-y border-border/50"
    >
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center cursor-pointer"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative max-w-4xl w-full mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={p.image} alt={p.title} className="w-full h-auto rounded-2xl shadow-2xl" />
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute -top-4 -right-4 w-9 h-9 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full">
                {p.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <motion.div
        className="max-w-6xl w-full mx-auto px-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center">Featured Projects</h2>
      </motion.div>

      {/* Devices — vertical on mobile, horizontal bottom-aligned on lg+ */}
      <motion.div
        className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-10 px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Tablet */}
        <div className="relative flex flex-col items-center">
          <div
            className="w-[280px] h-[400px] bg-black rounded-[36px] p-3.5 overflow-hidden relative z-10"
            style={{ boxShadow: "0 50px 100px -20px rgba(0,0,0,0.3)" }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`tablet-${activeIndex}`}
                src={p.image}
                alt={`${p.title} tablet`}
                className="w-full h-full object-cover object-top rounded-[24px] block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </AnimatePresence>
          </div>
          {/* Ground shadow */}
          <div
            aria-hidden="true"
            className="w-[260px] h-[25px] bg-black/[0.12] rounded-full blur-[30px] -mt-2 z-0"
          />
        </div>

        {/* Phone — center */}
        <div className="relative flex flex-col items-center">
          <TiltCard>
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`查看 ${p.title} 全圖`}
              className="relative w-[150px] h-[310px] bg-black rounded-[30px] p-2 border border-gray-900 cursor-pointer block overflow-hidden group"
              style={{ boxShadow: "0 50px 100px -20px rgba(0,0,0,0.3)" }}
            >
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-black rounded-full z-20 pointer-events-none" />
              <div className="w-full h-full rounded-[22px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`phone-${activeIndex}`}
                    src={p.image}
                    alt={`${p.title} phone`}
                    className="w-full h-full object-cover object-top block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </AnimatePresence>
              </div>
              {/* Hover hint */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-[30px] z-10 pointer-events-none"
              >
                <span className="text-white text-[10px] font-medium bg-black/50 px-2.5 py-1.5 rounded-full backdrop-blur-sm">
                  點擊查看全圖
                </span>
              </motion.div>
            </button>
          </TiltCard>
          {/* Ground shadow */}
          <div
            aria-hidden="true"
            className="w-[130px] h-[25px] bg-black/[0.12] rounded-full blur-[30px] -mt-2 z-0"
          />
        </div>

        {/* Laptop */}
        <div className="relative flex flex-col items-center">
          <div className="w-[520px] relative z-10">
            <div className="bg-black rounded-t-[22px] p-3.5 pb-0">
              {/* Webcam dot */}
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full mx-auto mb-2.5" />
              <div className="w-full h-[320px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`laptop-${activeIndex}`}
                    src={p.image}
                    alt={`${p.title} laptop`}
                    className="w-full h-full object-cover object-top block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </AnimatePresence>
              </div>
            </div>
            {/* Laptop base */}
            <div
              className="h-3 rounded-b-[16px] relative"
              style={{
                width: "106%",
                left: "-3%",
                background: "linear-gradient(to bottom, #e5e7eb, #a1a1aa)",
                boxShadow: "inset 0 -1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div className="w-[100px] h-[5px] bg-[#71717a] mx-auto rounded-b-[10px]" />
            </div>
          </div>
          {/* Ground shadow */}
          <div
            aria-hidden="true"
            className="w-[540px] h-[25px] bg-black/[0.12] rounded-full blur-[30px] -mt-1 z-0"
          />
        </div>
      </motion.div>

      {/* Pill panel — project switcher */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="bg-white/50 backdrop-blur-md px-6 py-4 rounded-[2.5rem] shadow-xl border border-white/40 flex items-center gap-5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mr-2">
              Projects
            </span>
            {portfolioProjects.map((proj, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.button
                  key={proj.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-pressed={isActive}
                  className={`relative w-12 h-12 rounded-full overflow-hidden outline-none border-[3px] ${
                    isActive ? "border-black" : "border-transparent"
                  }`}
                  animate={{ y: isActive ? -5 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </motion.button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground font-medium tracking-wide">{p.title}</p>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

const testimonialColors = {
  red: "#FF3B30",
  purple: "#A259FF",
  yellow: "#FFD100",
  blue: "#0A6CFF",
  green: "#00E5B1",
};

function FeedbackCard({
  name,
  text,
  subText,
  avatarBg,
}: {
  name: string;
  text: string;
  subText: string;
  avatarBg: string;
}) {
  return (
    <div className="bg-white h-[90px] rounded-full flex items-center pr-10 pl-3 gap-5 shrink-0 shadow-lg cursor-default transition-transform hover:scale-[1.02] duration-300">
      <div
        className="w-[66px] h-[66px] rounded-full shrink-0 flex items-center justify-center p-[3px]"
        style={{ backgroundColor: avatarBg }}
      >
        <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden" />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-[13px] font-black text-gray-900 leading-none mb-1.5">{name}</h4>
        <p className="text-[15px] font-bold text-black tracking-tight leading-none mb-1.5">
          {text}
        </p>
        <p className="text-[11px] text-gray-500 font-medium leading-none">{subText}</p>
      </div>
    </div>
  );
}

function MarqueeRow({
  children,
  direction = "left",
  speed = 40,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        className="flex gap-6 w-max shrink-0 pr-6"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      >
        <div className="flex gap-6 shrink-0 items-center">{children}</div>
        <div className="flex gap-6 shrink-0 items-center">{children}</div>
      </motion.div>
    </div>
  );
}

export function ExTestimonials() {
  const colors = testimonialColors;

  return (
    <section className="py-32 bg-background text-foreground overflow-hidden flex flex-col items-center border-y border-border/50 relative">
      <div className="max-w-7xl mx-auto px-6 mb-20 w-full relative z-10">
        <h2 className="text-4xl font-bold text-center">Client Trust &amp; Feedback</h2>
      </div>

      <div className="flex flex-col w-full gap-6 items-center relative z-10 overflow-hidden">
        <MarqueeRow direction="left" speed={45}>
          <div
            className="h-[90px] rounded-full shrink-0 w-[400px]"
            style={{ backgroundColor: colors.red }}
          />
          <FeedbackCard
            name="Joe Sparano"
            text="好的設計是顯而易見的。優秀的設計是透明的。"
            subText="Good design is obvious. Great design is transparent."
            avatarBg={colors.purple}
          />
          <div
            className="h-[90px] w-[90px] rounded-full shrink-0"
            style={{ backgroundColor: colors.purple }}
          />
          <FeedbackCard
            name="Martin LeBlanc"
            text="UI 就像個笑話。如果你需要解釋它，那就是不夠好。"
            subText="User interface is like a joke. If you have to explain it, it's not that good."
            avatarBg={colors.green}
          />
          <div
            className="h-[90px] rounded-full shrink-0 w-[200px]"
            style={{ backgroundColor: colors.yellow }}
          />
          <FeedbackCard
            name="Paul Rand"
            text="設計是靜默的品牌推廣大使。"
            subText="Design is the silent ambassador of your brand."
            avatarBg={colors.blue}
          />
        </MarqueeRow>

        <MarqueeRow direction="right" speed={55}>
          <div
            className="h-[90px] rounded-full shrink-0 w-[150px]"
            style={{ backgroundColor: colors.yellow }}
          />
          <div
            className="h-[90px] rounded-full shrink-0 w-[240px]"
            style={{ backgroundColor: colors.blue }}
          />
          <FeedbackCard
            name="Steve Jobs"
            text="設計不只關乎外表和感覺。設計是它如何運作。"
            subText="Design is not just what it looks like and feels like. Design is how it works."
            avatarBg={colors.red}
          />
          <div
            className="h-[90px] w-[90px] rounded-full shrink-0"
            style={{ backgroundColor: colors.blue }}
          />
          <div
            className="h-[90px] rounded-full shrink-0 w-[300px]"
            style={{ backgroundColor: colors.red }}
          />
          <FeedbackCard
            name="Ivan Chermayeff"
            text="設計是為了解決問題而生的藝術。"
            subText="Design is directed toward human beings."
            avatarBg={colors.purple}
          />
          <div
            className="h-[90px] rounded-full shrink-0 w-[120px]"
            style={{ backgroundColor: colors.green }}
          />
        </MarqueeRow>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export function ExContact() {
  return (
    <section id="contact" className="py-32 relative bg-background text-foreground">
      <div className="absolute rounded-full blur-[120px] bg-accent pointer-events-none w-[800px] h-[800px] top-0 right-0 opacity-30" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6">準備好開始您的專案了嗎？</h2>
        <p className="text-muted-foreground text-lg mb-12">
          填寫簡短的需求表單，我們將在 24 小時內由資深技術經理與您聯繫，並提供初步報價區間。
        </p>

        <form className="border border-border bg-card p-8 rounded-3xl text-left space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="flex flex-col gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider"
              >
                姓名 / 聯絡人
                <input
                  id="contact-name"
                  type="text"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-ring transition-colors font-normal normal-case tracking-normal"
                  placeholder="John Doe"
                  required
                />
              </label>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="contact-email"
                className="flex flex-col gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider"
              >
                聯絡信箱
                <input
                  id="contact-email"
                  type="email"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-ring transition-colors font-normal normal-case tracking-normal"
                  placeholder="john@example.com"
                  required
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="contact-date"
                className="flex flex-col gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider"
              >
                專案完成日期
                <input
                  id="contact-date"
                  type="date"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-ring transition-colors font-normal normal-case tracking-normal"
                  placeholder="2026/01/01"
                  required
                />
              </label>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="contact-line"
                className="flex flex-col gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider"
              >
                Line名稱
                <input
                  id="contact-line"
                  type="text"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-ring transition-colors font-normal normal-case tracking-normal"
                  placeholder="@yourlineid"
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contact-type"
              className="flex flex-col gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider"
            >
              專案類型
              <select
                id="contact-type"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-ring transition-colors appearance-none font-normal normal-case tracking-normal"
                required
              >
                <option>Web 網站 / 系統開發</option>
                <option>iOS / Android App 開發</option>
                <option>UI/UX 設計</option>
                <option>其他技術諮詢</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            className="w-full bg-foreground text-background font-bold text-lg py-4 rounded-xl hover:opacity-90 transition-transform active:scale-[0.98]"
          >
            送出諮詢需求
          </button>
        </form>
      </div>
    </section>
  );
}

// ─── AppShowcase ─────────────────────────────────────────────────────────────

export function ExAppShowcase() {
  return (
    <section className="py-24 relative bg-background overflow-hidden flex justify-center items-center min-h-[700px] border-t border-border/50 select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[150%] -rotate-[10deg] z-0 whitespace-nowrap opacity-60 mix-blend-screen pointer-events-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="text-[#E9FF42] font-display text-[80px] md:text-[120px] font-bold tracking-tight flex gap-8"
        >
          <span>Nivorae</span>
          <span>Nivorae</span>
          <span>Nivorae</span>
          <span>Nivorae</span>
        </motion.div>
      </div>

      <div className="relative w-full max-w-4xl h-[550px] flex justify-center items-center scale-75 sm:scale-90 md:scale-100">
        {/* Left Phone */}
        <motion.div
          initial={{ rotate: -12, x: -90, y: 20 }}
          animate={{ y: [20, 0, 20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-20 w-[270px] h-[550px] rounded-[45px] border-[12px] border-[#222] bg-[#6D001A] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col px-6 pt-4 pb-8 text-black"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#222] rounded-b-[18px] z-30" />

          <div className="flex justify-between items-center text-[10px] font-bold mb-10 mt-1 px-1">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2.5 border-2 border-black rounded-[3px] p-[1px]">
                <div className="bg-black w-full h-full rounded-[1px]" />
              </div>
            </div>
          </div>

          <h3 className="text-[26px] font-black text-center leading-[1.1] tracking-tight mb-8">
            Let&apos;s start
            <br />
            your
            <br />
            journey
          </h3>

          <div className="flex-1 relative flex justify-center items-center w-full">
            <div className="absolute inset-0 flex justify-center items-center">
              <Star
                size={110}
                strokeWidth={1}
                fill="white"
                className="text-black rotate-12 drop-shadow-md"
              />
            </div>
            <div className="absolute right-2 bottom-6 w-14 h-12 bg-white border-[3px] border-black rounded-lg shadow-sm flex items-center justify-center -rotate-6">
              <ImageIcon size={20} strokeWidth={2.5} />
            </div>
          </div>

          <div className="space-y-3 w-full mt-4">
            <button
              type="button"
              className="w-full py-3.5 bg-[#E9FF42] text-black font-bold rounded-full text-sm shadow-sm transition-transform active:scale-95"
            >
              Sign in
            </button>
            <button
              type="button"
              className="w-full py-3.5 bg-white text-black font-bold rounded-full text-sm shadow-sm transition-transform active:scale-95"
            >
              Sign up
            </button>
          </div>
        </motion.div>

        {/* Right Phone */}
        <motion.div
          initial={{ rotate: 12, x: 90, y: -20 }}
          animate={{ y: [-20, 0, -20] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute z-10 w-[270px] h-[550px] rounded-[45px] border-[12px] border-[#333] bg-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col px-6 pt-4 pb-8 text-white"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#333] rounded-b-[18px] z-30" />

          <div className="flex justify-between items-center text-[10px] font-bold mb-10 mt-1 px-1">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2.5 border-2 border-white rounded-[3px] p-[1px]">
                <div className="bg-white w-full h-full rounded-[1px]" />
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center leading-tight mb-8">
            Create
            <br />
            account
          </h3>

          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <span className="text-[11px] text-gray-300 pl-2 font-medium">Email</span>
              <div className="w-full h-[42px] bg-white rounded-full flex items-center px-4 text-[13px] text-black font-medium">
                user@example.com
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-gray-300 pl-2 font-medium">Username</span>
              <div className="w-full h-[42px] bg-white rounded-full flex items-center px-4 text-[13px] text-black font-medium">
                greatdesigner
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-gray-300 pl-2 font-medium">Full name</span>
              <div className="w-full h-[42px] bg-white rounded-full flex items-center px-4 text-[13px] text-black font-medium">
                Anastasia Ivanova
              </div>
            </div>
            <button
              type="button"
              className="w-full py-3.5 bg-[#E9FF42] text-black font-bold rounded-full text-xs shadow-sm mt-4 transition-transform active:scale-95"
            >
              Create an account
            </button>
          </div>

          <div className="text-center text-[10px] text-gray-400 mt-2">
            Already have an account?{" "}
            <span className="text-white underline cursor-pointer">Sign in</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[15%] w-[150%] rotate-[15deg] z-30 whitespace-nowrap pointer-events-none">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="text-transparent font-display text-[80px] md:text-[120px] font-bold tracking-tight flex gap-8"
          style={{ WebkitTextStroke: "2px #E9FF42" }}
        >
          <span>NIVORAE</span>
          <span>NIVORAE</span>
          <span>NIVORAE</span>
          <span>NIVORAE</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export function ExFooter() {
  return (
    <footer className="border-t border-border bg-background pt-20 pb-10 text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="/favicon.ico"
                alt="Nivorae"
                width={20}
                height={20}
                className="h-5 w-auto object-contain"
              />
              <span className="font-display font-semibold tracking-wide text-xl">Nivorae</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              專注於現代化技術的接案開發代理商。我們幫助企業與新創打造極具競爭力的數位產品。
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Web 應用開發
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  UI/UX 設計
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  電商網站架設
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  自動化 / 整合案件
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  爬蟲 / 資料服務
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  落地頁 / 小型網站
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  技術諮詢
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#portfolio" className="hover:text-foreground transition-colors">
                  關於我們
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  隱私權政策
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
