import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const t = i18n[lang];
  const { pathname } = useLocation();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-fixed h-16 bg-background/10 backdrop-blur-sm">
        <div className="w-full h-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
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

          {/* Desktop nav — hidden below lg */}
          <nav className="hidden lg:flex items-center justify-center gap-8" aria-label="Navigation">
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

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle lang={lang} />

            {/* Desktop lang switcher — hidden below lg */}
            <span className="h-4 w-px bg-border select-none hidden lg:block" aria-hidden="true" />
            <div className="hidden lg:flex items-center gap-1 text-sm">
              {LANGS.map(({ code, label }, idx) => (
                <span key={code} className="flex items-center">
                  {idx > 0 && <span className="text-border select-none mx-0.5">|</span>}
                  <button
                    type="button"
                    onClick={() => onLangChange(code)}
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-colors",
                      lang === code && "font-semibold text-foreground"
                    )}
                  >
                    {label}
                  </button>
                </span>
              ))}
            </div>

            {/* Hamburger — visible below lg */}
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-9 h-9 text-foreground"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/tablet sheet — only rendered below lg */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-background border-l border-border flex flex-col pt-16 px-6 pb-8 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <nav className="flex flex-col gap-1 mt-6" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ key, href }) => (
                  <a
                    key={key}
                    href={href}
                    onClick={closeMenu}
                    className={cn(
                      "px-3 py-3 rounded-lg text-base font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors",
                      isActive(href) && "font-semibold text-foreground bg-muted"
                    )}
                  >
                    {t.nav[key]}
                  </a>
                ))}
              </nav>

              {/* Lang switcher at bottom of drawer */}
              <div className="mt-auto flex items-center gap-2 pt-6 border-t border-border">
                {LANGS.map(({ code, label }, idx) => (
                  <span key={code} className="flex items-center">
                    {idx > 0 && <span className="text-border select-none mx-1">|</span>}
                    <button
                      type="button"
                      onClick={() => onLangChange(code)}
                      className={cn(
                        "text-sm text-muted-foreground hover:text-foreground transition-colors px-1 py-0.5",
                        lang === code && "font-semibold text-foreground"
                      )}
                    >
                      {label}
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
