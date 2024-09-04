/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,css}"],
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
      'dark-jungle-green-2': "#212224",
      'baltic-sea': "#282B30",
      'dodger-blue': "#4E80EE",
      'cornflower-blue': "#7395E0",
      'mid-grey': "#5b5f6b",
      'pale-sky': "#6C727F",
      'iron': "#D2D5DA",
    },
    fontFamily: {
      sans: ["Be Vietnam Pro Regular", "sans-serif"],
      serif: ["Be Vietnam Pro Regular", "serif"],
      "light": ["Be Vietnam Pro Light", "serif"],
      "medium": ["Be Vietnam Pro Medium", "serif"],
      "regular": ["Be Vietnam Pro Regular", "serif"],
      "semibold": ["Be Vietnam Pro SemiBold", "serif"],
      "bold": ["Be Vietnam Pro Bold", "serif"],
      "extrabold": ["Be Vietnam Pro ExtraBold", "serif"],
      "black": ["Be Vietnam Pro Black", "serif"],
    },
    extend: {
      borderRadius: {
        "5": "5px",
        "sm": "10px",
        "small": "15px",
        "md": "20px",
        "lg": "100px",
      },
      borderWidth: {
        "05": "0.5px",
        "1": "1px",
        "3": "3px"
      },
      minWidth: {
        "800": "800px",
        "850": "850px",
        "1100": "1100px",
      },
      width: {
        "30": "120px",
        "54": "54px",
        "100": "420px",
        "108": "108px",
        "1": "1px"
      },
      maxWidth: {
        "1250": "1250px"
      },
      backgroundColor: {
        "transparent": "transparent"
      },
      backgroundImage: {
        // 'check':"url('assets/svg/check.svg')",
      }
    },
  },
  plugins: [],
};
