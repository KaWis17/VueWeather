/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-primary": "#5484dd",
        "background": "#86A8E7",
      },
    },
    fontFamily:{
      Roboto: ["Roboto, sans-serif"],
    },
    container:{
      padding: "2rem",
      center: "true",
    },
    screens:{
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
}

