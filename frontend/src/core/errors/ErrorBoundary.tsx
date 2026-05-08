/**
 * React Error Boundary Component
 *
 * Catches JavaScript errors in child component tree and displays
 * a fallback UI instead of crashing the entire application.
 *
 * @security OWASP A09:2021 - Security Logging and Monitoring Failures
 * Errors are logged for debugging but user-facing messages are generic.
 *
 * @see docs/SECURITY.md#error-handling
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // With custom fallback
 * <ErrorBoundary
 *   fallback={<div>Something went wrong</div>}
 *   onError={(error) => logToService(error)}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // With reset capability
 * <ErrorBoundary
 *   FallbackComponent={({ error, resetError }) => (
 *     <div>
 *       <p>Error: {error.message}</p>
 *       <button onClick={resetError}>Try Again</button>
 *     </div>
 *   )}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */

import React from "react";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "./types";

/**
 * Default fallback component shown when an error is caught.
 */
// error param intentionally not displayed to users (security - OWASP A05)
function DefaultFallback({ error: _error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-lg font-semibold text-destructive">Something went wrong</h2>
      <p className="text-muted-foreground">
        An unexpected error occurred. Please try refreshing the page.
      </p>
      <button
        type="button"
        onClick={resetError}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Try Again
      </button>
    </div>
  );
}

/**
 * Error Boundary class component.
 *
 * Note: Error boundaries must be class components as of React 18.
 * There is no hook equivalent for componentDidCatch.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Update state when an error is caught.
   * Called during "render" phase, so no side effects allowed.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Log error information.
   * Called during "commit" phase, so side effects are allowed.
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const { onError } = this.props;

    // Log to console in development
    console.error("[ErrorBoundary] Caught error:", error);
    console.error("[ErrorBoundary] Component stack:", errorInfo.componentStack);

    // Call external error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // TODO: In production, send to error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  /**
   * Reset the error state to allow re-rendering.
   */
  resetError = (): void => {
    const { onReset } = this.props;
    if (onReset) {
      onReset();
    }
    this.setState({ hasError: false, error: undefined });
  };

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback, FallbackComponent } = this.props;

    if (hasError && error) {
      // Use custom FallbackComponent if provided
      if (FallbackComponent) {
        return <FallbackComponent error={error} resetError={this.resetError} />;
      }

      // Use simple fallback if provided
      if (fallback) {
        return fallback;
      }

      // Use default fallback
      return <DefaultFallback error={error} resetError={this.resetError} />;
    }

    return children;
  }
}
