const HERO_GRADIENT = {
  background:
    "radial-gradient(ellipse at 50% 55%, oklch(var(--card)) 0%, oklch(var(--background)) 70%)",
};

const RING_SIZES = [260, 360, 460, 580];

interface PageHeroProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
}

export function PageHero({ title, eyebrow, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{ minHeight: "52vh", ...HERO_GRADIENT }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {RING_SIZES.map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-foreground/20"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {eyebrow && (
        <p className="relative font-mono text-[0.7rem] tracking-[0.28em] uppercase text-muted-foreground mb-4">
          {eyebrow}
        </p>
      )}

      <h1 className="relative font-black text-foreground uppercase tracking-[0.06em] text-center text-hero-display">
        {title}
      </h1>

      {subtitle && (
        <p
          className="relative text-muted-foreground text-center mt-5 max-w-lg px-6"
          style={{ fontSize: "clamp(0.875rem, 1.4vw, 1.05rem)" }}
        >
          {subtitle}
        </p>
      )}
    </section>
  );
}
