/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      red: "#FF2626",
      blue: {
        100: "#0088DA",
        40: "#BAC6D8",
        30: "#CBD4E2",
        15: "#E5EAF0",
        10: "#EEF1F5",
        5: "#F6F8FA",
        0: "#F5F8FD",
      },
      anthracite: {
        100: "#1A2328",
        80: "#484F53",
        70: "#5F6569",
        50: "#8C9193",
        25: "#C6C8C9",
      },
    },
  },
  plugins: [],
};
