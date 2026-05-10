import { useState } from "react";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { Marquee } from "./components/Marquee";

export function LandingPage() {
  const [lang, setLang] = useState<Lang>("zh");

  return (
    <div className="h-screen-safe overflow-hidden flex flex-col bg-background">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header lang={lang} onLangChange={setLang} />
      <main id="main-content" className="flex-1 flex flex-col min-h-0">
        <HeroSection lang={lang} />
        <Marquee />
      </main>
    </div>
  );
}
