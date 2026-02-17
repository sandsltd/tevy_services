import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tevy-teal': '#3E797F',
        'tevy-gray': '#706F6F',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.2' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'check': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.8)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.1)'
          },
          '100%': { 
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'check': 'check 0.5s ease-out 0.2s both'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config 