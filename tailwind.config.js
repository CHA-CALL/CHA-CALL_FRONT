/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // White & Black
        white: '#ffffff',
        black: '#000000',
        black50: 'rgba(0, 0, 0, 0.5)',

        // Grayscale
        grayscale: {
          50: '#f8fafb',
          100: '#f2f3f7',
          200: '#e7eaef',
          300: '#ccced5',
          500: '#838992',
          700: '#565b65',
          900: '#19212a',
        },

        // Primary
        primary: {
          25: '#fff5f1',
          50: '#ffefe8',
          100: '#fdc1ac',
          300: '#fc9476',
          500: '#fa502e',
          700: '#f83419',
          900: '#e91c10',
        },
      },

      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Helvetica Neue',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'Malgun Gothic',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'sans-serif',
        ],
      },

      fontSize: {
        // Heading
        'heading-sb-20': ['2rem', { fontWeight: '600' }],
        'heading-sb-18': ['1.8rem', { fontWeight: '600' }],

        // Title
        'title-b-16': ['1.6rem', { fontWeight: '700' }],
        'title-b-14': ['1.4rem', { fontWeight: '700' }],
        'title-sb-16': ['1.6rem', { fontWeight: '600' }],
        'title-sb-14': ['1.4rem', { fontWeight: '600' }],
        'title-sb-12': ['1.2rem', { fontWeight: '600' }],

        // Body
        'body-m-16': ['1.6rem', { fontWeight: '500' }],
        'body-m-14': ['1.4rem', { fontWeight: '500' }],

        // Caption
        'caption-m-12': ['1.2rem', { fontWeight: '500' }],
        'caption-r-12': ['1.2rem', { fontWeight: '400' }],
        'caption-m-11': ['1.1rem', { fontWeight: '500' }],
        'caption-m-10': ['1.1rem', { fontWeight: '500' }],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        // Typography utilities
        '.heading-sb-20': {
          fontSize: '2rem',
          fontWeight: '600',
        },
        '.heading-sb-18': {
          fontSize: '1.8rem',
          fontWeight: '600',
        },
        '.title-b-16': {
          fontSize: '1.6rem',
          fontWeight: '700',
        },
        '.title-b-14': {
          fontSize: '1.4rem',
          fontWeight: '700',
        },
        '.title-sb-16': {
          fontSize: '1.6rem',
          fontWeight: '600',
        },
        '.title-sb-14': {
          fontSize: '1.4rem',
          fontWeight: '600',
        },
        '.title-sb-12': {
          fontSize: '1.2rem',
          fontWeight: '600',
        },
        '.body-m-16': {
          fontSize: '1.6rem',
          fontWeight: '500',
        },
        '.body-m-14': {
          fontSize: '1.4rem',
          fontWeight: '500',
        },
        '.caption-m-12': {
          fontSize: '1.2rem',
          fontWeight: '500',
        },
        '.caption-r-12': {
          fontSize: '1.2rem',
          fontWeight: '400',
        },
        '.caption-m-11': {
          fontSize: '1.1rem',
          fontWeight: '500',
        },
        '.caption-m-10': {
          fontSize: '1.1rem',
          fontWeight: '500',
        },

        // Scrollbar hide utility
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
