import { useLocation } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { type Lang, i18n } from "../i18n";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

const NAV_LINKS = [
  { key: "home" as const, href: "/" },
  { key: "plans" as const, href: "/plans" },
  { key: "team" as const, href: "/team" },
  { key: "qa" as const, href: "/qa" },
] as const;

const LANGS = [
  { code: "zh" as const, label: "中" },
  { code: "en" as const, label: "En" },
] as const;

export function Header({ lang, onLangChange }: HeaderProps) {
  const t = i18n[lang];
  const { pathname } = useLocation();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed top-0 inset-x-0 z-fixed h-16 bg-background/10 backdrop-blur-sm">
      <div className="w-full h-full px-6 lg:px-12 grid grid-cols-3 items-center">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/favicon.ico"
            alt="Nivorae"
            width={20}
            height={20}
            className="h-5 w-auto object-contain"
          />
          <span className="font-bold">Nivorae</span>
        </a>

        <nav className="flex items-center justify-center gap-8" aria-label="Navigation">
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className={cn(
                "text-body font-medium text-foreground/70 hover:text-primary transition-colors duration-fast",
                isActive(href) &&
                  "font-semibold text-foreground border-b-2 border-foreground pb-0.5 hover:text-foreground"
              )}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <ThemeToggle lang={lang} />
          <span className="h-4 w-px bg-border select-none" aria-hidden="true" />
          <div className="flex items-center gap-1 text-sm">
            {LANGS.map(({ code, label }, idx) => (
              <>
                {idx > 0 && (
                  <span key={`sep-${code}`} className="text-border select-none mx-0.5">
                    |
                  </span>
                )}
                <button
                  key={code}
                  type="button"
                  onClick={() => onLangChange(code)}
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    lang === code && "font-semibold text-foreground"
                  )}
                >
                  {label}
                </button>
              </>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
