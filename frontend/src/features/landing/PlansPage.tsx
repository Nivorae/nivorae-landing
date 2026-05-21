import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";
import { ExFooter } from "./components/ExampleSections";
import { teamI18n } from "./teamI18n";

const stepContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22, delayChildren: 0.06 } },
};

const stepRowVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 60, damping: 18 },
  },
};

const whyContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.04 } },
};

// Flip to true once pricing is confirmed and ready to publish
const SHOW_PRICING = false;

// Replace with the real form URL once the partnership intake form is live
const PARTNERSHIP_CTA_TO = { pathname: "/", hash: "#contact" } as const;

export function PlansPage() {
  const [lang, setLang] = useState<Lang>("zh");
  const t = teamI18n[lang];
  const timelineRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const partnershipRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-60px" });
  const partnershipInView = useInView(partnershipRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header lang={lang} onLangChange={setLang} />

      {/* Plans Hero */}
      <section className="bg-background py-20 lg:py-32 px-6 lg:px-16 border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <div>
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-6 block">
              {t.plansHero.badge}
            </span>
            <h1
              className="font-black leading-tight text-foreground whitespace-pre-line mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              {t.plansHero.title}
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md">
              {t.plansHero.desc}
            </p>
          </div>

          {/* Right: floating full lockup — icon stacked above wordmark */}
          <div className="flex items-center justify-center">
            <div className="relative flex flex-col items-center gap-5 animate-[float_4s_ease-in-out_infinite]">
              <div className="absolute inset-0 rounded-full bg-foreground/5 blur-3xl scale-150 pointer-events-none" />
              <img
                src="/logo/icon.webp"
                alt=""
                aria-hidden="true"
                className="relative w-32 lg:w-40 h-auto object-contain"
              />
              <img
                src="/logo/typo.webp"
                alt="Nivorae"
                className="relative w-52 lg:w-64 h-auto object-contain dark:brightness-0 dark:invert"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Program */}
      <section className="bg-background py-20 lg:py-28 px-6 lg:px-16 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-24">
            {/* Left: heading */}
            <div>
              <h2 className="font-black uppercase leading-[0.92] text-foreground whitespace-pre-line text-section-h2">
                {t.partnership.sectionHeading}
              </h2>
            </div>

            {/* Right: card */}
            <motion.div
              ref={partnershipRef}
              variants={stepRowVariants}
              initial="hidden"
              animate={partnershipInView ? "visible" : "hidden"}
              className="bg-accent/6 border border-accent/25 dark:bg-foreground/[0.12] dark:border-accent/30 rounded-3xl p-6 sm:p-8"
            >
              <span className="font-mono text-[10px] tracking-widest uppercase text-accent/70 dark:text-muted-foreground mb-4 block">
                {t.partnership.badge}
              </span>

              <h3 className="font-black text-h3 text-foreground mb-2">{t.partnership.headline}</h3>

              <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg">
                {t.partnership.desc}
              </p>

              <ul className="flex flex-col gap-3 mb-6">
                {t.partnership.conditions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <svg
                      className="w-4 h-4 shrink-0 mt-0.5"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M5 8l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="border-t border-accent/15 pt-5 mt-2 mb-8 flex items-center gap-3">
                <span className="bg-accent/10 text-accent dark:bg-accent/25 dark:text-foreground text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full shrink-0">
                  {t.partnership.attributionLabel}
                </span>
                <p className="text-sm text-muted-foreground">{t.partnership.attribution}</p>
              </div>

              <Link
                to={PARTNERSHIP_CTA_TO}
                className="block w-full py-3 rounded-2xl font-semibold text-sm text-center bg-foreground text-background hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-opacity duration-200"
              >
                {t.partnership.cta}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Table — hidden until pricing is confirmed */}
      {SHOW_PRICING && (
        <section className="bg-background py-20 lg:py-28 px-6 lg:px-16 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <h2 className="font-black uppercase leading-tight text-foreground whitespace-pre-line text-section-h2">
                {t.pricing.heading}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start pt-6">
              {t.plans.items.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-3xl p-8 border transition-all duration-300 ${
                    plan.highlight
                      ? "bg-foreground text-background border-foreground shadow-2xl md:scale-[1.04] md:-translate-y-2"
                      : "bg-muted/30 text-foreground border-border"
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background text-foreground text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-border whitespace-nowrap">
                      {t.pricing.recommended}
                    </span>
                  )}

                  {/* Plan name */}
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-1">{plan.title}</h3>
                    <p
                      className={`text-[10px] tracking-widest uppercase font-mono ${
                        plan.highlight ? "opacity-50" : "text-muted-foreground"
                      }`}
                    >
                      {plan.en}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 flex items-baseline gap-2">
                    <span className="font-black text-3xl">{plan.price}</span>
                    <span
                      className={`text-sm ${plan.highlight ? "opacity-50" : "text-muted-foreground"}`}
                    >
                      {t.pricing.startingFrom}
                    </span>
                  </div>

                  {/* Feature list */}
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <svg
                          className="w-4 h-4 shrink-0 mt-0.5"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                          <path
                            d="M5 8l2 2 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    type="button"
                    className={`w-full py-3 rounded-2xl font-semibold text-sm transition-opacity duration-200 hover:opacity-80 ${
                      plan.highlight
                        ? "bg-background text-foreground"
                        : "bg-foreground text-background"
                    }`}
                  >
                    {t.pricing.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works + Why Us */}
      <section className="bg-background border-t border-border py-20 lg:py-32 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Asymmetric split: sticky heading left, timeline scrolls right */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-24 mb-24">
            {/* Left: heading */}
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-6 select-none">
                ─ 03
              </p>
              <h2 className="font-black uppercase leading-[0.92] text-foreground whitespace-pre-line text-section-h2">
                {t.process.heading}
              </h2>
            </div>

            {/* Right: staggered timeline */}
            <motion.div
              ref={timelineRef}
              variants={stepContainerVariants}
              initial="hidden"
              animate={timelineInView ? "visible" : "hidden"}
              className="relative"
            >
              {/* Single continuous line running through all dots */}
              <div
                className="absolute w-px bg-border top-2 bottom-2 pointer-events-none z-0"
                style={{ left: "calc(56px + 24px)" }}
                aria-hidden="true"
              />

              {t.process.steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={stepRowVariants}
                  className="grid grid-cols-[56px_1px_1fr] gap-x-6 items-start"
                >
                  <p
                    className="font-mono text-[13px] text-muted-foreground/40 text-right tracking-[0.08em] pt-1 select-none"
                    aria-hidden="true"
                  >
                    [{step.num}]
                  </p>
                  {/* Dot — centered on the line */}
                  <div className="flex justify-center pt-1">
                    <span className="relative z-10 w-2 h-2 rounded-full bg-accent shrink-0" />
                  </div>
                  <div className={i < t.process.steps.length - 1 ? "pt-1 pb-12" : "pt-1 pb-0"}>
                    <h3 className="font-bold text-base uppercase tracking-[0.1em] text-foreground mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Why Us */}
          <motion.div
            ref={whyRef}
            variants={whyContainerVariants}
            initial="hidden"
            animate={whyInView ? "visible" : "hidden"}
            className="border-t border-border pt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {t.process.whyUs.map((item) => (
              <motion.div key={item.title} variants={stepRowVariants} className="group">
                <p className="font-semibold text-foreground text-base mb-2 transition-colors duration-200 group-hover:text-accent">
                  {item.title}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ExFooter lang={lang} />
    </div>
  );
}
