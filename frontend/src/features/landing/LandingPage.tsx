import { useState } from "react";
import { type Lang } from "./i18n";
import { useTheme } from "@/core/theme/useTheme";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import {
  ExHero,
  ExProcess,
  ExPortfolio,
  ExTestimonials,
  ExContact,
  ExAppShowcase,
  ExFooter,
} from "./components/ExampleSections";

const VIDEO_DARK = "http://8.209.221.1:32721/nivorae/video/background_video.mp4";
const VIDEO_LIGHT = "http://8.209.221.1:32721/nivorae/video/background_video_white.mp4";

export function LandingPage() {
  const [lang, setLang] = useState<Lang>("zh");
  const { resolvedTheme } = useTheme();

  return (
    <>
      <div className="relative h-screen-safe overflow-hidden bg-background">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <video
          src={resolvedTheme === "dark" ? VIDEO_DARK : VIDEO_LIGHT}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 hidden dark:block dark:bg-black/70" />

        <Header lang={lang} onLangChange={setLang} />

        <main id="main-content" className="relative h-full flex items-center justify-center">
          <HeroSection lang={lang} />
        </main>
      </div>

      <ExHero lang={lang} />
      <ExProcess lang={lang} />
      <ExPortfolio lang={lang} />
      <ExTestimonials lang={lang} />
      <ExContact lang={lang} />
      <ExAppShowcase />
      <ExFooter lang={lang} />
    </>
  );
}
