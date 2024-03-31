/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
  },
  darkMode: 'selector',
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require("flowbite/plugin"),
  ],
};
