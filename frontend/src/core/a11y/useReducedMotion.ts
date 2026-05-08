/**
 * Reduced Motion Hook
 *
 * Detects user's preference for reduced motion.
 * Used for WCAG 2.1 AAA compliance.
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
 *
 * @example
 * ```tsx
 * function AnimatedComponent() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   return (
 *     <motion.div
 *       animate={{ x: 100 }}
 *       transition={{
 *         duration: prefersReducedMotion ? 0 : 0.3
 *       }}
 *     />
 *   );
 * }
 * ```
 */

import { useEffect, useState } from "react";

/**
 * Check if user prefers reduced motion.
 */
function getReducedMotionPreference(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Hook to detect prefers-reduced-motion media query.
 *
 * @returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getReducedMotionPreference);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
