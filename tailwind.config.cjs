module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"], 
      },
      colors: {
        "main-orange":"#F38001",
        "dark-main":"#1E1E1E",
        "#202224":"#202224",
        "#717171":"#717171",
        "light-bg":"#F2F2F2",
        "light-text":"#717171", 
        "white":"#FFFFFF",
        "stroke-light":"#E2E2E2", 
        "gx-black": "#191919", 
        "header-background-primary": "#0687EF",
        "filter-color": "#DBEEFF", 
        "success-green":"#00B69B",
        "danger-red":"#F93C65",
        "#606060":"#606060",
        "#FFEEDB":"#FFEEDB",
        "light-border": "#E5E8E8",
        "link-color": "#7C5EF2"
      },
      backgroundColor: {
        "header-primary": "#0687EF",
        "header-selected-filter":"#0C73CB",
        "filter-color": "#DBEEFF"
      },
      screens: {
        '2xl': '1440px',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        large: '1.125rem',
        xl: '1.25rem',
        xxl: '1.5rem',
        heading: '2rem',
         
    },
    },
  },
 
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
