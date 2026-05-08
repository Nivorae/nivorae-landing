/**
 * Animation Hydration Hook
 *
 * Disables animations for a short period after mount to:
 * 1. Improve Time to Interactive (TTI) metrics
 * 2. Prevent jarring animations during hydration
 * 3. Prioritize critical rendering path
 *
 * @example
 * ```tsx
 * function AnimatedList() {
 *   const isHydrated = useAnimationHydration();
 *
 *   return (
 *     <motion.ul
 *       variants={listVariants}
 *       initial={isHydrated ? "hidden" : false}
 *       animate="visible"
 *     >
 *       {items.map(item => <ListItem key={item.id} item={item} />)}
 *     </motion.ul>
 *   );
 * }
 * ```
 */

import { useEffect, useState } from "react";

/**
 * Hook that returns false initially, then true after a delay.
 * Use to disable animations during initial render for better TTI.
 *
 * @param delay - Delay in milliseconds before enabling animations (default: 300)
 * @returns true when animations should be enabled
 */
export function useAnimationHydration(delay = 300): boolean {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for initial render to complete
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return isHydrated;
}

/**
 * Combined hook that respects both reduced motion preference
 * and hydration state.
 *
 * @param delay - Hydration delay in milliseconds
 * @returns true when animations should play
 */
export function useShouldAnimate(delay = 300): boolean {
  const isHydrated = useAnimationHydration(delay);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Only animate if hydrated AND user doesn't prefer reduced motion
  return isHydrated && !prefersReducedMotion;
}
