/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pRegular: ['Poppins-Regular'],
        pMedium: ['Poppins-Medium'],
        pBold: ['Poppins-Bold'],
        pSemiBold: ['Poppins-SemiBold'],
        pSemiBoldItalic: ['Poppins-SemiBoldItalic'],
        pLight: ['Poppins-Light'],
        pThin: ['Poppins-Thin'],
        pThinItalic: ['Poppins-ThinItalic'],
        pBoldItalic: ['Poppins-BoldItalic'],
        pItalic: ['Poppins-Italic'],
        pLightItalic: ['Poppins-LightItalic'],
        pMediumItalic: ['Poppins-MediumItalic'],
      },
      colors: {
        accent: "#00B341",
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
