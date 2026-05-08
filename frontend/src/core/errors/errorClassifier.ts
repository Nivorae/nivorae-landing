/**
 * Error Classification System
 *
 * Classifies errors into types for consistent UI handling.
 *
 * @security OWASP A05:2021 - Security Misconfiguration
 * Never expose internal error details to users.
 *
 * @see docs/SECURITY.md#error-handling
 */

import axios from "axios";
import { ErrorType } from "./types";
import type { ErrorInfo } from "./types";

export type { ErrorInfo } from "./types";

/**
 * Type guard for Axios errors.
 */
function isAxiosError(error: unknown): error is ReturnType<typeof axios.isAxiosError> & {
  response?: { status: number; data?: { message?: string } };
  code?: string;
  message: string;
} {
  return axios.isAxiosError(error);
}

/**
 * Type guard for standard Error objects.
 */
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Classify an error and return user-friendly error info.
 *
 * @param error - The caught error (any type)
 * @returns ErrorInfo with user-friendly messages
 *
 * @example
 * ```typescript
 * try {
 *   await apiClient.get("/users");
 * } catch (error) {
 *   const errorInfo = classifyError(error);
 *   if (errorInfo.canRetry) {
 *     showRetryButton();
 *   }
 *   showToast(errorInfo.title, errorInfo.message);
 * }
 * ```
 */
export function classifyError(error: unknown): ErrorInfo {
  // Handle Axios errors
  if (isAxiosError(error)) {
    const status = error.response?.status;

    // Network/timeout errors (no response received)
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        return {
          type: ErrorType.TIMEOUT_ERROR,
          title: "Request Timeout",
          message: "The request took too long. Please check your connection and try again.",
          technical: error.message,
          canRetry: true,
        };
      }

      return {
        type: ErrorType.NETWORK_ERROR,
        title: "Connection Failed",
        message: "Unable to connect to the server. Please check your internet connection.",
        technical: error.message,
        canRetry: true,
      };
    }

    // Authentication errors
    if (status === 401 || status === 403) {
      return {
        type: ErrorType.AUTH_ERROR,
        title: status === 401 ? "Session Expired" : "Access Denied",
        message:
          status === 401
            ? "Your session has expired. Please log in again."
            : "You don't have permission to perform this action.",
        statusCode: status,
        canRetry: false,
      };
    }

    // Client errors (4xx)
    if (status && status >= 400 && status < 500) {
      return {
        type: ErrorType.CLIENT_ERROR,
        title: "Request Error",
        message: error.response?.data?.message || "The request could not be completed.",
        statusCode: status,
        technical: error.message,
        canRetry: false,
      };
    }

    // Server errors (5xx)
    if (status && status >= 500) {
      return {
        type: ErrorType.SERVER_ERROR,
        title: "Server Error",
        message: "Something went wrong on our end. Please try again later.",
        statusCode: status,
        technical: error.message,
        canRetry: true,
      };
    }
  }

  // Handle standard Error objects
  if (isError(error)) {
    // Check for network-related messages
    if (error.message.toLowerCase().includes("network")) {
      return {
        type: ErrorType.NETWORK_ERROR,
        title: "Connection Failed",
        message: "Unable to connect. Please check your internet connection.",
        technical: error.message,
        canRetry: true,
      };
    }

    return {
      type: ErrorType.UNKNOWN_ERROR,
      title: "Error",
      message: "An unexpected error occurred. Please try again.",
      technical: error.message,
      canRetry: true,
    };
  }

  // Unknown error type
  return {
    type: ErrorType.UNKNOWN_ERROR,
    title: "Error",
    message: "An unexpected error occurred. Please try again.",
    technical: String(error),
    canRetry: true,
  };
}

/**
 * Get a short error message for display in small spaces (e.g., inline errors).
 */
export function getShortErrorMessage(errorInfo: ErrorInfo): string {
  switch (errorInfo.type) {
    case ErrorType.NETWORK_ERROR:
      return "No connection";
    case ErrorType.TIMEOUT_ERROR:
      return "Request timed out";
    case ErrorType.AUTH_ERROR:
      return "Not authorized";
    case ErrorType.SERVER_ERROR:
      return "Server error";
    default:
      return "Error occurred";
  }
}
