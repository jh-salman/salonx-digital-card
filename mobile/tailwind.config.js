/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: "#ff7819",
        // primary: "pink",
        secondary: "#151312",
      
        // Accent color
        accent: "#AB8BFF",

        // Light theme palette
        lightTheme: {
          background: "#ffffff",
          text: "#1a1a1a",
          card: "#f9f9f9",
          border: "#e5e5e5",
        },

        // Dark theme palette
        darkTheme: {
          background: "#0f0d23",
          text: "#f5f5f5",
          card: "#1a1a2a",
          border: "#2a2a40",
        },
      },
    },
  },
  plugins: [],
};