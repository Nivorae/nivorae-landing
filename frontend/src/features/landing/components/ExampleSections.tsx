import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  PenTool,
  Terminal,
  Star,
  Image as ImageIcon,
  X,
  ListChecks,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import content from "../landingContent.json";
import type { Lang } from "../i18n";
import { ICON_MAP } from "../iconMap";

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

const heroCardData = content.exHero.cards.map((c) => ({
  Icon: ICON_MAP[c.icon] ?? Globe,
  title: c.title,
  desc: c.desc,
}));

const CARD_WIDTH = 260;
const CARD_HEIGHT = 280;
const CARD_GAP = 24;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;
const TOTAL_CARDS = 10;
const SCROLL_SPEED = 0.8;
const ARC_PARABOLA = 0.00025;
const ARC_ROTATION = 0.012;

export function ExHero({ lang }: { lang: Lang }) {
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
          <motion.span
            className="font-serif italic text-xl text-muted-foreground mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {content.exHero[lang].annotationLeft.split("\n").map((line, i, arr) => (
              <span key={line}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </motion.span>
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
            <motion.path
              d="M50 10 Q 10 15 15 50"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 1.0 }}
            />
            <motion.path
              d="M25 45 L 15 50 L 10 40"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 1.85 }}
            />
          </svg>
        </div>

        <h1 className="text-[2.75rem] sm:text-6xl md:text-[5rem] leading-[1.05] font-bold text-foreground tracking-tight">
          {content.exHero[lang].headline.split("\n").map((line, i, arr) => (
            <span key={line}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <div className="absolute -right-24 top-40 hidden lg:flex flex-col items-center rotate-[-5deg]">
          <motion.span
            className="font-serif italic text-xl text-muted-foreground mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {content.exHero[lang].annotationRight.split("\n").map((line, i, arr) => (
              <span key={line}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </motion.span>
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
            <motion.path
              d="M10 10 Q 50 15 45 50"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 1.2 }}
            />
            <motion.path
              d="M35 45 L 45 50 L 50 40"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 2.05 }}
            />
          </svg>
        </div>
      </div>

      <p className="text-center text-muted-foreground text-base md:text-lg max-w-[600px] mx-auto mb-6 leading-relaxed">
        {content.exHero[lang].subtitle.split("\n").map((line, i, arr) => (
          <span key={line}>
            {line}
            {i < arr.length - 1 && <br className="hidden md:block" />}
          </span>
        ))}
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

const ILLUSTRATION_COLORS = {
  accent: "#4E000A",
  accentBorder: "#7a1422",
  blockBg: "#252527",
  blockBorder: "#3a3a3c",
  lineGray: "#4a4a4c",
  highlight: "#7cd5e4",
  windowChrome: "#1d1d1f",
  cardBg: "#2a2a2c",
  layerBg: "#1a1a1c",
  altBg: "#222224",
} as const;

function IllustrationModules() {
  return (
    <svg viewBox="0 0 200 100" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
      {[
        [40, 18],
        [85, 18],
        [130, 18],
        [40, 55],
        [130, 55],
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="32"
          height="28"
          rx="5"
          fill={ILLUSTRATION_COLORS.blockBg}
          stroke={ILLUSTRATION_COLORS.blockBorder}
          strokeWidth="1"
        />
      ))}
      <rect
        x="85"
        y="55"
        width="32"
        height="28"
        rx="5"
        fill={ILLUSTRATION_COLORS.accent}
        stroke={ILLUSTRATION_COLORS.accentBorder}
        strokeWidth="1"
      />
      <circle cx="101" cy="69" r="5" fill="#fff" opacity="0.85" />
    </svg>
  );
}

function IllustrationChecklist() {
  return (
    <svg viewBox="0 0 200 100" className="w-3/4 h-4/5" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="40"
        y="10"
        width="120"
        height="80"
        rx="6"
        fill={ILLUSTRATION_COLORS.blockBg}
        stroke={ILLUSTRATION_COLORS.blockBorder}
        strokeWidth="1"
      />
      <rect
        x="52"
        y="20"
        width="40"
        height="4"
        rx="2"
        fill={ILLUSTRATION_COLORS.accent}
        opacity="0.7"
      />
      {[36, 50, 64, 78].map((y, i) => (
        <g key={y}>
          <rect
            x="52"
            y={y - 4}
            width="8"
            height="8"
            rx="1.5"
            fill={i < 2 ? ILLUSTRATION_COLORS.accent : "none"}
            stroke={ILLUSTRATION_COLORS.accent}
            strokeOpacity={i < 2 ? "1" : "0.6"}
            strokeWidth="1"
          />
          {i < 2 && (
            <path
              d={`M 54 ${y} l 2 2 l 4 -4`}
              stroke="white"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <line
            x1="66"
            y1={y}
            x2={148 - i * 8}
            y2={y}
            stroke={ILLUSTRATION_COLORS.lineGray}
            strokeWidth="1.5"
          />
        </g>
      ))}
    </svg>
  );
}

function IllustrationContract() {
  return (
    <svg viewBox="0 0 200 100" className="w-3/4 h-4/5" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="55"
        y="6"
        width="90"
        height="88"
        rx="5"
        fill={ILLUSTRATION_COLORS.blockBg}
        stroke={ILLUSTRATION_COLORS.blockBorder}
        strokeWidth="1"
      />
      <rect x="65" y="16" width="42" height="4" rx="2" fill={ILLUSTRATION_COLORS.lineGray} />
      <line
        x1="65"
        y1="30"
        x2="135"
        y2="30"
        stroke={ILLUSTRATION_COLORS.blockBorder}
        strokeWidth="1.5"
      />
      <line
        x1="65"
        y1="38"
        x2="130"
        y2="38"
        stroke={ILLUSTRATION_COLORS.blockBorder}
        strokeWidth="1.5"
      />
      <line
        x1="65"
        y1="46"
        x2="120"
        y2="46"
        stroke={ILLUSTRATION_COLORS.blockBorder}
        strokeWidth="1.5"
      />
      <line
        x1="65"
        y1="54"
        x2="128"
        y2="54"
        stroke={ILLUSTRATION_COLORS.blockBorder}
        strokeWidth="1.5"
      />
      <line
        x1="65"
        y1="80"
        x2="135"
        y2="80"
        stroke={ILLUSTRATION_COLORS.lineGray}
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <path
        d="M 70 76 Q 78 66 86 76 T 102 76 T 118 74 L 128 70"
        stroke={ILLUSTRATION_COLORS.accent}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IllustrationCode() {
  return (
    <svg viewBox="0 0 200 100" className="w-[88%] h-4/5" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="20"
        y="10"
        width="160"
        height="80"
        rx="6"
        fill={ILLUSTRATION_COLORS.blockBg}
        stroke={ILLUSTRATION_COLORS.blockBorder}
        strokeWidth="1"
      />
      <rect x="20" y="10" width="160" height="16" rx="6" fill={ILLUSTRATION_COLORS.windowChrome} />
      <rect x="20" y="20" width="160" height="6" fill={ILLUSTRATION_COLORS.windowChrome} />
      <circle cx="32" cy="18" r="2.5" fill={ILLUSTRATION_COLORS.accent} />
      <circle cx="42" cy="18" r="2.5" fill={ILLUSTRATION_COLORS.lineGray} />
      <circle cx="52" cy="18" r="2.5" fill={ILLUSTRATION_COLORS.lineGray} />
      <line
        x1="32"
        y1="40"
        x2="100"
        y2="40"
        stroke={ILLUSTRATION_COLORS.accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="50"
        x2="155"
        y2="50"
        stroke={ILLUSTRATION_COLORS.lineGray}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="60"
        x2="130"
        y2="60"
        stroke={ILLUSTRATION_COLORS.lineGray}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="48"
        y1="70"
        x2="145"
        y2="70"
        stroke={ILLUSTRATION_COLORS.lineGray}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="80"
        x2="95"
        y2="80"
        stroke={ILLUSTRATION_COLORS.highlight}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function IllustrationDelivery() {
  return (
    <svg viewBox="0 0 200 100" className="w-3/4 h-4/5" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="45"
        y="20"
        width="90"
        height="68"
        rx="5"
        fill={ILLUSTRATION_COLORS.layerBg}
        stroke={ILLUSTRATION_COLORS.blockBorder}
        strokeWidth="1"
      />
      <rect
        x="55"
        y="28"
        width="90"
        height="64"
        rx="5"
        fill={ILLUSTRATION_COLORS.altBg}
        stroke={ILLUSTRATION_COLORS.blockBorder}
        strokeWidth="1"
      />
      <path
        d="M 65 38 L 88 38 L 94 44 L 155 44 L 155 92 L 65 92 Z"
        fill={ILLUSTRATION_COLORS.cardBg}
        stroke={ILLUSTRATION_COLORS.accent}
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <line
        x1="76"
        y1="58"
        x2="142"
        y2="58"
        stroke={ILLUSTRATION_COLORS.lineGray}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="76"
        y1="68"
        x2="130"
        y2="68"
        stroke={ILLUSTRATION_COLORS.lineGray}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="76"
        y1="78"
        x2="138"
        y2="78"
        stroke={ILLUSTRATION_COLORS.lineGray}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IllustrationWarranty() {
  return (
    <svg viewBox="0 0 200 100" className="w-3/5 h-[90%]" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 100 8 L 138 22 L 138 52 Q 138 78 100 94 Q 62 78 62 52 L 62 22 Z"
        fill={ILLUSTRATION_COLORS.blockBg}
        stroke={ILLUSTRATION_COLORS.accent}
        strokeWidth="2"
      />
      <path
        d="M 100 8 L 138 22 L 138 30 L 62 30 L 62 22 Z"
        fill={ILLUSTRATION_COLORS.accent}
        fillOpacity="0.4"
      />
      <path
        d="M 78 52 L 92 66 L 122 36"
        stroke={ILLUSTRATION_COLORS.highlight}
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stepIllustrations: React.FC[] = [
  IllustrationModules,
  IllustrationChecklist,
  IllustrationContract,
  IllustrationCode,
  IllustrationDelivery,
  IllustrationWarranty,
];

const PROCESS_STEPS = {
  zh: content.exProcess.steps.map((s) => ({ Icon: ICON_MAP[s.icon] ?? ListChecks, ...s.zh })),
  en: content.exProcess.steps.map((s) => ({ Icon: ICON_MAP[s.icon] ?? ListChecks, ...s.en })),
};

export function ExProcess({ lang }: { lang: Lang }) {
  const processSteps = PROCESS_STEPS[lang];
  const [activeStep, setActiveStep] = useState(0);
  const active = processSteps[activeStep];
  const ActiveIcon = active.Icon;
  const ActiveIllustration = stepIllustrations[activeStep];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % processSteps.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + processSteps.length) % processSteps.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = processSteps.length - 1;
    else return;
    e.preventDefault();
    setActiveStep(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="process"
      className="py-24 bg-background text-foreground flex flex-col items-center justify-center border-y border-border/50 font-sans overflow-hidden"
    >
      <h2 className="text-4xl font-bold mb-20 text-center text-foreground">
        {content.exProcess[lang].title}
      </h2>
      <div className="max-w-6xl w-full px-6 flex flex-col md:flex-row gap-12 lg:gap-20 items-stretch">
        <div className="bg-card dark:bg-foreground/[0.12] rounded-[2rem] p-8 md:p-10 w-full md:w-[45%] flex flex-col relative shadow-sm dark:shadow-none shrink-0 border border-border overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex-1 flex flex-col gap-6"
            >
              <div className="relative flex-1 flex items-center justify-center bg-muted rounded-[1.5rem] border border-border/60 min-h-[280px] py-6">
                <ActiveIllustration />
              </div>

              <div>
                <span className="inline-flex w-fit items-center gap-1 px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.25em] overflow-hidden">
                  STEP{" "}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={activeStep}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="inline-block"
                    >
                      {String(activeStep + 1).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full md:w-[55%] flex flex-col">
          <div className="flex flex-col gap-1 mb-8">
            <img
              src="/logo/typo.webp"
              alt="Nivorae"
              className="h-7 w-auto max-w-[160px] object-contain object-left dark:brightness-0 dark:invert"
            />
            <span className="text-sm font-medium text-muted-foreground">
              {content.exProcess[lang].subtitle}
            </span>
          </div>

          <div
            role="tablist"
            aria-label={lang === "zh" ? "開發流程步驟" : "Development process steps"}
            className="grid grid-cols-3 lg:grid-cols-6 gap-1.5 mb-6"
          >
            {processSteps.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <button
                  key={step.title}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="process-step-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveStep(i)}
                  onKeyDown={(e) => handleTabKeyDown(e, i)}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-1 px-1.5 py-3 min-h-[44px] rounded-xl border transition-all duration-200",
                    isActive
                      ? "bg-accent border-accent text-accent-foreground shadow-lg shadow-accent/40 scale-[1.02]"
                      : "bg-muted dark:bg-foreground/[0.12] border-border dark:border-foreground/[0.30] text-muted-foreground hover:border-accent/60 hover:text-foreground hover:-translate-y-0.5"
                  )}
                >
                  <span
                    className={cn(
                      "text-[10px] font-bold tracking-[0.15em]",
                      isActive ? "text-white/70" : "text-muted-foreground/70"
                    )}
                  >
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-bold leading-tight text-center">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="process-step-panel"
            role="tabpanel"
            aria-live="polite"
            className="flex-1 bg-card dark:bg-foreground/[0.12] border border-border rounded-[20px] p-6 md:p-8 shadow-sm dark:shadow-none min-h-[260px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                      Step {String(activeStep + 1).padStart(2, "0")} / 06
                    </span>
                    <h3 className="text-2xl font-bold text-foreground leading-tight mt-1">
                      {active.title}
                    </h3>
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {active.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[14px] text-foreground tracking-wide"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
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

const PORTFOLIO_PROJECTS = {
  zh: content.exPortfolio.projects.map((proj) => ({
    id: proj.id,
    colorHex: proj.color,
    image: proj.image,
    tagText: proj.tagText,
    ...proj.zh,
  })),
  en: content.exPortfolio.projects.map((proj) => ({
    id: proj.id,
    colorHex: proj.color,
    image: proj.image,
    tagText: proj.tagText,
    ...proj.en,
  })),
};

export function ExPortfolio({ lang }: { lang: Lang }) {
  const portfolioProjects = PORTFOLIO_PROJECTS[lang];
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
        <h2 className="text-4xl font-bold text-center">{content.exPortfolio[lang].title}</h2>
      </motion.div>

      {/* Devices — vertical on mobile, horizontal bottom-aligned on md+ */}
      <motion.div
        className="flex flex-col md:flex-row items-center md:items-end justify-center gap-10 px-6"
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
        <div className="hidden lg:flex flex-col items-center">
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

const TESTIMONIAL_PILL_ACCENT = "#4E000A";
const TESTIMONIAL_PILL_MUTED = "#e0e0e0";

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
    <motion.div
      className="bg-white h-[90px] rounded-full flex items-center pr-10 pl-3 gap-5 shrink-0 shadow-lg cursor-default"
      whileHover={{ y: -5, boxShadow: "0 14px 40px rgba(0,0,0,0.13)" }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
    >
      <div
        className="w-[66px] h-[66px] rounded-full shrink-0 flex items-center justify-center p-[3px]"
        style={{ backgroundColor: avatarBg }}
      >
        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <span className="text-[22px] font-black leading-none" style={{ color: avatarBg }}>
            {name.charAt(0)}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-[13px] font-black text-gray-900 leading-none mb-1.5">{name}</h4>
        <p className="text-[15px] font-bold text-black tracking-tight leading-none mb-1.5">
          {text}
        </p>
        <p className="text-[11px] text-gray-500 font-medium leading-none">{subText}</p>
      </div>
    </motion.div>
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
  const [paused, setPaused] = useState(false);
  const animName = direction === "left" ? "nivorae-marquee-left" : "nivorae-marquee-right";

  return (
    <div
      className="flex w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex gap-6 w-max shrink-0 pr-6"
        style={{
          animation: `${animName} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div className="flex gap-6 shrink-0 items-center">{children}</div>
        <div className="flex gap-6 shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}

export function ExTestimonials({ lang }: { lang: Lang }) {
  return (
    <section className="py-32 bg-background text-foreground overflow-hidden flex flex-col items-center border-y border-border/50 relative">
      <div className="max-w-7xl mx-auto px-6 mb-20 w-full relative z-10">
        <h2 className="text-4xl font-bold text-center">{content.exTestimonials[lang].title}</h2>
      </div>

      <div className="flex flex-col w-full gap-6 items-center relative z-10 overflow-hidden">
        <MarqueeRow direction="left" speed={45}>
          <div
            className="h-[90px] rounded-full shrink-0 w-[400px]"
            style={{ backgroundColor: TESTIMONIAL_PILL_ACCENT }}
          />
          {content.exTestimonials.row1.map((t) => (
            <FeedbackCard
              key={t[lang].name}
              name={t[lang].name}
              text={t[lang].text}
              subText={t[lang].subText}
              avatarBg={t.avatarColor}
            />
          ))}
        </MarqueeRow>

        <MarqueeRow direction="right" speed={55}>
          <div
            className="h-[90px] rounded-full shrink-0 w-[150px]"
            style={{ backgroundColor: TESTIMONIAL_PILL_ACCENT }}
          />
          <div
            className="h-[90px] rounded-full shrink-0 w-[240px]"
            style={{ backgroundColor: TESTIMONIAL_PILL_MUTED }}
          />
          {content.exTestimonials.row2.map((t) => (
            <FeedbackCard
              key={t[lang].name}
              name={t[lang].name}
              text={t[lang].text}
              subText={t[lang].subText}
              avatarBg={t.avatarColor}
            />
          ))}
        </MarqueeRow>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export function ExContact({ lang }: { lang: Lang }) {
  return (
    <section id="contact" className="py-32 relative bg-background text-foreground">
      <div className="absolute rounded-full blur-[120px] bg-accent pointer-events-none w-[800px] h-[800px] top-0 right-0 opacity-30" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6">{content.exContact[lang].title}</h2>
        <p className="text-muted-foreground text-lg mb-12">{content.exContact[lang].desc}</p>

        <form className="border border-border bg-card p-8 rounded-3xl text-left space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="flex flex-col gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider"
              >
                {content.exContact[lang].form.name.label}
                <input
                  id="contact-name"
                  type="text"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-ring transition-colors font-normal normal-case tracking-normal"
                  placeholder={content.exContact[lang].form.name.placeholder}
                  required
                />
              </label>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="contact-email"
                className="flex flex-col gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider"
              >
                {content.exContact[lang].form.email.label}
                <input
                  id="contact-email"
                  type="email"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-ring transition-colors font-normal normal-case tracking-normal"
                  placeholder={content.exContact[lang].form.email.placeholder}
                  required
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="contact-date"
                className="flex flex-col gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider"
              >
                {content.exContact[lang].form.date.label}
                <input
                  id="contact-date"
                  type="date"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-ring transition-colors font-normal normal-case tracking-normal"
                  placeholder={content.exContact[lang].form.date.placeholder}
                  required
                />
              </label>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="contact-line"
                className="flex flex-col gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider"
              >
                {content.exContact[lang].form.line.label}
                <input
                  id="contact-line"
                  type="text"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-ring transition-colors font-normal normal-case tracking-normal"
                  placeholder={content.exContact[lang].form.line.placeholder}
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contact-type"
              className="flex flex-col gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider"
            >
              {content.exContact[lang].form.type.label}
              <select
                id="contact-type"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-ring transition-colors appearance-none font-normal normal-case tracking-normal"
                required
              >
                {content.exContact[lang].form.type.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </label>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.975 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="w-full bg-foreground text-background font-bold text-lg py-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            {content.exContact[lang].form.submit}
          </motion.button>
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
          className="text-[#E9FF42] font-display text-[80px] lg:text-[120px] font-bold tracking-tight flex gap-8"
        >
          <img
            src="/logo/typo.webp"
            alt="Nivorae"
            className="h-20 lg:h-28 w-auto object-contain brightness-0 invert"
          />
          <img
            src="/logo/typo.webp"
            alt=""
            aria-hidden="true"
            className="h-20 lg:h-28 w-auto object-contain brightness-0 invert"
          />
          <img
            src="/logo/typo.webp"
            alt=""
            aria-hidden="true"
            className="h-20 lg:h-28 w-auto object-contain brightness-0 invert"
          />
          <img
            src="/logo/typo.webp"
            alt=""
            aria-hidden="true"
            className="h-20 lg:h-28 w-auto object-contain brightness-0 invert"
          />
        </motion.div>
      </div>

      <div className="relative w-full max-w-4xl h-[550px] flex justify-center items-center scale-75 sm:scale-90 lg:scale-100">
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
          className="text-transparent font-display text-[80px] lg:text-[120px] font-bold tracking-tight flex gap-8"
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

export function ExFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-border bg-background pt-20 pb-10 text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="/logo/icon.webp"
                alt="Nivorae"
                width={20}
                height={20}
                className="h-5 w-auto object-contain"
              />
              <img
                src="/logo/typo.webp"
                alt="Nivorae"
                className="h-6 w-auto object-contain dark:brightness-0 dark:invert"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              {content.exFooter[lang].tagline}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">{content.exFooter[lang].servicesHeading}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {content.exFooter[lang].services.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-foreground transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{content.exFooter[lang].companyHeading}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {content.exFooter[lang].company.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="hover:text-foreground transition-colors">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Nivorae. All rights reserved.</span>
          <span className="font-mono opacity-60">{__APP_VERSION__}</span>
        </div>
      </div>
    </footer>
  );
}
