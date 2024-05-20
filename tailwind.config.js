/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '10.5': '42px',
      },
      backgroundImage: {
        'sustainability': "url('/src/assets/sustainability.jpg')"
      },
      fontFamily: {
        'display': ['Oswald', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
        'nunito': ['nunito', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'arial': ['Arial', 'sans-serif'],
        'verdana': ['Verdana', 'sans-serif'],
        'tahoma': ['Tahoma', 'sans-serif'],
        'lucida': ['Lucida Sans', 'sans-serif'],
        'impact': ['Impact', 'sans-serif'],
        'courier': ['Courier New', 'monospace'],
      },
      margin: {
        'mb-128': '32rem',
      }
    },
  },
  plugins: [],
}