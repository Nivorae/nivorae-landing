import { type Lang, i18n } from "../i18n";

interface HeroSectionProps {
  lang: Lang;
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = i18n[lang];

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 pb-4">
      <h1
        className="font-bold text-foreground text-center text-balance mb-5 tracking-tight leading-none"
        style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
      >
        {t.hero.name}
      </h1>

      <p
        className="font-semibold text-foreground/80 text-center text-balance mb-5"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
      >
        {t.hero.tagline}
      </p>

      <p className="text-body-lg text-muted-foreground text-center mx-auto max-w-xl text-pretty">
        {t.hero.desc}
      </p>
    </section>
  );
}
