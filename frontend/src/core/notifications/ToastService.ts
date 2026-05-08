/**
 * Toast Notification Service
 *
 * Singleton service for managing toast notifications with:
 * - Deduplication (prevents duplicate toasts of same type)
 * - Rapid-fire suppression (prevents notification spam)
 * - Type-based categorization
 *
 * @example
 * ```typescript
 * import { toastService } from "@/core/notifications/ToastService";
 *
 * // Show success toast
 * toastService.success("User saved successfully");
 *
 * // Show error toast with classification
 * toastService.showError(classifyError(error));
 * ```
 */

import { ErrorInfo, ErrorType } from "../errors/types";

/**
 * Toast types for styling and deduplication.
 */
export type ToastType = "success" | "error" | "warning" | "info";

/**
 * Toast configuration.
 */
interface ToastConfig {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

/**
 * Toast Notification Service - Singleton.
 *
 * IMPORTANT: This is a bare-bones implementation.
 * In production, integrate with a toast library like:
 * - react-hot-toast
 * - sonner
 * - react-toastify
 */
class ToastServiceImpl {
  private static instance: ToastServiceImpl;

  // Track active toasts by error type to prevent duplicates
  private activeToasts = new Map<string, ReturnType<typeof setTimeout>>();

  // Track last error time for rapid-fire suppression
  private lastErrorTime = 0;

  // Minimum time between error toasts (milliseconds)
  private readonly RAPID_ERROR_THRESHOLD = 100;

  // Default toast duration (milliseconds)
  private readonly DEFAULT_DURATION = 5000;

  // Toast display function - replace with your toast library
  private displayToast: ((config: ToastConfig) => void) | null = null;

  private constructor() {
    // Private constructor for singleton
  }

  /**
   * Get singleton instance.
   */
  static getInstance(): ToastServiceImpl {
    if (!ToastServiceImpl.instance) {
      ToastServiceImpl.instance = new ToastServiceImpl();
    }
    return ToastServiceImpl.instance;
  }

  /**
   * Set the toast display function.
   * Call this during app initialization with your toast library.
   *
   * @example
   * ```typescript
   * // With react-hot-toast
   * import toast from "react-hot-toast";
   *
   * toastService.setDisplayFunction((config) => {
   *   if (config.type === "error") {
   *     toast.error(config.message || config.title);
   *   } else {
   *     toast.success(config.message || config.title);
   *   }
   * });
   * ```
   */
  setDisplayFunction(fn: (config: ToastConfig) => void): void {
    this.displayToast = fn;
  }

  /**
   * Show a toast notification.
   */
  private show(config: ToastConfig): void {
    if (!this.displayToast) {
      // Fallback to console if no display function set
      // eslint-disable-next-line no-console
      console.log(`[Toast:${config.type}]`, config.title, config.message);
      return;
    }

    this.displayToast(config);
  }

  /**
   * Show a toast with deduplication.
   *
   * @param key - Unique key for deduplication
   * @param config - Toast configuration
   */
  private showWithDedup(key: string, config: ToastConfig): void {
    // Check for duplicate
    if (this.activeToasts.has(key)) {
      return;
    }

    // Check for rapid-fire (only for errors)
    if (config.type === "error") {
      const now = Date.now();
      if (now - this.lastErrorTime < this.RAPID_ERROR_THRESHOLD) {
        return;
      }
      this.lastErrorTime = now;
    }

    // Show the toast
    this.show(config);

    // Track active toast
    const duration = config.duration || this.DEFAULT_DURATION;
    const timeout = setTimeout(() => {
      this.activeToasts.delete(key);
    }, duration);

    this.activeToasts.set(key, timeout);
  }

  /**
   * Show success toast.
   */
  success(message: string, title = "Success"): void {
    this.show({ type: "success", title, message });
  }

  /**
   * Show info toast.
   */
  info(message: string, title = "Info"): void {
    this.show({ type: "info", title, message });
  }

  /**
   * Show warning toast.
   */
  warning(message: string, title = "Warning"): void {
    this.show({ type: "warning", title, message });
  }

  /**
   * Show error toast with simple message.
   */
  error(message: string, title = "Error"): void {
    this.showWithDedup(`error-${message}`, { type: "error", title, message });
  }

  /**
   * Show error toast from ErrorInfo (with deduplication by error type).
   */
  showError(errorInfo: ErrorInfo): void {
    this.showWithDedup(`error-${errorInfo.type}`, {
      type: "error",
      title: errorInfo.title,
      message: errorInfo.message,
    });
  }

  /**
   * Clear all active toast tracking.
   */
  clearAll(): void {
    this.activeToasts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    this.activeToasts.clear();
  }
}

/**
 * Singleton toast service instance.
 */
export const toastService = ToastServiceImpl.getInstance();

/**
 * Error type to toast type mapping.
 */
export function errorTypeToToastType(errorType: ErrorType): ToastType {
  switch (errorType) {
    case ErrorType.AUTH_ERROR:
      return "warning";
    case ErrorType.CLIENT_ERROR:
      return "warning";
    default:
      return "error";
  }
}
