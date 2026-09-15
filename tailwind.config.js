/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          blue: '#3155E7',
          deepBlue: '#15559A',
          teal: '#35D0B5',
          green: '#4CAF50',
          coral: '#FF6680',
          orange: '#FFBD58',
          bg: '#F4F6F8',
          card: '#FFFFFF',
          dark: '#333333',
          muted: '#777777',
          lightBorder: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'portal': '0 2px 8px -2px rgba(21, 85, 154, 0.08), 0 4px 16px -4px rgba(21, 85, 154, 0.05)',
        'portal-lg': '0 8px 30px -4px rgba(21, 85, 154, 0.12)',
        'card-hover': '0 10px 25px -5px rgba(49, 85, 231, 0.1)',
      }
    },
  },
  plugins: [],
}
