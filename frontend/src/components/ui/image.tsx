import * as React from "react";

import { cn } from "@/lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Alternative text for the image (required for accessibility)
   */
  alt: string;
  /**
   * Explicit width to prevent layout shift (required)
   */
  width: number | string;
  /**
   * Explicit height to prevent layout shift (required)
   */
  height: number | string;
  /**
   * Fallback image URL to display when the primary image fails to load
   */
  fallback?: string;
}

/**
 * Image component with built-in lazy loading and fallback support.
 *
 * Features:
 * - Native `loading="lazy"` for performance optimization
 * - Optional fallback image on load error
 * - Follows shadcn/ui patterns (forwardRef, cn())
 *
 * @example
 * ```tsx
 * <Image
 *   src="/photos/user.jpg"
 *   alt="User avatar"
 *   fallback="/images/placeholder.svg"
 *   className="w-16 h-16 rounded-full"
 * />
 * ```
 */
const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, width, height, fallback, onError, src, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    // Reset error state when src changes
    React.useEffect(() => {
      setHasError(false);
    }, [src]);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setHasError(true);
      onError?.(e);
    };

    return (
      <img
        ref={ref}
        className={cn(className)}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        src={hasError && fallback ? fallback : src}
        onError={handleError}
        {...props}
      />
    );
  }
);
Image.displayName = "Image";

export { Image };
