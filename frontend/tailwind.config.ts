import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f4f7f4",
          100: "#e5ece6",
          200: "#cbdbcd",
          300: "#a3c1a6",
          400: "#74a079",
          500: "#508256",
          600: "#3d6842",
          700: "#325336",
          800: "#2a422d",
          900: "#182c1b",
          950: "#0c170e",
        },
        ivory: {
          50: "#fdfcf9",
          100: "#faf7f0",
          200: "#f3ede0",
          300: "#e9ddca",
          400: "#d9c5a6",
          500: "#c7aa81",
        },
        gold: {
          50: "#faf8f2",
          100: "#f3eedf",
          200: "#e6dac0",
          300: "#d4be98",
          400: "#c19e68",
          500: "#b58c49",
          600: "#9f733a",
          700: "#80582e",
          800: "#68462a",
        },
        charcoal: {
          50: "#f6f7f8",
          100: "#eceef0",
          200: "#d5d9de",
          300: "#b0b8c2",
          400: "#8490a0",
          500: "#647183",
          600: "#4e596b",
          700: "#3f4756",
          800: "#2a2f39",
          900: "#1a1d23",
          950: "#111317",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Mukta Malar'",
          "sans-serif",
        ],
        serif: ["Georgia", "Cambria", "'Times New Roman'", "serif"],
        tamil: ["'Mukta Malar'", "'Latha'", "'Tiro Tamil'", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)",
        card: "0 4px 20px -2px rgba(16, 24, 20, 0.06), 0 2px 6px -1px rgba(16, 24, 20, 0.03)",
        elevated: "0 10px 30px -4px rgba(16, 24, 20, 0.1), 0 4px 10px -2px rgba(16, 24, 20, 0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;
