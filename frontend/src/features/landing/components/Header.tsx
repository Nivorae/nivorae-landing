import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { type Lang, i18n } from "../i18n";

interface HeaderProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

const LANGS: Lang[] = ["zh", "en"];

export function Header({ lang, onLangChange }: HeaderProps) {
  const t = i18n[lang];

  return (
    <header className="fixed top-0 inset-x-0 z-fixed h-16 bg-background/80 backdrop-blur-md">
      <div className="w-full h-full px-6 lg:px-12 grid grid-cols-3 items-center">
        <a href="/" className="flex items-center gap-3">
          <img src="/favicon.ico" alt="Nivorae" className="h-9 w-auto object-contain" />
        </a>

        <nav className="flex items-center justify-center gap-8" aria-label="Navigation">
          <a
            href="/#plans"
            className="text-body font-medium text-foreground/70 hover:text-primary transition-colors duration-fast"
          >
            {t.nav.plans}
          </a>
          <a
            href="/team"
            className="text-body font-medium text-foreground/70 hover:text-primary transition-colors duration-fast"
          >
            {t.nav.team}
          </a>
        </nav>

        <div
          className="flex items-center justify-end gap-1"
          role="group"
          aria-label="Language selection"
        >
          {LANGS.map((code, idx) => (
            <Fragment key={code}>
              {idx > 0 && <span className="text-border select-none text-sm px-0.5">|</span>}
              <button
                type="button"
                onClick={() => onLangChange(code)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-label-lg transition-all duration-fast",
                  lang === code
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {t.lang[code]}
              </button>
            </Fragment>
          ))}
        </div>
      </div>
    </header>
  );
}
