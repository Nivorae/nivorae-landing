import { useState } from "react";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { TestimonialsSection } from "./components/TestimonialsSection";

export function LandingPage() {
  const [lang, setLang] = useState<Lang>("zh");

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header lang={lang} onLangChange={setLang} />

      <section className="relative h-screen overflow-hidden snap-start bg-background">
        <video
          src="/videos/background_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <main id="main-content" className="relative h-full flex items-center justify-center">
          <HeroSection lang={lang} />
        </main>
      </section>

      <TestimonialsSection lang={lang} />
    </div>
  );
}
