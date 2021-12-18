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
          150: '#EDF7FF',
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
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          width: '100%',
          '@screen sm': {
            maxWidth: '584px',
          },
          '@screen md': {
            maxWidth: '584px',
          },
          '@screen lg': {
            maxWidth: '798px',
          },
          '@screen xl': {
            maxWidth: '844px',
          },
          '@screen 2xl': {
            maxWidth: '1164px',
          },
        },
        '.large-container': {
          width: '100%',
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1024px',
          },
          '@screen xl': {
            maxWidth: '1425px',
          },
          '@screen 2xl': {
            maxWidth: '1920px',
          },
        },
        '.largest-container': {
          width: '100%',
          '@screen 2xl': {
            maxWidth: '1920px',
          },
        },
        '.onboarding-container': {
          width: '100%',
          '@screen md': {
            maxWidth: '468px',
          },
          '@screen xl': {
            maxWidth: '610px',
          },
        },
      });
    },
  ],
};
