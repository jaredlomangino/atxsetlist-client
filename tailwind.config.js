/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        'card-background': "#edf6f9",
        'card-button-hover': "#005057",
        'card-button': "#006d77"
      }
    },
  },
  plugins: [],
}

