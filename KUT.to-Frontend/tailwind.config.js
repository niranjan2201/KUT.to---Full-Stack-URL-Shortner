/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'navbar-blend': 'rgba(30, 30, 30, 0.8)', // Example blend color
      },
    },
  },
  plugins: [],
}
