export default {
  plugins: {
    "postcss-import": {},
    "postcss-nesting": {}, // Make sure this is loaded before Tailwind
    tailwindcss: {},
    autoprefixer: {},
  },
};
