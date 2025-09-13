/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'card-gradient': 'linear-gradient(to bottom right, var(--tw-gradient-stops))'
      },

       
        // Refined blue and white color system
      colors: {
  

        // New base colors
        background: {
          DEFAULT: "#132554",    // Brighter blue
          dark: "#040B14",       // Darker blue
          light: "#132554",      // Lighter blue
          secondary: "#111113"
        },
        primary: {
          DEFAULT: "#2563eb",    // Brighter blue
          light: "#60a5fa",      // Light blue
          dark: "#1d4ed8",       // Darker blue
          foreground: "#FFFFFF"
        },
        accent: {
          DEFAULT: "#3b82f6",    // New accent blue
          light: "#93c5fd",      // Light accent
          dark: "#2563eb",       // Dark accent
          foreground: "#FFFFFF"
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.1)",
          secondary: "rgba(255, 255, 255, 0.05)"
        },
        content: {
          DEFAULT: "#FFFFFF",
          secondary: "#bed4e9",  // Soft blue gray
          muted: "#8f5774"       // Muted pink
        },
        text: {
          DEFAULT: "white",
          primary: "cyan-300",
          secondary: "cyan-200",  // Soft blue gray
          description: "gray-400"
        },

      }
    }
  },
  plugins: [
    plugin(function({ addBase }) {
      addBase({
        ':root': {
          '--primary': '#0855b1',
          '--secondary': '#036264',
          '--accent': '#4fa5d8',
          '--background': '#132554',
        }
      })
    })
  ]
}

