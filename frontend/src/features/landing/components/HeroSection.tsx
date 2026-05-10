import { type Lang, i18n } from "../i18n";

interface HeroSectionProps {
  lang: Lang;
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = i18n[lang];

  return (
    <section className="flex flex-col items-center justify-center px-6 text-center">
      <h1
        className="font-bold text-white text-balance tracking-tight leading-none mb-6"
        style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
      >
        {t.hero.name}
      </h1>

      <p
        className="font-semibold text-white/90 text-balance mb-4"
        style={{ fontSize: "clamp(1.25rem, 3vw, 2.25rem)" }}
      >
        {t.hero.tagline}
      </p>

      <p
        className="text-white/70 mx-auto max-w-xl text-pretty"
        style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.125rem)" }}
      >
        {t.hero.desc}
      </p>
    </section>
  );
}
