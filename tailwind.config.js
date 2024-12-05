/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
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
        'fade-in': 'fade-in 0.6s ease-out',
        'check': 'check 0.5s ease-out 0.2s both'
      }
    }
  },
  plugins: [],
} 