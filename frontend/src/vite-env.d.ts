/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend origin (no trailing slash, no /api suffix). Baked at build time. */
  readonly VITE_API_URL: string;
  /** Optional: set to "true" to use local JSON mocks instead of the real API. */
  readonly VITE_USE_MOCK_DATA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * App version injected from package.json at build time.
 * @see vite.config.ts define section
 */
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
declare const __APP_VERSION__: string;
