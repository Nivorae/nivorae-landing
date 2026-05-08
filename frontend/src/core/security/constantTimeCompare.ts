/**
 * Timing-safe string comparison to prevent timing attacks.
 *
 * SECURITY: Uses bitwise XOR to compare all characters regardless
 * of match position. Prevents attackers from inferring string
 * content based on comparison time.
 *
 * Use cases:
 * - Password confirmation (signup forms)
 * - Token comparison
 * - Any security-sensitive string comparison
 *
 * @security CWE-208: Observable Timing Discrepancy
 * @see https://cwe.mitre.org/data/definitions/208.html
 * @see OWASP A07:2021 - Identification and Authentication Failures
 * @see docs/SECURITY.md#timing-safe-comparison
 *
 * NOTE: In Node.js backend, prefer crypto.timingSafeEqual().
 * This browser implementation is necessary because Web Crypto API
 * lacks a timing-safe string comparison function.
 *
 * @example
 * ```typescript
 * // Password confirmation
 * if (!constantTimeCompare(password, confirmPassword)) {
 *   setError("Passwords do not match");
 * }
 * ```
 */
export function constantTimeCompare(a: string, b: string): boolean {
  // Length check with dummy operation to maintain constant time
  // This prevents timing attacks based on early length mismatch
  if (a.length !== b.length) {
    const minLength = Math.min(a.length, b.length);
    let dummy = 0;
    for (let i = 0; i < minLength; i += 1) {
      // eslint-disable-next-line no-bitwise
      dummy |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    // eslint-disable-next-line no-void -- Required to prevent optimization removal (security)
    void dummy;
    return false;
  }

  // XOR all characters - accumulate mismatches without early exit
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}
