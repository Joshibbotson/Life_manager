/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      minHeight: {
        90: '90svh',
      },
      maxWidth: {
        xxs: '5rem',
        xxxs: '1rem',
      },
    },
  },
  plugins: [],
}
