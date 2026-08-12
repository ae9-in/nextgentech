import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#FFFFFF', soft: '#F4F8F8' },
        paper: '#FFFFFF',
        navy: {
          950: '#0A1E33',
          800: '#0F2A45',
          600: '#1B3F60',
          300: '#6E859B',
        },
        teal: {
          700: '#0B6E74',
          500: '#0E8C93',
          300: '#7FC4C8',
          100: '#E4F3F3',
        },
        orange: {
          600: '#E06A24',
          500: '#F2803A',
          100: '#FDE9DC',
        },
        hairline: '#E1E8E8',
        textPrimary: '#0A1E33',
        textSecondary: '#4B6072',
        textInverse: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Inter', 'sans-serif'],
        display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
