/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* ============================================
       * SPACING (rem-based from CSS tokens)
       * ============================================ */
      spacing: {
        // Numeric scale
        0: "var(--space-0)",
        px: "var(--space-px)",
        0.5: "var(--space-0-5)",
        1: "var(--space-1)",
        1.5: "var(--space-1-5)",
        2: "var(--space-2)",
        2.5: "var(--space-2-5)",
        3: "var(--space-3)",
        3.5: "var(--space-3-5)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
        9: "var(--space-9)",
        10: "var(--space-10)",
        11: "var(--space-11)",
        12: "var(--space-12)",
        14: "var(--space-14)",
        16: "var(--space-16)",
        20: "var(--space-20)",
        24: "var(--space-24)",
        28: "var(--space-28)",
        32: "var(--space-32)",
        36: "var(--space-36)",
        40: "var(--space-40)",
        44: "var(--space-44)",
        48: "var(--space-48)",
        52: "var(--space-52)",
        56: "var(--space-56)",
        60: "var(--space-60)",
        64: "var(--space-64)",
        72: "var(--space-72)",
        80: "var(--space-80)",
        96: "var(--space-96)",
        // Semantic scale
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
        "4xl": "var(--space-4xl)",
        "5xl": "var(--space-5xl)",
      },

      /* ============================================
       * FONT SIZE (rem-based with line-height ratios)
       * ============================================ */
      fontSize: {
        // Display sizes (fluid)
        "display-xl": [
          "var(--text-display-xl-size)",
          {
            lineHeight: "var(--text-display-xl-line-height)",
            letterSpacing: "var(--text-display-xl-letter-spacing)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        "display-lg": [
          "var(--text-display-lg-size)",
          {
            lineHeight: "var(--text-display-lg-line-height)",
            letterSpacing: "var(--text-display-lg-letter-spacing)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        "display-md": [
          "var(--text-display-md-size)",
          {
            lineHeight: "var(--text-display-md-line-height)",
            letterSpacing: "var(--text-display-md-letter-spacing)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        // Headlines
        h1: [
          "var(--text-h1-size)",
          {
            lineHeight: "var(--text-h1-line-height)",
            letterSpacing: "var(--text-h1-letter-spacing)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
        h2: [
          "var(--text-h2-size)",
          {
            lineHeight: "var(--text-h2-line-height)",
            letterSpacing: "var(--text-h2-letter-spacing)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
        h3: [
          "var(--text-h3-size)",
          {
            lineHeight: "var(--text-h3-line-height)",
            letterSpacing: "var(--text-h3-letter-spacing)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
        h4: [
          "var(--text-h4-size)",
          {
            lineHeight: "var(--text-h4-line-height)",
            letterSpacing: "var(--text-h4-letter-spacing)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
        // Body text
        "body-lg": [
          "var(--text-body-lg-size)",
          {
            lineHeight: "var(--text-body-lg-line-height)",
            fontWeight: "var(--font-weight-regular)",
          },
        ],
        body: [
          "var(--text-body-size)",
          {
            lineHeight: "var(--text-body-line-height)",
            fontWeight: "var(--font-weight-regular)",
          },
        ],
        "body-sm": [
          "var(--text-body-sm-size)",
          {
            lineHeight: "var(--text-body-sm-line-height)",
            fontWeight: "var(--font-weight-regular)",
          },
        ],
        // Labels
        "label-lg": [
          "var(--text-label-lg-size)",
          {
            lineHeight: "var(--text-label-lg-line-height)",
            fontWeight: "var(--font-weight-regular)",
          },
        ],
        label: [
          "var(--text-label-size)",
          {
            lineHeight: "var(--text-label-line-height)",
            fontWeight: "var(--font-weight-regular)",
          },
        ],
        "label-sm": [
          "var(--text-label-sm-size)",
          {
            lineHeight: "var(--text-label-sm-line-height)",
            fontWeight: "var(--font-weight-regular)",
          },
        ],
      },

      /* ============================================
       * COLORS (RGB space for opacity support)
       * ============================================ */
      colors: {
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "rgb(var(--success))",
          foreground: "rgb(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "rgb(var(--warning))",
          foreground: "rgb(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "rgb(var(--info))",
          foreground: "rgb(var(--info-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "rgb(var(--sidebar))",
          foreground: "rgb(var(--sidebar-foreground))",
          primary: "rgb(var(--sidebar-primary))",
          "primary-foreground": "rgb(var(--sidebar-primary-foreground))",
          accent: "rgb(var(--sidebar-accent))",
          "accent-foreground": "rgb(var(--sidebar-accent-foreground))",
          border: "rgb(var(--sidebar-border))",
          ring: "rgb(var(--sidebar-ring))",
        },
        chart: {
          1: "rgb(var(--chart-1))",
          2: "rgb(var(--chart-2))",
          3: "rgb(var(--chart-3))",
          4: "rgb(var(--chart-4))",
          5: "rgb(var(--chart-5))",
        },
      },

      /* ============================================
       * FONT FAMILY
       * ============================================ */
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        serif: ["var(--font-family-serif)"],
        mono: ["var(--font-family-mono)"],
      },

      /* ============================================
       * BORDER RADIUS (rem from CSS tokens)
       * ============================================ */
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-default)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        "4xl": "var(--radius-4xl)",
        full: "var(--radius-full)",
        // Component-specific
        button: "var(--radius-button)",
        input: "var(--radius-input)",
        card: "var(--radius-card)",
        modal: "var(--radius-modal)",
      },

      /* ============================================
       * BORDER WIDTH (px from CSS tokens)
       * ============================================ */
      borderWidth: {
        DEFAULT: "var(--border-default)",
        0: "var(--border-0)",
        hairline: "var(--border-hairline)",
        1: "var(--border-1)",
        2: "var(--border-2)",
        3: "var(--border-3)",
        4: "var(--border-4)",
        8: "var(--border-8)",
      },

      /* ============================================
       * BOX SHADOW (px from CSS tokens)
       * ============================================ */
      boxShadow: {
        none: "var(--shadow-none)",
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-default)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        inner: "var(--shadow-inner)",
        // Component-specific
        button: "var(--shadow-button)",
        "button-hover": "var(--shadow-button-hover)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        dropdown: "var(--shadow-dropdown)",
        modal: "var(--shadow-modal)",
        toast: "var(--shadow-toast)",
      },

      /* ============================================
       * Z-INDEX
       * ============================================ */
      zIndex: {
        base: "var(--z-base)",
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        fixed: "var(--z-fixed)",
        drawer: "var(--z-drawer)",
        "modal-backdrop": "var(--z-modal-backdrop)",
        modal: "var(--z-modal)",
        popover: "var(--z-popover)",
        tooltip: "var(--z-tooltip)",
        toast: "var(--z-toast)",
        max: "var(--z-max)",
      },

      /* ============================================
       * TRANSITIONS
       * ============================================ */
      transitionDuration: {
        fast: "var(--transition-fast)",
        DEFAULT: "var(--transition-default)",
        slow: "var(--transition-slow)",
        slower: "var(--transition-slower)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--ease-default)",
        in: "var(--ease-in)",
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
        bounce: "var(--ease-bounce)",
      },

      /* ============================================
       * MAX-WIDTH (container sizes)
       * ============================================ */
      maxWidth: {
        prose: "var(--prose-max-width)",
        "container-xs": "var(--container-xs)",
        "container-sm": "var(--container-sm)",
        "container-md": "var(--container-md)",
        "container-lg": "var(--container-lg)",
        "container-xl": "var(--container-xl)",
        "container-2xl": "var(--container-2xl)",
        "container-3xl": "var(--container-3xl)",
        "container-4xl": "var(--container-4xl)",
        "container-5xl": "var(--container-5xl)",
        "container-6xl": "var(--container-6xl)",
        "container-7xl": "var(--container-7xl)",
        "container-full": "var(--container-full)",
      },

      /* ============================================
       * HEIGHT (viewport units)
       * ============================================ */
      height: {
        screen: "var(--vh-full)",
        "screen-safe": "var(--dvh-full)",
        "screen-small": "var(--svh-full)",
      },
      minHeight: {
        screen: "var(--vh-full)",
        "screen-safe": "var(--dvh-full)",
        "screen-small": "var(--svh-full)",
      },

      /* ============================================
       * ASPECT RATIO
       * ============================================ */
      aspectRatio: {
        video: "var(--aspect-video)",
        photo: "var(--aspect-photo)",
        portrait: "var(--aspect-portrait)",
        wide: "var(--aspect-wide)",
        golden: "var(--aspect-golden)",
      },

      /* ============================================
       * ANIMATIONS
       * ============================================ */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
