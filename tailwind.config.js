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
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        subtleZoom: {
          '0%, 100%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'check': 'check 0.5s ease-out 0.2s both',
        'float-1': 'float 8s ease-in-out infinite',
        'float-2': 'float 12s ease-in-out infinite',
        'float-3': 'float 10s ease-in-out infinite',
        'subtle-zoom': 'subtleZoom 20s ease-in-out infinite',
      }
    }
  },
  plugins: [],
} 