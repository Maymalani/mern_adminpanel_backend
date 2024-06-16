/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,js}",
    './src/Components/*.{html,js}'
  ],
  theme: {
    extend: {},
    screens:{
      'xs':"575px",
      'sm':"768px",
      'md':"992px",
      'lg':'1200px',
      'xl':'1400px'
    }
  },
  plugins: [],
}

