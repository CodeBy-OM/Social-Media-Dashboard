/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom animations for our dashboard
      animation: {
        'blob': 'blob 7s infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.6s ease-out forwards',
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      // Custom colors for social media platforms
      colors: {
        instagram: {
          500: '#E4405F',
          600: '#C13584',
        },
        twitter: {
          500: '#1DA1F2',
        },
        linkedin: {
          500: '#0A66C2',
        },
      },
    },
  },
  plugins: [],
}