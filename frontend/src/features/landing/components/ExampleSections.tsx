import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  PenTool,
  Zap,
  ArrowRight,
  Layers,
  Terminal,
  ChevronLeft,
  MoreHorizontal,
  Star,
  Image as ImageIcon,
} from "lucide-react";

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

export function ExHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black text-white">
      <div className="absolute rounded-full blur-[100px] bg-blue-500/30 pointer-events-none w-[600px] h-[600px] top-1/4 -left-64 opacity-50" />
      <div className="absolute rounded-full blur-[100px] bg-purple-500/30 pointer-events-none w-[500px] h-[500px] bottom-0 right-0 opacity-50" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold tracking-wider text-blue-300 uppercase">
            Premium Digital Agency
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1]">
            打造卓越的
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              數位體驗
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
            從零到一的高效能 Web 與 App
            開發。我們不只寫程式，我們為您建構可擴展、現代化且極具質感的數位產品。
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-white text-black hover:bg-gray-200 transition-colors font-semibold flex items-center gap-2"
            >
              立即諮詢 <ArrowRight size={18} />
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors font-semibold"
            >
              觀看案例
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center p-8"
        >
          <TiltCard className="w-full max-w-md aspect-[4/5] rounded-2xl relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 to-black p-[1px]">
              <div className="absolute inset-0 rounded-2xl bg-black/80 backdrop-blur-3xl overflow-hidden flex flex-col">
                <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="mx-auto text-xs text-gray-500 font-mono">src/App.tsx</div>
                </div>
                <div className="p-6 font-mono text-sm leading-loose text-gray-300 flex-1 overflow-hidden relative">
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
                  <span className="text-blue-400">import</span> React{" "}
                  <span className="text-blue-400">from</span>{" "}
                  <span className="text-green-400">&apos;react&apos;</span>;
                  <br />
                  <span className="text-blue-400">import</span> {"{ "}motion{" }"}{" "}
                  <span className="text-blue-400">from</span>{" "}
                  <span className="text-green-400">&apos;motion/react&apos;</span>;
                  <br />
                  <br />
                  <span className="text-purple-400">export default function</span>{" "}
                  <span className="text-yellow-200">App</span>() {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">return</span> (
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{"<"}
                  <span className="text-blue-300">motion.main</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-blue-200">initial</span>={"{"}
                  {"{"} <span className="text-gray-400">opacity</span>:{" "}
                  <span className="text-yellow-400">0</span> {"}"}
                  {"}"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-blue-200">animate</span>={"{"}
                  {"{"} <span className="text-gray-400">opacity</span>:{" "}
                  <span className="text-yellow-400">1</span> {"}"}
                  {"}"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-blue-200">className</span>=
                  <span className="text-green-400">&quot;bg-black&quot;</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{">"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"<"}
                  <span className="text-blue-300">FutureExperience</span> /{">"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{"</"}
                  <span className="text-blue-300">motion.main</span>
                  {">"}
                  <br />
                  &nbsp;&nbsp;);
                  <br />
                  {"}"}
                  <br />
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </TiltCard>

          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -right-10 border border-white/10 bg-black/50 px-4 py-3 rounded-xl flex items-center gap-3 backdrop-blur-xl text-white"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-sm font-bold">100 / 100</div>
              <div className="text-xs text-gray-400">Lighthouse 效能</div>
            </div>
          </motion.div>
        </motion.div>
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
    <section id="services" className="py-32 relative bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-4">Service Scope</h2>
          <p className="text-gray-400 text-lg">專注核心技術，提供全方位數位解決方案</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <TiltCard key={s.title}>
              <div className="border border-white/10 bg-white/5 rounded-3xl p-8 h-full relative group backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                <div className="text-blue-400 mb-6">{s.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
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
      className="py-24 bg-[#0a0a0a] text-white flex justify-center border-y border-white/5 font-sans overflow-hidden"
    >
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
                  nova
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
              nova
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
    <section className="py-32 relative overflow-hidden bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Technical Stack</h2>
        <p className="text-gray-400 text-lg mb-16">現代化技術棧，確保高效能與易維護性</p>

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
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium tracking-wide"
            >
              {tech}
            </div>
          ))}
        </div>

        <div className="border border-white/10 bg-white/5 p-10 rounded-3xl max-w-3xl mx-auto relative overflow-hidden text-left backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
              <Terminal className="text-blue-400" size={32} />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">產權完全移交，原始碼 100% 交付</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
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

export function ExPortfolio() {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: 1,
      color: "bg-[#FFB1BA]",
      textColor: "text-pink-900",
      tagText: "上線 15%",
      title: "FinTech 財務儀表板",
      tech: "Next.js / Tailwind",
      desc: "企業級即時財務數據中心。我們透過客製化的圖表與模組化 UI 提升內部決策效率。圖中展示深色模式下的核心總覽面板，處理百萬級數據渲染依然順暢。",
    },
    {
      id: 2,
      color: "bg-[#98FB98]",
      textColor: "text-green-900",
      tagText: "互動 75%",
      title: "社群共創 APP",
      tech: "React Native",
      desc: "結合日曆與社交動態的跨平台應用程式。UI 介面會根據使用者的參與度與互動頻率，自動改變插圖與顏色風格，建立高黏著度的使用者體驗。",
    },
    {
      id: 3,
      color: "bg-[#FFDAB9]",
      textColor: "text-orange-900",
      tagText: "完成 100%",
      title: "全球電商前端重構",
      tech: "React / Redux",
      desc: "整合多國金流與物流追蹤的現代化電商介面。優化結帳流程與動態商品展示，大幅降低購物車放棄率，並支援多語系無縫切換。",
    },
    {
      id: 4,
      color: "bg-[#87CEEB]",
      textColor: "text-blue-900",
      tagText: "效能 100%",
      title: "數據監控系統",
      tech: "Vue.js / ECharts",
      desc: "為工廠打造的即時數據流監控面板。提供自定義警報與視覺化報表匯出功能。清爽的資訊層級設計，有效降低人員長時間監控的視覺疲勞。",
    },
  ];

  const alignOffset = "max(1.5rem, calc(50vw - 40rem + 1.5rem))";

  return (
    <section
      id="portfolio"
      className="py-32 bg-[#111111] text-white overflow-hidden border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center lg:text-left">Featured Projects</h2>
      </div>

      <div
        className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20"
        style={{ paddingLeft: alignOffset }}
      >
        {/* Left Side: Mobile Mockup */}
        <div className="w-full max-w-[320px] shrink-0 relative pr-6 lg:pr-0">
          <div className="relative aspect-[9/19.5] rounded-[3rem] border-[10px] border-[#1e1e1e] bg-[#0a0a0a] overflow-hidden shadow-2xl flex flex-col">
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
              <div className="w-28 h-full bg-[#1e1e1e] rounded-b-2xl" />
            </div>

            <div className="w-full flex-1 flex flex-col relative z-10 pt-10">
              <div className="flex items-center justify-between px-6 mb-4">
                <ChevronLeft size={24} className="text-gray-400" />
                <span className="text-sm font-semibold">{projects[activeIndex].title}</span>
                <MoreHorizontal size={24} className="text-gray-400" />
              </div>

              <div className="px-6 mb-2 flex items-center justify-between text-xs text-gray-500">
                <span>2026年 12月</span>
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span>紀錄</span>
                </div>
              </div>

              <motion.div
                key={`phone-card-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`mx-5 h-48 rounded-[20px] ${projects[activeIndex].color} shadow-lg relative p-4 flex flex-col`}
              >
                <div className="flex justify-between items-start mb-auto">
                  <span
                    className={`text-xs font-bold ${projects[activeIndex].textColor} bg-white/30 px-2 py-1 rounded-full backdrop-blur-sm`}
                  >
                    {projects[activeIndex].tagText}
                  </span>
                </div>
                <div className="flex justify-center items-end h-full gap-4 pb-2">
                  <div className="w-12 h-12 bg-black/80 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                  <div className="w-16 h-16 bg-black/80 rounded-[40%] flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </motion.div>

              <div className="flex-1 mt-6 px-5 pb-8 overflow-hidden flex flex-col">
                <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] text-gray-500">
                  <span>日</span>
                  <span>一</span>
                  <span>二</span>
                  <span>三</span>
                  <span>四</span>
                  <span>五</span>
                  <span>六</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5 flex-1 content-start">
                  {Array.from({ length: 35 }, (_, i) => i + 1).map((day) => (
                    <div
                      key={day}
                      className={`aspect-square rounded-lg flex items-center justify-center text-xs ${
                        [13, 14, 15, 21].includes(day)
                          ? "bg-white/20 text-white font-bold"
                          : "bg-white/5 text-gray-600"
                      }`}
                    >
                      {day <= 31 ? day : ""}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] blur-[80px] rounded-full -z-10 opacity-20 ${projects[activeIndex].color}`}
          />
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col w-full min-w-0">
          <div className="flex gap-4 overflow-x-auto pb-8 pt-4 snap-x hide-scrollbar pl-1 pr-6 lg:pr-12">
            {projects.map((p, i) => (
              <button
                type="button"
                key={p.id}
                onClick={() => setActiveIndex(i)}
                className={`relative w-[220px] h-[120px] shrink-0 rounded-2xl p-4 text-left transition-all duration-300 snap-center outline-none ${p.color} ${
                  activeIndex === i
                    ? "scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)] ring-2 ring-white z-10"
                    : "scale-95 opacity-40 hover:opacity-80 grayscale-[30%]"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`text-xs font-bold ${p.textColor} bg-white/30 px-2 py-0.5 rounded-full backdrop-blur-sm`}
                  >
                    {p.tagText}
                  </span>
                </div>
                <div className="absolute bottom-3 right-4 flex gap-2">
                  <div className="w-8 h-8 bg-black/80 rounded-full" />
                </div>
              </button>
            ))}
          </div>

          <div className="relative min-h-[150px] mt-4" style={{ paddingRight: alignOffset }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-gray-300 space-y-4 absolute inset-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">{projects[activeIndex].title}</h3>
                  <span className="text-xs font-mono px-2 py-1 bg-white/10 rounded-md text-gray-400">
                    {projects[activeIndex].tech}
                  </span>
                </div>
                <p className="leading-relaxed text-sm md:text-base">{projects[activeIndex].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
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
    <section className="py-32 bg-[#050505] text-white overflow-hidden flex flex-col items-center border-y border-white/5 relative">
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
    <section id="contact" className="py-32 relative bg-black text-white">
      <div className="absolute rounded-full blur-[120px] bg-purple-600 pointer-events-none w-[800px] h-[800px] top-0 right-0 opacity-10" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6">準備好開始您的專案了嗎？</h2>
        <p className="text-gray-400 text-lg mb-12">
          填寫簡短的需求表單，我們將在 24 小時內由資深技術經理與您聯繫，並提供初步報價區間。
        </p>

        <form className="border border-white/10 bg-[#111] p-8 rounded-3xl text-left space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="flex flex-col gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider"
              >
                姓名 / 聯絡人
                <input
                  id="contact-name"
                  type="text"
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-normal normal-case tracking-normal"
                  placeholder="John Doe"
                />
              </label>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="contact-email"
                className="flex flex-col gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider"
              >
                聯絡信箱
                <input
                  id="contact-email"
                  type="email"
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-normal normal-case tracking-normal"
                  placeholder="john@example.com"
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contact-type"
              className="flex flex-col gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider"
            >
              專案類型
              <select
                id="contact-type"
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none font-normal normal-case tracking-normal"
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
            className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-gray-200 transition-transform active:scale-[0.98]"
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
    <section className="py-24 relative bg-[#0a0a0a] overflow-hidden flex justify-center items-center min-h-[700px] border-t border-white/5 select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[150%] -rotate-[10deg] z-0 whitespace-nowrap opacity-60 mix-blend-screen pointer-events-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="text-[#E9FF42] font-display text-[80px] md:text-[120px] font-bold tracking-tight flex gap-8"
        >
          <span>NOVA TECH</span>
          <span>NOVA TECH</span>
          <span>NOVA TECH</span>
          <span>NOVA TECH</span>
        </motion.div>
      </div>

      <div className="relative w-full max-w-4xl h-[550px] flex justify-center items-center scale-75 sm:scale-90 md:scale-100">
        {/* Left Phone */}
        <motion.div
          initial={{ rotate: -12, x: -90, y: 20 }}
          animate={{ y: [20, 0, 20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-20 w-[270px] h-[550px] rounded-[45px] border-[12px] border-[#222] bg-[#DAB6FC] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col px-6 pt-4 pb-8 text-black"
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
          <span>NOVA TECH</span>
          <span>NOVA TECH</span>
          <span>NOVA TECH</span>
          <span>NOVA TECH</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export function ExFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#020202] pt-20 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-bold text-xl">
                N
              </div>
              <span className="font-display font-semibold tracking-wide text-xl">Nova Tech</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              專注於現代化技術的接案開發代理商。我們幫助企業與新創打造極具競爭力的數位產品。
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Web 應用開發
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  iOS/Android App
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  UI/UX 設計
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  關於我們
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
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
