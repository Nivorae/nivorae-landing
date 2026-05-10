import { useState } from "react";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { Marquee } from "./components/Marquee";

export function LandingPage() {
  const [lang, setLang] = useState<Lang>("zh");

  return (
    <div className="min-h-screen-safe bg-background">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header lang={lang} onLangChange={setLang} />
      <main id="main-content">
        <HeroSection lang={lang} />
        <Marquee />
      </main>
    </div>
  );
}
