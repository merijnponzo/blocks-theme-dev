/*
  This is the default config 
*/
const fs = require("fs");
const themeJson = fs.readFileSync("./theme.json");
const parser = require("./theme-parser.js");
const theme = parser.tailwindTheme(themeJson, true);

export const config = {
  content: [],
  safelist: ["container"],
  theme: {
    fontFamily: theme.fonts,
    fontWeight: theme.fontWeights,
    container: theme.container,
    extend: {
      fontSize: theme.fontSizes,
      colors: theme.colors,
      spacing: theme.spacing,
      gap: theme.spacing,
      minWidth: theme.spacing,
      maxWidth: theme.spacing,
      minHeight: theme.spacing,
      maxHeight: theme.spacing,
      aspectRatio: theme.aspectRatio,
      screens: theme.screens
    },
  },
  plugins: [],
};
