/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#607EAA',
        'light-blue': '#748DA6',
        'pastel-blue': '#6E85B7',
      },
      spacing:{
        160: '40rem',
        130: '32.5rem'
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
