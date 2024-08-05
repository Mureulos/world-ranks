/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      mobile: {'max': '500px'},
      tablet: {'min': '500px', 'max': '850px'},
      laptop: {'min': '850px', 'max': '1280px'},
      desktop: {'min': '1280px'} ,
    },
    colors: {
      'dark-jungle-green': "#1B1D1F",
      'baltic-sea': "#282B30",
      'dodger-blue': "#4E80EE",
      'pale-sky': "#6C727F",
      'iron': "#D2D5DA",
    },
    fontFamily: {
      sans: ["Be Vietnam Pro Regular", "sans-serif"],
      serif: ["Be Vietnam Pro Regular", "serif"],
    },
    extend: {
      borderRadius: {
        "s": "10px",
        "md": "20px",
        "lg": "100",
      },
    },
  },
  plugins: [],
};
