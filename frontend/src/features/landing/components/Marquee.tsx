import { useEffect, useRef } from "react";
import { useShouldAnimate } from "@/core/a11y/useAnimationHydration";

const BLOCKS = [
  { id: "navy-blue", from: "#1a1f6e", to: "#2c3fcd" },
  { id: "midnight", from: "#0f3460", to: "#533483" },
  { id: "violet", from: "#4776e6", to: "#8e54e9" },
  { id: "teal", from: "#134e5e", to: "#71b280" },
  { id: "periwinkle", from: "#6a82fb", to: "#4458d4" },
  { id: "rose", from: "#c94b4b", to: "#4b134f" },
  { id: "ocean", from: "#0d1b2a", to: "#1b4f8a" },
  { id: "sunset", from: "#f7971e", to: "#ffd200" },
  { id: "forest", from: "#1a2a1a", to: "#2d6a2d" },
  { id: "dusk", from: "#2c3e50", to: "#4ca1af" },
  { id: "plum", from: "#4a0072", to: "#9c27b0" },
  { id: "steel", from: "#485563", to: "#29323c" },
];

const CARD_W = 148;
const CARD_H = 210;
const GAP = 16;
const STRIDE = CARD_W + GAP;
const VIRTUAL_R = 350;
const SPEED = 1.2;

const ITEMS = [
  ...BLOCKS.map((b) => ({ ...b, uid: `a-${b.id}` })),
  ...BLOCKS.map((b) => ({ ...b, uid: `b-${b.id}` })),
];
const LOOP_LEN = BLOCKS.length * STRIDE;

export function Marquee() {
  const shouldAnimate = useShouldAnimate();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const widthRef = useRef(0);

  useEffect(() => {
    if (!shouldAnimate) return () => {};
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return () => {};

    const ro = new ResizeObserver(([entry]) => {
      widthRef.current = entry.contentRect.width;
    });
    ro.observe(wrap);
    widthRef.current = wrap.getBoundingClientRect().width;

    const trackEl: HTMLElement = track;
    const cards = Array.from(trackEl.children) as HTMLElement[];

    function tick() {
      offsetRef.current += SPEED;
      if (offsetRef.current >= LOOP_LEN) offsetRef.current -= LOOP_LEN;

      const centerX = widthRef.current / 2;
      trackEl.style.transform = `translateX(${-offsetRef.current}px)`;

      for (let i = 0; i < cards.length; i += 1) {
        const el = cards[i];
        const cardCenterX = -offsetRef.current + i * STRIDE + CARD_W / 2;
        const dx = cardCenterX - centerX;
        const angleRad = Math.atan2(dx, VIRTUAL_R);
        const angleDeg = -(angleRad * 180) / Math.PI;
        const z = VIRTUAL_R * (1 - Math.cos(angleRad));
        el.style.transform = `rotateY(${angleDeg}deg) translateZ(${z}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [shouldAnimate]);

  return (
    <div
      ref={wrapRef}
      className="w-full overflow-hidden border-t border-border/60 py-8"
      style={{
        perspective: `${VIRTUAL_R * 2}px`,
        perspectiveOrigin: "50% 50%",
      }}
      aria-hidden="true"
    >
      <div style={{ position: "relative", height: `${CARD_H}px` }}>
        <div
          ref={trackRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            display: "flex",
            gap: `${GAP}px`,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {ITEMS.map((block) => (
            <div
              key={block.uid}
              style={{
                flexShrink: 0,
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                background: `linear-gradient(160deg, ${block.from} 0%, ${block.to} 100%)`,
                borderRadius: "1rem",
                backfaceVisibility: "hidden",
                willChange: "transform",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
