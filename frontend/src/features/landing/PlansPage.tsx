import { useState } from "react";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";
import { teamI18n } from "./teamI18n";

export function PlansPage() {
  const [lang, setLang] = useState<Lang>("zh");
  const t = teamI18n[lang];

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

          {/* Right: 3D floating logo */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-foreground/5 blur-3xl scale-125 pointer-events-none" />
              <img
                src="/nivorae-logo.png"
                alt="Nivorae"
                className="relative w-56 h-56 lg:w-72 lg:h-72 object-contain animate-[float_4s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="bg-background py-20 lg:py-28 px-6 lg:px-16 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <h2
              className="font-black uppercase leading-tight text-foreground whitespace-pre-line"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.75rem)" }}
            >
              {t.pricing.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start pt-6">
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

      {/* Interactive Plans */}
      {/* <section className="bg-background py-20 lg:py-28 px-6 lg:px-16 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2
              className="font-black uppercase leading-tight text-foreground whitespace-pre-line"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.75rem)" }}
            >
              {t.plans.heading}
            </h2>
            <p className="text-muted-foreground text-sm mt-3 tracking-widest uppercase animate-pulse">
              {selectedPlan ? t.plans.hint.selected : t.plans.hint.default}
            </p>
          </div>

          <div
            className={`flex flex-wrap items-start gap-8 transition-all duration-500 ${
              selectedPlan ? "flex-col lg:flex-row justify-center" : "flex-row justify-start"
            }`}
          >
            {visiblePlans.map((plan) => {
              const isActive = selectedPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`flex flex-col lg:flex-row items-center gap-8 transition-all duration-500 ${
                    isActive ? "w-full" : "w-auto"
                  }`}
                >
                  <div className="shrink-0">
                    {isActive ? (
                      <button
                        type="button"
                        className="p-4 bg-muted/30 rounded-[2.5rem] hover:opacity-80 transition-opacity border border-border"
                        onClick={() => setSelectedPlan(null)}
                      >
                        <div className="w-44 h-44 rounded-3xl bg-foreground text-background shadow-2xl flex flex-col items-center justify-center">
                          <span className="font-bold text-base tracking-wide">{plan.title}</span>
                          <span className="text-[10px] mt-2 tracking-wider opacity-60">
                            {plan.en}
                          </span>
                        </div>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedPlan(plan.id)}
                        className="w-44 h-44 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 ease-out hover:-translate-y-2 bg-background text-foreground border border-border hover:border-foreground hover:shadow-lg"
                      >
                        <span className="font-bold text-base tracking-wide">{plan.title}</span>
                        <span className="text-[10px] mt-2 tracking-wider text-muted-foreground">
                          {plan.en}
                        </span>
                      </button>
                    )}
                  </div>

                  {isActive && (
                    <>
                      <PlanPanel
                        label={t.plans.includesLabel}
                        sublabel="INCLUDES"
                        items={plan.includes}
                        iconBg="bg-foreground"
                        listClassName="animate-[fadeIn_0.5s_ease-out_0.1s_both]"
                      />
                      <PlanPanel
                        label={t.plans.deliverablesLabel}
                        sublabel="DELIVERABLES"
                        items={plan.deliverables}
                        iconBg="bg-foreground/80"
                        listClassName="animate-[fadeIn_0.5s_ease-out_0.2s_both]"
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Services Accordion */}
      {/* <section className="bg-background py-20 lg:py-28 px-6 lg:px-16 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-28">
          <div className="lg:pt-1">
            <h2
              className="font-black uppercase leading-tight text-foreground whitespace-pre-line"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.75rem)" }}
            >
              {t.services.heading}
            </h2>
          </div>
          <div>
            {t.services.items.map((item, idx) => (
              <div key={item.num}>
                <div className="h-px bg-border" />
                <button
                  type="button"
                  onClick={() => setActiveItem(activeItem === idx ? -1 : idx)}
                  className="w-full flex items-baseline gap-6 py-5 text-left hover:opacity-75 transition-opacity duration-200"
                >
                  <span className="text-muted-foreground text-sm font-mono w-6 shrink-0 tabular-nums">
                    {item.num}
                  </span>
                  <span className="text-foreground font-semibold text-lg">{item.title}</span>
                </button>
                {activeItem === idx && (
                  <p className="text-muted-foreground text-sm leading-relaxed pb-6 pl-12 pr-4">
                    {item.desc}
                  </p>
                )}
              </div>
            ))}
            <div className="h-px bg-border" />
          </div>
        </div>
      </section> */}

      {/* Services Grid */}
      <section className="bg-background border-t border-border py-20 lg:py-28 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 lg:gap-24">
          <div>
            <h2
              className="font-black uppercase leading-tight text-foreground whitespace-pre-line"
              style={{ fontSize: "clamp(1.4rem, 2vw, 1.9rem)" }}
            >
              {t.grid.heading}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-10">
            {t.grid.items.map((item) => (
              <div key={item.title}>
                <h3 className="text-foreground font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
