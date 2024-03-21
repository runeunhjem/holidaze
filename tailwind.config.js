/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this line if you're using TypeScript
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a", // blue-900
        // hoverPrimary: "###bfdbfe", // blue-200
        secondary: "#bfdbfe", // grey-200
        buttonBg: "#3d363b", //
        buttonText: "#cebec9", //
        hoverButtonText: "#c759a4", //
      },
      maxWidth: {
        200: "200px",
        300: "300px",
        400: "400px",
        600: "600px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
      },
      outline: {
        // Define your custom widths here
        0: "0",
        1: "1px",
        2: "2px",
        3: "3px",
        // Add more as needed
      },
    },
  },
  darkMode: "class",
  plugins: [],
};



