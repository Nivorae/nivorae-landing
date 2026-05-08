/**
 * Error Handling Types
 *
 * @see docs/SECURITY.md#error-handling
 */

/**
 * Error types for classification and handling.
 */
export enum ErrorType {
  /** Network connection failed */
  NETWORK_ERROR = "NETWORK_ERROR",
  /** Request timed out */
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  /** Authentication failed (401/403) */
  AUTH_ERROR = "AUTH_ERROR",
  /** Client error (4xx) */
  CLIENT_ERROR = "CLIENT_ERROR",
  /** Server error (5xx) */
  SERVER_ERROR = "SERVER_ERROR",
  /** Unknown/unclassified error */
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

/**
 * Classified error information for UI display and handling.
 */
export interface ErrorInfo {
  /** Error classification type */
  type: ErrorType;
  /** User-friendly title for the error */
  title: string;
  /** User-friendly description */
  message: string;
  /** Technical details (only show in development) */
  technical?: string;
  /** Whether the operation can be retried */
  canRetry: boolean;
  /** HTTP status code if applicable */
  statusCode?: number;
}

/**
 * Error boundary state interface.
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary props interface.
 */
export interface ErrorBoundaryProps {
  /** Child components to render */
  children: React.ReactNode;
  /** Custom fallback UI */
  fallback?: React.ReactNode;
  /** Custom fallback component that receives error info */
  FallbackComponent?: React.ComponentType<{
    error: Error;
    resetError: () => void;
  }>;
  /** Callback when error is caught */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** Callback when error is reset */
  onReset?: () => void;
}
