module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          350: '#5F5F5F',
        },
        cyan: {
          250: '#BCE3FF',
        },
      },
      fontSize: {
        '5xl': '3.125rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
