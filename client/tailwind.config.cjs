/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "depth-0": "#111111",
        "depth-1": "#151515",
        "depth-2": "#222222",
        "depth-3": "#333333",
        "depth-4": "#444444",
        "text-1": "#eeeeee",
        "text-2": "#aaaaaa",
        "text-3": "#666666",
        "text-4": "#555555",
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
