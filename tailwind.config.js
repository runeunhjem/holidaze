/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this line if you're using TypeScript
  ],
  theme: {
    extend: {
      colors: {
        primary: "##ffd000", // Example primary color
        secondary: "#00aeff", // Example secondary color
      },
      maxWidth: {
        '1200': '1200px',
      }
    },
  },
  darkMode: "selector",
  plugins: [],
};


