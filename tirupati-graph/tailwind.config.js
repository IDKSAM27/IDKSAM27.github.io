/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'text-light': '#020617',
        'text-dark': '#E2E8F0',
        'accent-light': '#4E5C58',
        'accent-dark': '#FDE047',
        'hero-1-light': '#F9F6F1',
        'hero-2-light': '#BFD8D2',
        'skills-light': '#E7CCCC',
        'projects-light': '#A2C4F2',
        'contact-light': '#D9C8E2',
        'homelab-light': '#E2ECE9',
        'logo-light': '#1E293B',
        'hero-1-dark': '#212121',
        'hero-2-dark': '#2A2E35',
        'skills-dark': '#3B2F3E',
        'projects-dark': '#243447',
        'contact-dark': '#56416D',
        'homelab-dark': '#1A2421',
        'logo-dark': '#B8BFC9',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
