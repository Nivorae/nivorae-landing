import { ChevronDown } from "lucide-react";
import { type Lang, i18n } from "../i18n";

interface HeroSectionProps {
  lang: Lang;
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = i18n[lang];

  return (
    <section className="min-h-screen-safe flex flex-col pt-16">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <p className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-label-lg font-medium mb-8 border border-primary/20">
            {t.hero.badge}
          </p>

          <h1 className="text-fluid-display-xl font-semibold text-foreground text-balance mb-4 tracking-tight">
            {t.hero.name}
          </h1>

          <p className="text-fluid-display-md font-medium text-primary mb-6 text-balance">
            {t.hero.tagline}
          </p>

          <p className="text-body-lg text-muted-foreground mx-auto max-w-2xl text-pretty">
            {t.hero.desc}
          </p>
        </div>
      </div>

      <div className="flex justify-center pb-10">
        <button
          type="button"
          onClick={() => document.getElementById("marquee")?.scrollIntoView({ behavior: "smooth" })}
          aria-label={t.hero.scrollHint}
          className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-fast"
        >
          <span className="text-label-lg">{t.hero.scrollHint}</span>
          <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
