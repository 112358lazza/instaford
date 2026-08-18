/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ford: {
          blue: '#002C6C',
          lightBlue: '#1064E0',
          accent: '#FF4A00', // Raptor Orange / Bronco Wild accent
          dark: '#0B0F19',
          card: '#161B26',
          metal: '#2B3245'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Impact', 'Teko', 'system-ui', 'sans-serif']
      },
      aspectRatio: {
        'story': '9 / 16'
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shutter-ring': 'ring 0.3s ease-out',
        'flash': 'flash 0.4s ease-out'
      },
      keyframes: {
        flash: {
          '0%': { opacity: '1', backgroundColor: '#ffffff' },
          '100%': { opacity: '0', backgroundColor: '#ffffff' }
        }
      }
    },
  },
  plugins: [],
}
