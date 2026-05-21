import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";
import { ExFooter } from "./components/ExampleSections";
import { PageHero } from "./components/PageHero";
import { ICON_MAP } from "./iconMap";
import qaDataRaw from "./qaData.json";

const ITEM_H = 56; // px per roll slot
const WRAP_H = 320; // px — visible window height
const ROTATION_MS = 3500;

// Per-distance visual config for the paper-roll wheel
const DIST_CFG = [
  { fontSize: "22px", fontWeight: 700, opacity: 1, letterSpacing: "-0.022em", dotSize: 10 },
  { fontSize: "16px", fontWeight: 400, opacity: 0.35, letterSpacing: "-0.01em", dotSize: 6 },
  { fontSize: "14px", fontWeight: 400, opacity: 0.18, letterSpacing: "0", dotSize: 5 },
  { fontSize: "13px", fontWeight: 400, opacity: 0.09, letterSpacing: "0", dotSize: 4 },
  { fontSize: "12px", fontWeight: 400, opacity: 0.04, letterSpacing: "0", dotSize: 3 },
] as const;

const ITEM_TRANS =
  "opacity 0.42s cubic-bezier(0.16,1,0.3,1), transform 0.42s cubic-bezier(0.16,1,0.3,1)";
const TEXT_TRANS =
  "font-size 0.42s cubic-bezier(0.16,1,0.3,1), letter-spacing 0.42s cubic-bezier(0.16,1,0.3,1)";
const DOT_TRANS = "all 0.42s cubic-bezier(0.16,1,0.3,1)";
const TRACK_TRANS = "transform 0.55s cubic-bezier(0.16,1,0.3,1)";

const ROLL_MASK = {
  maskImage:
    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.45) 18%, black 32%, black 68%, rgba(0,0,0,0.45) 82%, rgba(0,0,0,0.08) 92%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.45) 18%, black 32%, black 68%, rgba(0,0,0,0.45) 82%, rgba(0,0,0,0.08) 92%, transparent 100%)",
};

type QaData = typeof qaDataRaw;
const qaData = qaDataRaw as QaData;

export function QAPage() {
  const [lang, setLang] = useState<Lang>("zh");
  const t = qaData[lang];
  const [activeId, setActiveId] = useState<string>(t.items[0].id);
  const [isHovered, setIsHovered] = useState(false);
  const [rotationKey, setRotationKey] = useState(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const itemsRef = useRef(t.items);
  itemsRef.current = t.items;

  const n = t.items.length;
  const [vActive, setVActive] = useState<number>(n); // start at middle copy, first item
  const vActiveRef = useRef(n);
  vActiveRef.current = vActive;
  const smoothRef = useRef(false); // whether next setVActive should animate

  const activeIdx = t.items.findIndex((i) => i.id === activeId);
  const activeItem = t.items[activeIdx >= 0 ? activeIdx : 0];
  const CardIcon = ICON_MAP[activeItem.icon];

  const loopItems = useMemo(() => [...t.items, ...t.items, ...t.items], [t.items]);

  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: card column drifts up as section scrolls through viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const cardColY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  // Reset wheel position on lang change
  useLayoutEffect(() => {
    smoothRef.current = false;
    setVActive(n);
    setActiveId(t.items[0].id);
    // Intentionally excludes t.items — only reset on lang change, not on item content updates
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Apply translateY; clamp to middle copy after smooth animation
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (el) {
      const doSmooth = smoothRef.current;
      smoothRef.current = false;
      el.style.transition = doSmooth ? TRACK_TRANS : "none";
      el.style.transform = `translateY(${WRAP_H / 2 - (vActive * ITEM_H + ITEM_H / 2)}px)`;
      if (doSmooth) {
        const timer = setTimeout(() => {
          const cur = vActiveRef.current;
          if (cur < n || cur >= n * 2) {
            const equiv = (((cur % n) + n) % n) + n;
            smoothRef.current = false;
            setVActive(equiv);
          }
        }, 600);
        return () => clearTimeout(timer);
      }
    }
    return undefined;
  }, [vActive, n]);

  // Auto-rotate
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        const nextV = vActiveRef.current + 1;
        const realIdx = ((nextV % n) + n) % n;
        setActiveId(itemsRef.current[realIdx].id);
        smoothRef.current = true;
        setVActive(nextV);
      }, ROTATION_MS);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isHovered, lang, rotationKey, n]);

  function handleSelect(loopIdx: number) {
    const realIdx = loopIdx % n;
    setActiveId(t.items[realIdx].id);
    smoothRef.current = true;
    setVActive(loopIdx);
    setRotationKey((k) => k + 1);
    setIsHovered(true);
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsHovered(false), 8000);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header lang={lang} onLangChange={setLang} />

      <PageHero title={t.heroTitle} eyebrow={t.heroEyebrow} subtitle={t.heroSubtitle} />

      {/* QA Section */}
      <section
        ref={sectionRef}
        className="relative bg-background border-t border-border py-28 lg:py-44 px-6 lg:px-16 overflow-hidden"
        onMouseEnter={() => {
          clearTimeout(resumeTimerRef.current);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          clearTimeout(resumeTimerRef.current);
          setIsHovered(false);
        }}
      >
        {/* Ambient radial wash — accent tint from left-center */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 18% 55%, oklch(var(--accent) / 0.045), transparent 65%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Editorial display heading with viewport-triggered reveal */}
          <motion.h2
            className="font-black uppercase text-foreground leading-[0.9] mb-16 lg:mb-20 text-section-h2"
            style={{ letterSpacing: "-0.01em" }}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.sectionHeading}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left: infinite paper-roll wheel — stagger in from left */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ height: WRAP_H, overflow: "hidden", ...ROLL_MASK }}>
                <div
                  ref={trackRef}
                  style={{ display: "flex", flexDirection: "column", willChange: "transform" }}
                >
                  {loopItems.map((item, i) => {
                    const dist = Math.min(Math.abs(i - vActive), DIST_CFG.length - 1);
                    const cfg = DIST_CFG[dist];
                    return (
                      <button
                        key={`${Math.floor(i / n)}-${item.id}`}
                        type="button"
                        onClick={() => handleSelect(i)}
                        style={{
                          height: ITEM_H,
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 12,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "0 8px",
                          opacity: cfg.opacity,
                          transition: ITEM_TRANS,
                        }}
                      >
                        <span
                          style={{
                            width: cfg.dotSize,
                            height: cfg.dotSize,
                            borderRadius: "50%",
                            backgroundColor: "currentColor",
                            flexShrink: 0,
                            transition: DOT_TRANS,
                          }}
                        />
                        <span
                          style={{
                            fontSize: cfg.fontSize,
                            fontWeight: cfg.fontWeight,
                            letterSpacing: cfg.letterSpacing,
                            transition: TEXT_TRANS,
                          }}
                        >
                          {item.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right: stacked card deck — stagger in from right + parallax drift */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: cardColY }}
            >
              {/* Ghost card — furthest back */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none border border-foreground/[0.1] bg-foreground/[0.04]"
                style={{ transform: "rotate(2.6deg) translate(6px, 11px)", zIndex: 1 }}
              />
              {/* Ghost card — middle */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none border border-foreground/[0.14] bg-foreground/[0.06]"
                style={{ transform: "rotate(-1.6deg) translate(-3px, 6px)", zIndex: 2 }}
              />
              {/* Active card — front, animates in from deck */}
              <div
                key={activeId}
                className="relative animate-[qa-card-from-deck_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
                style={{ zIndex: 3 }}
              >
                <div
                  className="rounded-3xl border border-border bg-secondary dark:bg-foreground/[0.10] p-8 lg:p-10"
                  style={{
                    boxShadow:
                      "0 8px 28px -6px oklch(var(--foreground) / 0.14), 0 2px 8px -4px oklch(var(--foreground) / 0.08)",
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-7">
                    <span className="flex items-center gap-2 bg-foreground/[0.07] dark:bg-foreground/[0.15] text-foreground/70 px-3.5 py-1.5 rounded-full text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
                      {CardIcon && <CardIcon size={12} />}
                      {activeItem.tag}
                    </span>
                    <span className="font-mono text-[0.7rem] text-muted-foreground tabular-nums">
                      {String(activeIdx + 1).padStart(2, "0")}&nbsp;/&nbsp;
                      {String(t.items.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Question */}
                  <h3
                    className="font-black text-foreground leading-snug mb-6"
                    style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.9rem)" }}
                  >
                    {activeItem.question}
                  </h3>

                  <div className="h-px bg-border mb-6" />

                  {/* Answer */}
                  <p
                    className="text-muted-foreground leading-relaxed"
                    style={{ fontSize: "clamp(0.875rem, 1.15vw, 1.025rem)" }}
                  >
                    {activeItem.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ExFooter lang={lang} />
    </div>
  );
}
