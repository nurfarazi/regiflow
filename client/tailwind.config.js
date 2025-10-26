/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#b3dbff',
          300: '#89c4ff',
          400: '#479eff',
          500: '#1c7ee8',
          600: '#0f63c6',
          700: '#094da0',
          800: '#083f82',
          900: '#072f5f',
        },
        accent: '#f59e0b',
        success: '#16a34a',
        warning: '#facc15',
        danger: '#dc2626',
        slate: {
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['"Inter var"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-card': '0 15px 30px rgba(15, 99, 198, 0.08)',
      },
    },
  },
  plugins: [],
};
