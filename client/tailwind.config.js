/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: "class",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        spotify: {
          DEFAULT: "#1ed760",
          dark: "#18ad4d",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
