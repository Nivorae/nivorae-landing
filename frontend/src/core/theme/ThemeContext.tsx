/**
 * Theme Context Provider
 *
 * Multi-layer theme preference system:
 * 1. localStorage (user's explicit choice)
 * 2. System preference (prefers-color-scheme)
 * 3. Default (light)
 *
 * @example
 * ```tsx
 * // In main.tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * // In components
 * const { theme, setTheme, toggleTheme } = useTheme();
 * ```
 */

import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  /** Current theme setting */
  theme: Theme;
  /** Actual applied theme (resolved from system if theme is "system") */
  resolvedTheme: ResolvedTheme;
  /** Set the theme */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark */
  toggleTheme: () => void;
}

const STORAGE_KEY = "theme";

/**
 * Get the system's preferred color scheme.
 */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Get initial theme from localStorage or default.
 */
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "system";

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // localStorage not available
  }

  return "system";
}

/**
 * Apply theme to document.
 */
function applyTheme(resolvedTheme: ResolvedTheme): void {
  const root = document.documentElement;

  if (resolvedTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default theme if none stored (default: "system") */
  defaultTheme?: Theme;
}

/**
 * Theme Provider Component
 */
export function ThemeProvider({ children, defaultTheme = "system" }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const initial = getInitialTheme();
    return initial || defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    const initial = getInitialTheme();
    return initial === "system" ? getSystemTheme() : (initial as ResolvedTheme);
  });

  // Apply theme to document whenever resolved theme changes
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // Listen for system theme changes when theme is "system"
  useEffect(() => {
    if (theme !== "system") return undefined;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      setResolvedTheme(newTheme);
    };

    // Modern browsers use addEventListener
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  // Set theme and persist to localStorage
  const setTheme = useCallback(
    (newTheme: Theme) => {
      if (newTheme === theme) return;

      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch {
        // localStorage not available
      }

      setThemeState(newTheme);

      if (newTheme === "system") {
        setResolvedTheme(getSystemTheme());
      } else {
        setResolvedTheme(newTheme);
      }
    },
    [theme]
  );

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [resolvedTheme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
