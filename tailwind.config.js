// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default { // <--- CHANGE THIS LINE FROM 'export default ='
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // Existing fadeInOut
        fadeInOut: {
          '0%, 100%': { opacity: '0' },
          '10%, 90%': { opacity: '1' },
        },
        // NEW KEYFRAME FOR MODAL
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        fadeInOut: 'fadeInOut 3s ease-in-out forwards',
        // NEW ANIMATION FOR MODAL
        scaleIn: 'scaleIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
