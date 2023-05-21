/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [
    "./views/*.ejs",
    "./views/partials/*.ejs",
    "./public/*.{html, js, css, csv}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
