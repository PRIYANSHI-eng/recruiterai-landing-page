/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", // The main button color
          dark: "#2563EB",
          light: "#60A5FA",
        },
        accent: {
          1: "#A5D8FF",
          2: "#D0BCFF",
          3: "#B197FC",
        },
        secondary: {
          DEFAULT: "#F3F5FF", // Light background
          dark: "#E0E3FF",
        },
        text: {
          main: "#1A1A2E",
          muted: "#6B7280",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
