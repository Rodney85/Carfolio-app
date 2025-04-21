/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#F38A6E", // Lighter tomato
          400: "#F1764F", // Light tomato
          500: "#F06543", // Tomato
          600: "#D84C2B", // Darker tomato
          700: "#C03A1C", // Darkest tomato
        },
        secondary: {
          300: "#F5B77F", // Lighter sandy brown
          400: "#F2A968", // Light sandy brown
          500: "#F09D51", // Sandy brown
          600: "#D88A3E", // Darker sandy brown
          700: "#C0772B", // Darkest sandy brown
        },
        dark: {
          900: "#0D0630", // Russian violet (primary dark bg)
          800: "#1A1245", // Slightly lighter violet
          700: "#271E5A", // Lighter violet
          600: "#342A6F", // Even lighter violet
        },
        light: {
          100: "#FFFFFF", // White
          200: "#F5F5F7", // Lightest gray
          300: "#E8E9EB", // Anti-flash white
          400: "#E0DFD5", // Alabaster
        },
      },
    },
  },
  plugins: [],
}