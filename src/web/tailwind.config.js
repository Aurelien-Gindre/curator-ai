/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
/* npx tailwindcss -i input.css -o output.css --watch */

module.exports = {
  mode : 'jit',
  content: ["./**/*.{html,js,css}"],
  theme: {
    extend: {
      backgroundSize: {
        'size-200': '200% 200%',
    },
    backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
    },
      colors : {
        'grey' : '#E6E6E6',
        'light_blue' : '#3C67AD',
        'mid_blue' : '#2F509F',
        'black' : '#1A1A1A'
      }
    },
    fontFamily: {
      magnolia: ['Magnolia', 'sans-serif'],
      sans : ['ui-sans-serif','system-ui','sans-serif',"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"]
    },
  },
  plugins: [],
}

