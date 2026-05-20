/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],

  theme: {
    extend: {
      keyframes: {
        'mesh-shift-1': {
          '0%, 100%': {
            transform: 'translate(0px, 0px)',
          },
          '33%': {
            transform: 'translate(30px, -50px)',
          },
          '66%': {
            transform: 'translate(-20px, 40px)',
          },
        },

        'mesh-shift-2': {
          '0%, 100%': {
            transform: 'translate(0px, 0px)',
          },
          '33%': {
            transform: 'translate(-40px, 30px)',
          },
          '66%': {
            transform: 'translate(50px, -20px)',
          },
        },

        'cursor-blink': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0,
          },
        },

        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },

      animation: {
        'mesh-shift-1': 'mesh-shift-1 15s infinite ease-in-out',
        'mesh-shift-2': 'mesh-shift-2 18s infinite ease-in-out',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },

  plugins: [],
};