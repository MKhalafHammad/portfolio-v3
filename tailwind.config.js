/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#003285',    // Navy Blue
        secondary: '#FF7F3E',  // Orange
        accent: '#FFDA78',     // Yellow
      }
    }
  },
  plugins: [],
};
