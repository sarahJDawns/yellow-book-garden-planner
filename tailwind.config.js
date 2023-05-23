/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [
    "./views/*.ejs",
    "./views/partials/*.ejs",
    "./public/*.{html, js, css, csv}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {},
  },
  plugins: [],
};
