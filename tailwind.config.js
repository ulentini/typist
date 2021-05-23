module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mono: ["PT Mono", "monospaced"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
