/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./img/star.png')",
        'footer-texture': "url('/src/assets/footer-texture.svg')",
      },
    },
  },
  plugins: [],
}