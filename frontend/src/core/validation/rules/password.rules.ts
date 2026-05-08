/**
 * Password Validation Rules
 *
 * Implements NIST 800-63B guidelines for password validation.
 * Uses timing-safe comparison for password confirmation.
 *
 * @security CWE-208: Observable Timing Discrepancy
 * @security OWASP A07:2021 - Identification and Authentication Failures
 * @see docs/SECURITY.md#password-validation
 */

import { z } from "zod";
import { constantTimeCompare } from "@/core/security/constantTimeCompare";

/**
 * Password validation rules configuration.
 * Customize these based on your security requirements.
 */
export const PASSWORD_RULES = {
  minLength: 8,
  maxLength: 128,
  requireLowercase: true,
  requireUppercase: true,
  requireDigit: true,
  // Only allow these special characters to prevent injection
  allowedSpecialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?",
} as const;

/**
 * Individual password rule validators.
 * Each returns an error message or null if valid.
 */
export const passwordRuleChecks = {
  /** Check minimum length */
  minLength: (password: string): string | null => {
    if (password.length < PASSWORD_RULES.minLength) {
      return `Password must be at least ${PASSWORD_RULES.minLength} characters`;
    }
    return null;
  },

  /** Check maximum length */
  maxLength: (password: string): string | null => {
    if (password.length > PASSWORD_RULES.maxLength) {
      return `Password must be at most ${PASSWORD_RULES.maxLength} characters`;
    }
    return null;
  },

  /** Check for lowercase letter */
  lowercase: (password: string): string | null => {
    if (PASSWORD_RULES.requireLowercase && !/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    return null;
  },

  /** Check for uppercase letter */
  uppercase: (password: string): string | null => {
    if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    return null;
  },

  /** Check for digit */
  digit: (password: string): string | null => {
    if (PASSWORD_RULES.requireDigit && !/[0-9]/.test(password)) {
      return "Password must contain at least one digit";
    }
    return null;
  },

  /** Check for allowed characters only (prevents special char injection) */
  allowedChars: (password: string): string | null => {
    const allowedPattern = new RegExp(
      `^[a-zA-Z0-9${PASSWORD_RULES.allowedSpecialChars.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&")}]*$`
    );
    if (!allowedPattern.test(password)) {
      return `Password can only contain letters, numbers, and these special characters: ${PASSWORD_RULES.allowedSpecialChars}`;
    }
    return null;
  },
};

/**
 * Validate all password rules and return all errors.
 *
 * @param password - The password to validate
 * @returns Array of error messages (empty if valid)
 */
export function validatePassword(password: string): string[] {
  const errors: string[] = [];

  Object.values(passwordRuleChecks).forEach((check) => {
    const error = check(password);
    if (error) {
      errors.push(error);
    }
  });

  return errors;
}

/**
 * Password schema with all rules checked via superRefine.
 * Use this for form validation with React Hook Form + Zod.
 *
 * @example
 * ```typescript
 * const schema = z.object({
 *   password: passwordSchema,
 *   confirmPassword: z.string(),
 * }).superRefine(passwordConfirmRefinement);
 * ```
 */
export const passwordSchema = z.string().superRefine((password, ctx) => {
  const errors = validatePassword(password);

  errors.forEach((error) => {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: error,
    });
  });
});

/**
 * Zod refinement for password confirmation.
 * Uses timing-safe comparison to prevent timing attacks.
 *
 * @security Uses constantTimeCompare (CWE-208 compliant)
 *
 * @example
 * ```typescript
 * const schema = z.object({
 *   password: passwordSchema,
 *   confirmPassword: z.string(),
 * }).superRefine(passwordConfirmRefinement);
 * ```
 */
export function passwordConfirmRefinement(
  data: { password: string; confirmPassword: string },
  ctx: z.RefinementCtx
): void {
  // Use timing-safe comparison to prevent timing attacks
  if (!constantTimeCompare(data.password, data.confirmPassword)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
}

/**
 * Complete password change/signup schema with confirmation.
 */
export const passwordWithConfirmSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine(passwordConfirmRefinement);
