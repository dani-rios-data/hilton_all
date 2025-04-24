/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hilton-blue': '#002F61',
        'hilton-off-white': '#F0E9E6',
        'turquoise': '#007293',
        'teal': '#06937E',
        'blue-tint': '#686B8C',
        'turquoise-tint': '#799CB6',
        'teal-tint': '#8FB3A7',
        'blue-shade': '#001137',
        'turquoise-shade': '#005670',
        'teal-shade': '#00614F',
        'border-color': '#E5E7EB',
        'inactive-tab': '#6B7280',
        'positive-change': '#059669',
        'grid-line': '#E5E7EB'
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 