/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    // colors : {
    //   "beh-orange" : "#F12B24",
    //   "beh-gray" : "#616161",
    //   "beh-green-light" : "#58E716",
    //   "beh-green-dark" : "40A951",
    //   "beh-red" : "#F12B24" 
    // },
    // screens : {
    //   'xs' : "380px",
    //   'sm': '576px',
    //   'md' : "960px",
    //   'lg' : '1280px',
    //   'xl' : '1440px',
    //   '2xl' : '1600px'
    // }
  },
  
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
