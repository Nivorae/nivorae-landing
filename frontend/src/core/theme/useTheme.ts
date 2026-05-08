/**
 * Theme Hook
 *
 * Provides access to theme state and controls.
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
 *     </button>
 *   );
 * }
 * ```
 */

import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

/**
 * Hook to access theme state and controls.
 *
 * @throws Error if used outside ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
