import { useState } from "react";
import { type Lang, i18n } from "../i18n";

interface TestimonialsSectionProps {
  lang: Lang;
}

const CARD_COLORS = ["#F4845F", "#FBBF24", "#34D399", "#60A5FA", "#C084FC"];
const AVATAR_COLORS = ["#C2410C", "#B45309", "#059669", "#1D4ED8", "#7C3AED"];
const CARD_W = 320;
const CARD_H = 200;
const OFFSET_X = 82;
const OFFSET_Y = 64;

export function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { testimonials } = i18n[lang];
  const { items } = testimonials;
  const n = items.length;

  const stackW = CARD_W + (n - 1) * OFFSET_X;
  const stackH = CARD_H + (n - 1) * OFFSET_Y;

  return (
    <section className="relative h-screen snap-start bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />

      <div className="absolute top-20 left-12 z-10 pointer-events-none">
        <p className="text-white/30 text-xs tracking-[0.35em] uppercase mb-3">
          {testimonials.subtitle}
        </p>
        <h2
          className="text-white font-bold leading-tight"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
        >
          {testimonials.title}
        </h2>
      </div>

      {/*
        Perspective origin at upper-center so the "table horizon" sits high —
        front card appears lower-left, back cards recede to upper-right.
        rotateX(52deg): strong table-tilt, no rotateY to keep all cards face-on.
        preserve-3d: lets CSS sort children by their real Z in 3D space so
        card 0 (bottom of container = nearest after rotateX) appears on top.
      */}
      <div
        className="absolute inset-0 flex items-end justify-center"
        style={{ paddingBottom: "8vh" }}
      >
        <div
          style={{
            perspective: "1100px",
            perspectiveOrigin: "50% 0%",
          }}
        >
          <div
            style={{
              transform: "rotateX(52deg)",
              transformStyle: "preserve-3d",
              position: "relative",
              width: `${stackW}px`,
              height: `${stackH}px`,
            }}
          >
            {items.map((item, i) => {
              const isHovered = hoveredIndex === i;
              return (
                <div
                  key={item.name}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    position: "absolute",
                    width: CARD_W,
                    height: CARD_H,
                    /* card 0 at bottom (large top) = nearest to viewer after rotateX;
                       card n-1 at top (small top) = farthest */
                    left: i * OFFSET_X,
                    top: (n - 1 - i) * OFFSET_Y,
                    backgroundColor: CARD_COLORS[i % CARD_COLORS.length],
                    borderRadius: 24,
                    padding: "22px 24px",
                    cursor: "pointer",
                    /* translateZ lifts card toward viewer — spring gives the
                       "being pulled out of the deck" snap */
                    transform: isHovered ? "translateZ(240px)" : "translateZ(0)",
                    transition:
                      "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease",
                    boxShadow: isHovered
                      ? "0 48px 96px rgba(0,0,0,0.7)"
                      : "0 6px 24px rgba(0,0,0,0.45)",
                    willChange: isHovered ? "transform" : "auto",
                  }}
                >
                  <p
                    className="text-zinc-900 font-medium leading-relaxed"
                    style={{
                      fontSize: 13,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.quote}
                  </p>

                  <div
                    style={{
                      position: "absolute",
                      bottom: 18,
                      left: 24,
                      right: 24,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p className="text-zinc-900 font-bold text-sm">{item.name}</p>
                      <p className="text-zinc-700 text-xs mt-0.5">{item.title}</p>
                    </div>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        flexShrink: 0,
                        backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
