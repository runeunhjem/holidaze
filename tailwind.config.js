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
        secondary: "#ffffff", // Example secondary color
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};

