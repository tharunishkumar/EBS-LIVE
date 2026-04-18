/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          blue: '#0077ff',
          deep: '#0047ff',
          mid:  '#0066ee',
          dark: '#0055cc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(0,119,255,0.12)',
        'card-sm': '0 2px 8px rgba(0,0,0,0.04)',
      },
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
}

