/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    screens: {
      // => @media (min-width: 640px) { ... }
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1380px',
      '2xl': '1536px',
      '3xl': '1750px',
      '4xl': '2000px',
    },
    extend: {
      fontFamily: {
        inter: 'Inter, sans-serif',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar-hide')],
}
