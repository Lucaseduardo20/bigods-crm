/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'marrom-escuro': '#342414',
        'marrom-claro': '#4c351e',
        'areia': '#b88e42',
        'pele': '#f1d588',
        'claro': '#ffecb9',
        'cinza-paleta': '#c4b58e',
      },
    },
  },
  plugins: [],
}

