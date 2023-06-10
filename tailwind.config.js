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
      heading: ["IBM Plex Mono", "serif"],
      body: ["Lato", "sans-serif"],
    },
    colors: {
      bkgd: "#F0F2F5",
      accent: "#f2f2ed",
      lightGray: "#dbdbd9",
      darkGray: "#333333",
      lightOrange: "#ffcd6b",
      darkPinkOrange: "#FF4B4B",
      vDarkPinkOrange: "#FF3333",
      lightGreen: "#e9ff99",
      darkGreen: "#226600",
      darkBlue: "#0057E1",
      vDarkBlue: "#0043D0",
      lightPurple: "#c084fc",
      lightYellow: "#ecffa0",
      alert: "#FF0000",
    },
  },
};
