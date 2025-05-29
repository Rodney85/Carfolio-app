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
          50: "#FEF3F0", // Lightest tomato
          100: "#FDE8E3", // Very light tomato
          200: "#FACFBF", // Light tomato
          300: "#F38A6E", // Lighter tomato
          400: "#F1764F", // Light tomato
          500: "#F06543", // Tomato
          600: "#D84C2B", // Darker tomato
          700: "#C03A1C", // Darkest tomato
          800: "#982D15", // Very dark tomato
          900: "#702010", // Extremely dark tomato
        },
        secondary: {
          50: "#FEF9F2", // Lightest sandy brown
          100: "#FDF3E5", // Very light sandy brown
          200: "#FAE7CA", // Light sandy brown
          300: "#F5B77F", // Lighter sandy brown
          400: "#F2A968", // Light sandy brown
          500: "#F09D51", // Sandy brown
          600: "#D88A3E", // Darker sandy brown
          700: "#C0772B", // Darkest sandy brown
          800: "#985C20", // Very dark sandy brown
          900: "#704418", // Extremely dark sandy brown
        },
        brand: {
          50: "#F0F5FF", // Lightest blue
          100: "#E0EBFF", // Very light blue
          200: "#C2D8FF", // Light blue
          300: "#9EC3FF", // Lighter blue
          400: "#7AAEFF", // Light blue
          500: "#5F9FFF", // Brand blue
          600: "#447BCC", // Darker blue
          700: "#2A5799", // Darkest blue
          800: "#1F3F70", // Very dark blue
          900: "#152C4D", // Extremely dark blue
        },
        dark: {
          900: "#0D0630", // Russian violet (primary dark bg)
          800: "#1A1245", // Slightly lighter violet
          700: "#271E5A", // Lighter violet
          600: "#342A6F", // Even lighter violet
          500: "#423786", // Medium violet
          400: "#574596", // Medium light violet
          300: "#6C53A6", // Light violet
        },
        light: {
          100: "#FFFFFF", // White
          200: "#F5F5F7", // Lightest gray
          300: "#E8E9EB", // Anti-flash white
          400: "#E0DFD5", // Alabaster
        },
        success: {
          100: "#DCFCE7", // Very light green
          500: "#22C55E", // Green
          700: "#15803D", // Dark green
        },
        warning: {
          100: "#FEF9C3", // Very light yellow
          500: "#EAB308", // Yellow
          700: "#A16207", // Dark yellow
        },
        danger: {
          100: "#FEE2E2", // Very light red
          500: "#EF4444", // Red
          700: "#B91C1C", // Dark red
        },
      },
      backgroundImage: {
        'gradient-card-light': 'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))',
        'gradient-card-dark': 'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glass': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
        'glass-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.09), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'gradient-x': 'gradient-x 10s ease infinite',
        'gradient-y': 'gradient-y 10s ease infinite',
        'gradient-xy': 'gradient-xy 10s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
      },
    },
  },
  plugins: [],
}