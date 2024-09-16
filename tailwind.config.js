/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#008631",
        gray: {
          hover: "#E2E2E1",
          active: "#C2C3C1",
          normal: "#3B3C36",
          "normal-hover": "#353631",
          "normal-active": "#2F302B",
        },
        green: {
          light: "#E6F7EC",
          "light-hover": "#D9F4E3",
          "light-active": "#B0E7C4",
          normal: "#00B341",
          "normal-hover": "#007329",
          "normal-active": "#006021",
          dark: "#008631",
        },
        background: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
