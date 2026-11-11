/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF7F0',
          50: '#FFFFFF',
          100: '#FDFBF7',
          200: '#FAF7F0',
          300: '#F3EDE2',
          400: '#EBDDC9',
        },
        beige: {
          DEFAULT: '#E8D5BD',
          light: '#F2E6D5',
          dark: '#D8BE9F',
        },
        coffee: {
          DEFAULT: '#795548',
          light: '#8D6E63',
          dark: '#5D4037',
          deep: '#3E2723',
        },
        caramel: {
          DEFAULT: '#C68B59',
          light: '#D9A174',
          dark: '#AD713F',
        },
        cafeDark: {
          DEFAULT: '#29221E',
          soft: '#4A3E39',
          muted: '#73655D',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.28em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(41, 34, 30, 0.08)',
        'luxury-lg': '0 30px 60px -20px rgba(41, 34, 30, 0.12)',
        'soft': '0 10px 30px -10px rgba(121, 85, 72, 0.07)',
        'gold-glow': '0 0 25px rgba(198, 139, 89, 0.25)',
      }
    },
  },
  plugins: [],
}
