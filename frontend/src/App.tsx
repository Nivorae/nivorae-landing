import { useState, useEffect } from "react";
import { Shield, Package, Zap, KeyRound, Moon, Rocket, Sun } from "lucide-react";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./core/theme/useTheme";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./components/ui/card";
import { getMockData } from "./data";

/** Feature data structure from mock API */
interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

/**
 * Feature Card Component
 *
 * Demonstrates:
 * - Card component with design tokens
 * - Container query context for responsive behavior
 * - Component spacing (em-based) that scales with font-size
 */
function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <Card className="container-inline h-full">
      <CardHeader>
        {icon && <div className="mb-2 text-primary">{icon}</div>}
        <CardTitle className="text-h4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

/**
 * Hero Section Component
 *
 * Demonstrates:
 * - Fluid typography with clamp() (text-fluid-*)
 * - Viewport-safe heights (min-h-screen-safe)
 * - Section padding that scales with viewport (py-section-fluid)
 * - Text balance for better heading readability
 */
function HeroSection() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <section className="min-h-screen-safe flex flex-col bg-background">
      {/* Navigation */}
      <header className="w-fluid-wide py-4">
        <nav className="flex items-center justify-between">
          <span className="text-h4 font-semibold text-foreground">Secure Template</span>
          <Button variant="outline" onClick={toggleTheme} className="gap-icon">
            {resolvedTheme === "dark" ? (
              <>
                <Sun className="size-4" aria-hidden="true" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="size-4" aria-hidden="true" />
                <span>Dark</span>
              </>
            )}
          </Button>
        </nav>
      </header>

      {/* Hero Content */}
      <div className="flex flex-1 items-center py-section-fluid">
        <div className="w-fluid-content">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-fluid-display-lg text-balance font-semibold text-foreground">
              React Vite Secure Template
            </h1>
            <p className="mt-6 text-body-lg text-muted-foreground">
              A production-ready React template with security-first patterns aligned with OWASP Top
              10. Built with modern tooling and best practices.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Map icon names from JSON to React components */
const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="size-8" aria-hidden="true" />,
  Package: <Package className="size-8" aria-hidden="true" />,
  Zap: <Zap className="size-8" aria-hidden="true" />,
  KeyRound: <KeyRound className="size-8" aria-hidden="true" />,
  Moon: <Moon className="size-8" aria-hidden="true" />,
  Rocket: <Rocket className="size-8" aria-hidden="true" />,
};

/**
 * Features Section Component
 *
 * Demonstrates:
 * - CSS Grid with auto-fit and fr units (grid-features)
 * - Section padding tokens (py-section-lg)
 * - Fluid container width (w-fluid-wide)
 * - Semantic heading hierarchy
 * - Mock data loading from src/data/mocks/features.json
 */
function FeaturesSection() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMockData<Feature[]>("features", () => Promise.resolve([]))
      .then(setFeatures)
      .catch((err) => console.error("[FeaturesSection] Failed to load features:", err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <section className="bg-muted py-section-lg">
        <div className="w-fluid-wide text-center text-muted-foreground">Loading features…</div>
      </section>
    );
  }

  return (
    <section className="bg-muted py-section-lg">
      <div className="w-fluid-wide">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-prose text-center">
          <h2 className="text-fluid-h1 text-balance font-semibold text-foreground">
            Everything You Need
          </h2>
          <p className="mt-4 text-body text-muted-foreground">
            Built with security and developer experience in mind
          </p>
        </div>

        {/* Features Grid - uses CSS Grid with fr units */}
        <div className="grid-features">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={iconMap[feature.icon]}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Design Tokens Showcase Section
 *
 * Demonstrates:
 * - Typography scale (display, headings, body, labels)
 * - Spacing scale visualization
 * - Shadow elevation levels
 * - Border radius options
 */
function TokensShowcase() {
  return (
    <section className="py-section-lg">
      <div className="w-fluid-wide">
        <div className="mx-auto mb-12 max-w-prose text-center">
          <h2 className="text-fluid-h1 text-balance font-semibold text-foreground">
            Design System
          </h2>
          <p className="mt-4 text-body text-muted-foreground">
            Comprehensive design tokens for consistent styling
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Typography Scale */}
          <Card>
            <CardHeader>
              <CardTitle>Typography Scale</CardTitle>
              <CardDescription>rem-based with fluid responsive variants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-display-md">Display MD</div>
              <div className="text-h1">Heading 1</div>
              <div className="text-h2">Heading 2</div>
              <div className="text-h3">Heading 3</div>
              <div className="text-h4">Heading 4</div>
              <div className="text-body">Body text (default)</div>
              <div className="text-body-sm text-muted-foreground">Body small</div>
              <div className="text-label-lg text-muted-foreground">Label large</div>
              <div className="text-label-sm text-muted-foreground">Label small</div>
            </CardContent>
          </Card>

          {/* Spacing Scale */}
          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
              <CardDescription>rem-based 4pt grid system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-2">
                {[1, 2, 3, 4, 6, 8, 12, 16].map((size) => (
                  <div key={size} className="flex flex-col items-center gap-1">
                    <div
                      className="bg-primary"
                      style={{
                        width: `var(--space-${size})`,
                        height: `var(--space-${size})`,
                      }}
                    />
                    <span className="text-label-sm text-muted-foreground">{size}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shadow Elevation */}
          <Card>
            <CardHeader>
              <CardTitle>Shadow Elevation</CardTitle>
              <CardDescription>px-based for precise control</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6">
                {["xs", "sm", "md", "lg", "xl", "2xl"].map((shadow) => (
                  <div key={shadow} className="flex flex-col items-center gap-2">
                    <div
                      className={`h-12 w-12 rounded-lg bg-card shadow-${shadow}`}
                      style={{ boxShadow: `var(--shadow-${shadow})` }}
                    />
                    <span className="text-label-sm text-muted-foreground">{shadow}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Border Radius */}
          <Card>
            <CardHeader>
              <CardTitle>Border Radius</CardTitle>
              <CardDescription>rem-based for scalability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                {["sm", "md", "lg", "xl", "2xl", "full"].map((radius) => (
                  <div key={radius} className="flex flex-col items-center gap-2">
                    <div
                      className={`h-12 w-12 border-2 border-primary bg-primary/10 rounded-${radius}`}
                      style={{ borderRadius: `var(--radius-${radius})` }}
                    />
                    <span className="text-label-sm text-muted-foreground">{radius}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/**
 * Footer Component
 *
 * Demonstrates:
 * - Section padding
 * - Semantic text styles
 * - Muted color scheme
 */
function Footer() {
  return (
    <footer className="border-t bg-muted py-section-sm">
      <div className="w-fluid-wide">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-label text-muted-foreground">
            React Vite Secure Template &middot; Version {__APP_VERSION__}
          </p>
          <p className="text-label-sm text-muted-foreground">
            Built with security-first patterns aligned with OWASP Top 10
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Home Page Component
 *
 * Complete showcase of the design system including:
 * - Fluid typography with clamp()
 * - Container queries
 * - CSS Grid with fr units
 * - Viewport units (vh/dvh/svh)
 * - rem/em spacing tokens
 * - px-precise borders and shadows
 */
function HomePage() {
  return (
    <div className="min-h-screen-safe bg-background">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <TokensShowcase />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Add more routes here */}
    </Routes>
  );
}

export default App;
