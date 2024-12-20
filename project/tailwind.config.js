/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'from-indigo-500',
    'to-indigo-600',
    'text-indigo-600',
    'text-indigo-400',
    'border-indigo-500',
    'shadow-indigo-200',
    'shadow-indigo-900',
    'from-purple-500',
    'to-purple-600',
    'text-purple-600',
    'text-purple-400',
    'border-purple-500',
    'shadow-purple-200',
    'shadow-purple-900',
    'from-pink-500',
    'to-pink-600',
    'text-pink-600',
    'text-pink-400',
    'border-pink-500',
    'shadow-pink-200',
    'shadow-pink-900',
  ]
}