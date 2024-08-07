/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      mobile: {'max': '500px'},
      onlytablet: {'min': '500px', 'max': '850px'},
      tablet: {'min': '500px',},
      onlylaptop: {'min': '850px', 'max': '1280px'},
      laptop: {'min': '850px', },
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
      "light": ["Be Vietnam Pro Light", "serif"],
      "medium": ["Be Vietnam Pro Medium", "serif"],
      "regular": ["Be Vietnam Pro Regular", "serif"],
      "bold": ["Be Vietnam Pro Bold", "serif"],
    },
    extend: {
      borderRadius: {
        "sm": "10px",
        "md": "20px",
        "lg": "100",
      },

      borderWidth: {
        "1": "1px"
      },

      minWidth: {
        "850": "850px"
      }
    },
  },
  plugins: [],
};
