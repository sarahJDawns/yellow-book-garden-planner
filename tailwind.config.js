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
    fontFamily: {
      body: ["Lato", "sans-serif"],
    },
    colors: {
      lightGray: (241, 245, 249),
      medGray: (203, 213, 225),
      darkGray: (148, 163, 184),
      yellow: rgb(255, 226, 18),
      lightOrange: rgb(253, 186, 116),
      mediumOrange: rgb(251, 146, 60),
      lightGreen: rgb(233, 255, 153),
      limeGreen: rgb(177, 255, 5),
      brightGreen: rgb(0, 237, 100),
      darkGreen: rgb(0, 104, 74),
      brightBlue: rgb(0, 110, 255),
      lightPurple: rgb(192, 132, 252),
    },
  },
};
