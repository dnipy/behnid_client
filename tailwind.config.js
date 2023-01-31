/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    colors : {
      "beh-orange" : "#FF6B01",
      "beh-gray" : "#616161",
      "beh-gray-dark" : "#4E4E4E",
      "beh-gray-light" : "#CDCDCD",
      "beh-green-light" : "#6CB7A5",
      "beh-green-super-light" : "#16DAAB",
      "beh-gray-mid-ligth" : "#707070",
      "beh-red" : "#FF0000",
      "beh-yellow" : "#E9CB2D",
      "beh-bg" : "#F1F1F1", 
      "beh-text-gray" : "#959595",
      "white" : "#ffffff",
      "black" : "#000000"
    },
  },
}
