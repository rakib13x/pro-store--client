/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        figtree: "var(--font-figtree)",
        fredoka: "var(--font-fredoka)",
      },
      colors: {
        "primary-100": "#DB6885",
        "primary-50": "#FFD3D7",
        "primary-25": "#F5EAEB",
        "primary-10": "#FFF4F5",
        "secondary-100": "#2F3137",
        "secondary-50": "#707070",
        "secondary-10": "#C7C7C7",
        "additional-yellow": "#FFC107",
      },
    },
  },
  plugins: [],
};
