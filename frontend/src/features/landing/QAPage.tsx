import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Clock,
  Code2,
  CreditCard,
  GitBranch,
  Globe,
  Palette,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";
import qaDataRaw from "./qaData.json";

type LucideIcon = ComponentType<LucideProps>;

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  Clock,
  CreditCard,
  GitBranch,
  Wrench,
  Code2,
  Palette,
  ShieldCheck,
};

const HERO_GRADIENT = {
  background:
    "radial-gradient(ellipse at 50% 55%, oklch(var(--card)) 0%, oklch(var(--background)) 70%)",
};

// Subtle fade at both edges to visually hint infinite scroll
const SCROLL_MASK = {
  maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
};

// Fixed item dimensions — must match the button's rendered height
const ITEM_H = 44; // px  (py-3 ≈ 24px padding + ~20px line-height)
const GAP = 10; // px  (gap-2.5)
const STRIDE = ITEM_H + GAP; // 54px per slot

const ROTATION_MS = 3500;

type QaData = typeof qaDataRaw;
const qaData = qaDataRaw as QaData;

export function QAPage() {
  const [lang, setLang] = useState<Lang>("zh");
  const t = qaData[lang];
  const [activeId, setActiveId] = useState<string>(t.items[0].id);
  const [isHovered, setIsHovered] = useState(false);
  const [rotationKey, setRotationKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Stable refs so effects never go stale
  const itemsRef = useRef(t.items);
  itemsRef.current = t.items;
  const setHRef = useRef(t.items.length * STRIDE);
  setHRef.current = t.items.length * STRIDE;

  const n = t.items.length;
  const SET_H = n * STRIDE; // virtual height of one copy (trailing gap slot included)
  const VISIBLE_H = n * ITEM_H + (n - 1) * GAP; // exact pixel height of N items + gaps

  const activeIdx = t.items.findIndex((i) => i.id === activeId);
  const activeItem = t.items[activeIdx >= 0 ? activeIdx : 0];
  const CardIcon = ICON_MAP[activeItem.icon];

  // Tripled array for seamless looping
  const loopItems = useMemo(() => [...t.items, ...t.items, ...t.items], [t.items]);

  // On mount and lang change: anchor scroll to start of middle copy
  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = SET_H;
  }, [lang, SET_H]);

  // Keep scrollTop inside [SET_H, SET_H*2) — fired by onScroll during manual user scroll
  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop < SET_H) {
      el.scrollTop += SET_H;
    } else if (el.scrollTop >= SET_H * 2) {
      el.scrollTop -= SET_H;
    }
  }

  // Scroll to the nearest copy of `idx` (avoids long backward jumps when user has scrolled far)
  function scrollToNearest(idx: number, smooth = true) {
    const el = scrollRef.current;
    if (!el) return;
    const cur = el.scrollTop;
    const candidates = [idx * STRIDE, SET_H + idx * STRIDE, SET_H * 2 + idx * STRIDE];
    const nearest = candidates.reduce((a, b) => (Math.abs(a - cur) < Math.abs(b - cur) ? a : b));
    el.scrollTo({ top: nearest, behavior: smooth ? "smooth" : "instant" });
  }

  // Auto-rotate: preemptively reset boundary before smooth-scrolling to avoid visual jumps
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (!isHovered) {
      interval = setInterval(() => {
        const el = scrollRef.current;
        const currentSetH = setHRef.current;
        if (el) {
          let cur = el.scrollTop;
          // Instant-reset if we're about to cross into the third copy
          if (cur + STRIDE >= currentSetH * 2) {
            el.scrollTop = cur - currentSetH;
            cur = el.scrollTop;
          }
          el.scrollTo({ top: cur + STRIDE, behavior: "smooth" });
        }
        setActiveId((prev) => {
          const items = itemsRef.current;
          const idx = items.findIndex((i) => i.id === prev);
          return items[(idx + 1) % items.length].id;
        });
      }, ROTATION_MS);
    }
    return () => clearInterval(interval);
  }, [isHovered, lang, rotationKey]);

  function handleSelect(id: string) {
    const idx = t.items.findIndex((i) => i.id === id);
    setActiveId(id);
    scrollToNearest(idx, true);
    setRotationKey((k) => k + 1);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header lang={lang} onLangChange={setLang} />

      {/* Hero */}
      <section
        className="relative w-full flex flex-col items-center justify-center overflow-hidden pt-16"
        style={{ minHeight: "52vh", ...HERO_GRADIENT }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[260, 360, 460, 580].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border border-foreground/20"
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        <p className="relative font-mono text-[0.7rem] tracking-[0.28em] uppercase text-muted-foreground mb-4">
          {t.heroEyebrow}
        </p>
        <h1
          className="relative font-black text-foreground uppercase tracking-[0.06em] text-center"
          style={{ fontSize: "clamp(3rem, 11vw, 8rem)" }}
        >
          {t.heroTitle}
        </h1>
        <p
          className="relative text-muted-foreground text-center mt-5 max-w-lg px-6"
          style={{ fontSize: "clamp(0.875rem, 1.4vw, 1.05rem)" }}
        >
          {t.heroSubtitle}
        </p>
      </section>

      {/* QA Section */}
      <section
        className="bg-background border-t border-border py-20 lg:py-28 px-6 lg:px-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-black uppercase text-foreground mb-12 leading-none"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)", letterSpacing: "-0.01em" }}
          >
            {t.sectionHeading}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: infinite-loop wheel */}
            <div style={{ height: VISIBLE_H }}>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                style={{
                  height: "100%",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  ...SCROLL_MASK,
                }}
              >
                <div className="flex flex-col gap-2.5">
                  {loopItems.map((item, i) => {
                    const ItemIcon = ICON_MAP[item.icon];
                    const isActive = item.id === activeId;
                    const copyIdx = Math.floor(i / n);
                    return (
                      <button
                        key={`${copyIdx}-${item.id}`}
                        type="button"
                        style={{ height: ITEM_H, flexShrink: 0 }}
                        onClick={() => handleSelect(item.id)}
                        className={cn(
                          "flex items-center gap-3 px-5 rounded-full text-sm font-medium text-left transition-all duration-300 w-full cursor-pointer",
                          isActive
                            ? "bg-accent text-accent-foreground shadow-md scale-[1.03]"
                            : "bg-secondary/70 text-foreground/60 hover:bg-secondary hover:text-foreground hover:scale-[1.01]"
                        )}
                      >
                        {ItemIcon && <ItemIcon size={15} className="shrink-0 opacity-90" />}
                        <span className="truncate">{item.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: stacked card deck */}
            <div className="relative">
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
                  className="rounded-3xl border border-border bg-secondary p-8 lg:p-10"
                  style={{
                    boxShadow:
                      "0 8px 28px -6px oklch(var(--foreground) / 0.14), 0 2px 8px -4px oklch(var(--foreground) / 0.08)",
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-7">
                    <span className="flex items-center gap-2 bg-foreground/[0.07] text-foreground/70 px-3.5 py-1.5 rounded-full text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
