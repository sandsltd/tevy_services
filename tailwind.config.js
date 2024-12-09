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
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        'subtleZoom': {
          '0%, 100%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'pulse-warning': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.2,
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'star-wave': {
          '0%, 100%': { 
            transform: 'translateY(0)'
          },
          '10%': { 
            transform: 'translateY(-10px)'
          },
          '20%, 90%': { 
            transform: 'translateY(0)'
          }
        },
        'warning-flash': {
          '0%, 100%': { 
            opacity: '1',
            color: 'rgb(239, 68, 68)' // red-500
          },
          '50%': { 
            opacity: '0.5',
            color: 'rgb(220, 38, 38)' // red-600
          }
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'check': 'check 0.5s ease-out 0.2s both',
        'float-1': 'float 8s ease-in-out infinite',
        'float-2': 'float 12s ease-in-out infinite',
        'float-3': 'float 10s ease-in-out infinite',
        'subtle-zoom': 'subtleZoom 20s ease-in-out infinite',
        'pulse-warning': 'pulse-warning 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        'star-wave': 'star-wave 4s ease-in-out infinite',
        'warning-flash': 'warning-flash 2s ease-in-out infinite',
      }
    }
  },
  plugins: [],
} 