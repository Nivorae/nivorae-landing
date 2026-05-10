import { useState } from "react";
import { cn } from "@/lib/utils";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";
import { teamI18n } from "./teamI18n";

const MEMBER_GRADIENTS = [
  "linear-gradient(155deg, #3c3c3c 0%, #1e1e1e 45%, #0a0a0a 100%)",
  "linear-gradient(175deg, #2a2a2a 0%, #131313 100%)",
  "linear-gradient(205deg, #343434 0%, #1a1a1a 55%, #0d0d0d 100%)",
];

const SPECIALTY_GRADIENTS = [
  "linear-gradient(175deg, #383838 0%, #111 100%)",
  "linear-gradient(175deg, #2e2e2e 0%, #0d0d0d 100%)",
  "linear-gradient(175deg, #404040 0%, #161616 100%)",
  "linear-gradient(175deg, #303030 0%, #0a0a0a 100%)",
];

export function TeamPage() {
  const [lang, setLang] = useState<Lang>("zh");
  const [activeItem, setActiveItem] = useState<number>(0);
  const [activeMember, setActiveMember] = useState<number>(0);
  const t = teamI18n[lang];

  // Tripled specialties with stable, index-free keys for seamless infinite scroll
  const currentSpecialties = t.team.members[activeMember].specialties;
  const carouselItems = [
    ...currentSpecialties.map((s, i) => ({
      id: `a${i}`,
      text: s,
      shade: i % SPECIALTY_GRADIENTS.length,
    })),
    ...currentSpecialties.map((s, i) => ({
      id: `b${i}`,
      text: s,
      shade: i % SPECIALTY_GRADIENTS.length,
    })),
    ...currentSpecialties.map((s, i) => ({
      id: `c${i}`,
      text: s,
      shade: i % SPECIALTY_GRADIENTS.length,
    })),
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header lang={lang} onLangChange={setLang} />

      {/* Hero */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden pt-16"
        style={{
          minHeight: "58vh",
          background: "radial-gradient(ellipse at 50% 55%, #2e2e2e 0%, #141414 40%, #000 80%)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[280, 380, 480, 600].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border border-white/[0.04]"
              style={{ width: size, height: size }}
            />
          ))}
        </div>
        <h1
          className="relative font-black text-white uppercase tracking-[0.08em] text-center"
          style={{ fontSize: "clamp(3rem, 11vw, 8.5rem)" }}
        >
          {t.hero.title}
        </h1>
      </section>

      {/* Services Accordion */}
      <section className="bg-black py-20 lg:py-28 px-6 lg:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-28">
          <div className="lg:pt-1">
            <h2
              className="font-black uppercase leading-tight text-white whitespace-pre-line"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.75rem)" }}
            >
              {t.services.heading}
            </h2>
          </div>
          <div>
            {t.services.items.map((item, idx) => (
              <div key={item.num}>
                <div className="h-px bg-white/15" />
                <button
                  type="button"
                  onClick={() => setActiveItem(activeItem === idx ? -1 : idx)}
                  className="w-full flex items-baseline gap-6 py-5 text-left hover:opacity-75 transition-opacity duration-200"
                >
                  <span className="text-white/35 text-sm font-mono w-6 shrink-0 tabular-nums">
                    {item.num}
                  </span>
                  <span className="text-white font-semibold text-lg">{item.title}</span>
                </button>
                {activeItem === idx && (
                  <p className="text-white/55 text-sm leading-relaxed pb-6 pl-12 pr-4">
                    {item.desc}
                  </p>
                )}
              </div>
            ))}
            <div className="h-px bg-white/15" />
          </div>
        </div>
      </section>

      {/* Professional Team */}
      <section className="bg-black py-12 lg:py-16">
        {/* Constrained: heading + member cards */}
        <div className="px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <h2
              className="font-black uppercase text-white mb-8 leading-none"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", letterSpacing: "-0.01em" }}
            >
              {t.team.heading}
            </h2>

            <div className="flex gap-1" style={{ height: 480 }}>
              {t.team.members.map((member, idx) => (
                <button
                  key={member.name}
                  type="button"
                  onClick={() => setActiveMember(idx)}
                  className={cn(
                    "relative overflow-hidden flex-shrink-0 text-left transition-all duration-500 ease-in-out",
                    idx === activeMember ? "flex-[3]" : "flex-1"
                  )}
                  style={{ background: MEMBER_GRADIENTS[idx] }}
                >
                  <div className="absolute bottom-5 left-5 right-3">
                    <p
                      className="text-white font-black uppercase leading-none whitespace-nowrap transition-all duration-500"
                      style={{
                        fontSize: idx === activeMember ? "clamp(2.5rem, 5.5vw, 5rem)" : "0.8rem",
                        letterSpacing: idx === activeMember ? "-0.02em" : "0.12em",
                      }}
                    >
                      {member.name}
                    </p>
                    {idx === activeMember && (
                      <p className="text-white/45 text-xs uppercase tracking-[0.2em] mt-2">
                        {member.role}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Specialty carousel — full viewport width, no padding */}
        {/* Card formula: width = (100vw - 48px) / 4, gap = 12px          */}
        {/* One loop (8 items) = 8 × 25vw = 200vw → keyframe to -200vw    */}
        {/* Edge slots show half a card; middle 3 slots are fully visible  */}
        <div className="mt-8 overflow-hidden w-full">
          <div
            key={activeMember}
            className="flex"
            style={{
              gap: "12px",
              animation: "nivorae-specialty-scroll 24s linear infinite",
              animationDelay: "-1.5s",
            }}
          >
            {carouselItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 flex flex-col justify-end overflow-hidden"
                style={{
                  width: "calc((100vw - 48px) / 4)",
                  height: "380px",
                  borderRadius: "calc((100vw - 48px) / 8)",
                  background: SPECIALTY_GRADIENTS[item.shade],
                }}
              >
                <p className="text-white font-bold text-center text-xs uppercase tracking-widest px-4 pb-7 leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-black border-t border-white/10 py-20 lg:py-28 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 lg:gap-24">
          <div>
            <h2
              className="font-black uppercase leading-tight text-white whitespace-pre-line"
              style={{ fontSize: "clamp(1.4rem, 2vw, 1.9rem)" }}
            >
              {t.grid.heading}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-10">
            {t.grid.items.map((item) => (
              <div key={item.title}>
                <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
