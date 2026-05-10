import { useEffect, useRef, useState } from "react";

const BLOCKS = [
  { id: "navy-blue", from: "#1a1f6e", to: "#2c3fcd" },
  { id: "midnight", from: "#0f3460", to: "#533483" },
  { id: "violet", from: "#4776e6", to: "#8e54e9" },
  { id: "teal", from: "#134e5e", to: "#71b280" },
  { id: "periwinkle", from: "#6a82fb", to: "#4458d4" },
];

const CENTER = 2;

export function Marquee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return () => {};
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    setSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  const cardH = size.h > 0 ? Math.round(size.h * 0.84) : 0;
  const cardW = cardH > 0 ? Math.round(cardH / 1.55) : 0;
  const step = size.w * 0.205;

  return (
    <div
      ref={wrapRef}
      className="flex-1 w-full overflow-hidden border-t border-border/60 flex items-center"
      style={{ perspective: "1200px" }}
      aria-hidden="true"
    >
      {cardW > 0 && (
        <div
          style={{
            position: "relative",
            height: `${cardH}px`,
            width: "100%",
            transformStyle: "preserve-3d",
          }}
        >
          {BLOCKS.map((block, idx) => {
            const slot = idx - CENTER;
            const absSlot = Math.abs(slot);
            const x = slot * step;
            const rotateY = slot * -22;
            const z = -absSlot * 55;
            const scale = 1 - absSlot * 0.12;
            const opacity = 1 - absSlot * 0.18;

            return (
              <div
                key={block.id}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: `${cardW}px`,
                  height: `${cardH}px`,
                  marginLeft: `-${cardW / 2}px`,
                  marginTop: `-${cardH / 2}px`,
                  background: `linear-gradient(160deg, ${block.from} 0%, ${block.to} 100%)`,
                  borderRadius: "1.5rem",
                  transform: `translateX(${x}px) rotateY(${rotateY}deg) translateZ(${z}px) scale(${scale})`,
                  opacity,
                  zIndex: 3 - absSlot,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
