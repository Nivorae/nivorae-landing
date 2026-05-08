/**
 * URL Whitelist for SAST CWE-918 (SSRF) Compliance
 *
 * SECURITY: All API paths must be validated against this whitelist
 * before making requests. Prevents SSRF attacks where user input
 * could be used to construct malicious URLs.
 *
 * Pattern: Each service module should import its relevant whitelist
 * and validate paths before calling apiClient.
 *
 * @security CWE-918: Server-Side Request Forgery (SSRF)
 * @see https://cwe.mitre.org/data/definitions/918.html
 * @see OWASP A10:2021 - Server-Side Request Forgery
 * @see docs/SECURITY.md#url-whitelist-pattern
 *
 * @example
 * ```typescript
 * // In your service file
 * import { USERS_WHITELIST, isPathAllowed } from "@/core/security/urlWhitelist";
 *
 * const path = `/users/${id}`;
 * if (!isPathAllowed(path, USERS_WHITELIST)) {
 *   throw new Error(`Path not in whitelist: ${path}`);
 * }
 * ```
 */

// Core endpoints (auth, health checks)
export const CORE_WHITELIST = ["/auth", "/health"] as const;

// User management endpoints
export const USERS_WHITELIST = ["/users", "/roles"] as const;

// Example: Add domain-specific whitelists as needed
// export const ORDERS_WHITELIST = ["/orders", "/payments"] as const;
// export const PRODUCTS_WHITELIST = ["/products", "/categories"] as const;

// Union type of all whitelist entries
export type WhitelistEntry = (typeof CORE_WHITELIST)[number] | (typeof USERS_WHITELIST)[number];

/**
 * Validates if a path is allowed by the given whitelist.
 * Strips query parameters before validation.
 *
 * @param path - The path to validate (e.g., "/users/123?include=roles")
 * @param whitelist - Array of allowed path prefixes
 * @returns true if path starts with any whitelisted prefix
 *
 * @example
 * ```typescript
 * isPathAllowed("/users/123", USERS_WHITELIST); // true
 * isPathAllowed("/users?page=1", USERS_WHITELIST); // true
 * isPathAllowed("/admin/users", USERS_WHITELIST); // false
 * ```
 */
export function isPathAllowed(path: string, whitelist: readonly string[]): boolean {
  // Strip query parameters for validation
  const normalizedPath = path.split("?")[0];

  return whitelist.some(
    (allowed) => normalizedPath === allowed || normalizedPath.startsWith(`${allowed}/`)
  );
}

/**
 * Legacy function for backward compatibility.
 * Validates path against the combined USERS_WHITELIST.
 *
 * @deprecated Use isPathAllowed with specific whitelist instead
 */
export function isPathAllowedLegacy(path: string): boolean {
  return isPathAllowed(path, [...CORE_WHITELIST, ...USERS_WHITELIST]);
}
