import { useState } from "react";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";

export function LandingPage() {
  const [lang, setLang] = useState<Lang>("zh");

  return (
    <div className="relative h-screen-safe overflow-hidden bg-background">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <video
        src="/videos/background_video.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />

      <Header lang={lang} onLangChange={setLang} />

      <main id="main-content" className="relative h-full flex items-center justify-center">
        <HeroSection lang={lang} />
      </main>
    </div>
  );
}
