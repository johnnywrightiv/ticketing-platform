import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: 'hsl(var(--text))',
          muted: 'hsl(var(--text-muted))',
        },
        background: 'hsl(var(--background))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        foreground: 'hsl(var(--foreground))',
      },
      backgroundImage: {
        gradient: 'var(--gradient)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        slideDown: {
          from: {
            height: '0',
            opacity: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
            opacity: '1',
          },
        },
        slideUp: {
          from: {
            height: 'var(--radix-accordion-content-height)',
            opacity: '1',
          },
          to: {
            height: '0',
            opacity: '0',
          },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'slide-down': 'slideDown 300ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
      },
    },
    container: {
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      sans: ['var(--font-geist-sans)', 'Arial', 'sans-serif'],
      mono: ['var(--font-geist-mono)', 'monospace'],
      body: ['var(--font-body)', 'serif'],
      heading: ['var(--font-heading)', 'serif'],
    },
  },
};

export default config;
