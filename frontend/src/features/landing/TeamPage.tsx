import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";
import { teamI18n } from "./teamI18n";

const MEMBER_PHOTOS = ["/Juliana.png", "/James.png", "/Max.png"];

const SPECIALTY_SURFACES = [
  "bg-muted text-foreground",
  "bg-accent text-accent-foreground",
  "bg-foreground text-background",
  "bg-accent text-accent-foreground",
];

const PHOTO_OVERLAY_STYLE = {
  background:
    "linear-gradient(to top, rgb(var(--team-overlay) / 0.82) 0%, rgb(var(--team-overlay) / 0.25) 55%, rgb(var(--team-overlay) / 0.08) 100%)",
};

export function TeamPage() {
  const [lang, setLang] = useState<Lang>("zh");
  const [activeMember, setActiveMember] = useState<number>(0);
  const t = teamI18n[lang];

  const currentSpecialties = t.team.members[activeMember].specialties;
  // Tripled for seamless infinite scroll — stable prefix keys prevent key collision across copies.
  const carouselItems = useMemo(
    () =>
      ["a", "b", "c"].flatMap((prefix) =>
        currentSpecialties.map((s, i) => ({
          id: `${prefix}${i}`,
          text: s,
          shade: i % SPECIALTY_SURFACES.length,
        }))
      ),
    [currentSpecialties]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header lang={lang} onLangChange={setLang} />

      {/* Hero */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden pt-16"
        style={{
          minHeight: "58vh",
          background:
            "radial-gradient(ellipse at 50% 55%, rgb(var(--card)) 0%, rgb(var(--background)) 70%)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[280, 380, 480, 600].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border border-border/60"
              style={{ width: size, height: size }}
            />
          ))}
        </div>
        <h1
          className="relative font-black text-foreground uppercase tracking-[0.08em] text-center"
          style={{ fontSize: "clamp(3rem, 11vw, 8.5rem)" }}
        >
          {t.hero.title}
        </h1>
      </section>

      {/* Professional Team */}
      <section className="bg-background py-12 lg:py-16">
        <div className="px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <h2
              className="font-black uppercase text-foreground mb-8 leading-none"
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
                  style={{
                    backgroundImage: `url(${MEMBER_PHOTOS[idx]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                  }}
                >
                  <div className="absolute inset-0" style={PHOTO_OVERLAY_STYLE} />
                  <div className="absolute bottom-5 left-5 right-3">
                    <p
                      className="text-background dark:text-foreground font-black uppercase leading-none whitespace-nowrap transition-all duration-500"
                      style={{
                        fontSize: idx === activeMember ? "clamp(2.5rem, 5.5vw, 5rem)" : "0.8rem",
                        letterSpacing: idx === activeMember ? "-0.02em" : "0.12em",
                      }}
                    >
                      {member.name}
                    </p>
                    {idx === activeMember && (
                      <p className="text-accent-foreground bg-accent inline-block px-2 py-0.5 text-xs uppercase tracking-[0.2em] mt-2 rounded-sm">
                        {member.role}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

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
                className={cn(
                  "flex-shrink-0 flex flex-col justify-end overflow-hidden",
                  SPECIALTY_SURFACES[item.shade]
                )}
                style={{
                  width: "calc((100vw - 48px) / 4)",
                  height: "380px",
                  borderRadius: "calc((100vw - 48px) / 8)",
                }}
              >
                <p className="font-bold text-center text-xs uppercase tracking-widest px-4 pb-7 leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
