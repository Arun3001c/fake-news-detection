// tailwind.config.js
module.exports = {
  darkMode: "class", // Enable dark mode via class toggle
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/TS/JSX/TSX files in src/
  ],
  theme: {
    extend: {
      colors: {
        // These use your CSS variables so they work with theme switching
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // For styled form elements
    require("tailwindcss-animate"), // For animations
  ],
};
