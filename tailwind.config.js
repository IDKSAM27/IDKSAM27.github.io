/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Your color palette remains the same
        'text-light': '#020617',
        'text-dark': '#E2E8F0',
        'accent-light': '#4E5C58',
        'accent-dark': '#FDE047',
        'hero-1-light': '#F9F6F1',
        'hero-2-light':    '#BFD8D2',  
        'skills-light':    '#E7CCCC',
        'projects-light':  '#A2C4F2',  
        'contact-light':   '#D9C8E2',  
        'logo-light':      '#1E293B',  
        'hero-1-dark': '#212121',
        'hero-2-dark':    '#2A2E35',  
        'skills-dark':    '#3B2F3E',  
        'projects-dark':  '#243447',  
        'contact-dark':   '#56416D',  
        'logo-dark':      '#B8BFC9',  
      },
      fontFamily: {
        // THE FIX: Use the font name directly as a string.
        // Fontsource makes "BBH Sans Hegarty" available globally.
        heading: ['"BBH Sans Hegarty"', 'sans-serif'], 
        
        // These remain the same as they are still handled by next/font
        body: ['var(--font-inter)', 'sans-serif'],
        logo: ['var(--font-pacifico)', 'cursive'],
        fun: ['var(--font-pacifico)', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
