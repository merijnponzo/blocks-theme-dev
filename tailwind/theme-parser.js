/*
 * This file is used to parse the theme.json file from the theme to generate the tailwind config
 */

export function tailwindTheme(theme, parseJson) {
  if (parseJson) {
    theme = JSON.parse(theme);
  }
  // init 16 grid spacing
  const gridSpacing = require("./spacing.js");
  const spacing = gridSpacing.gridSpacing();
  // add colors
  let colors = {};
  theme.settings.color.palette.forEach((color) => {
    colors[color.slug] = color.color;
  });
  // add fonts and fontWeights
  let fonts = {};
  let fontWeights = {};
  theme.settings.typography.fontFamilies.forEach((fam) => {
    fonts[fam.slug] = fam.fontFamily.split(",");
    if (fam.fontFace) {
      // generate fontWeights
      fam.fontFace.forEach((face) => {
        fontWeights[face.fontWeight] = face.fontWeight;
      });
    }
  });
  // extend and create extra clampsizes
  const extendClamp = [
    {
      slug: "8",
      size: "clamp(16px, 1vw, 32px);",
    },
    {
      slug: "9",
      size: "clamp(16px, 1vw, 32px);",
    },
    {
      slug: "10",
      size: "clamp(16px, 1vw, 32px);",
    },
  ];
  // get clamps from theme.json
  const ClampSizes = theme.settings.spacing.spacingSizes.concat(extendClamp);
  ClampSizes.forEach((size) => {
    // add to spacing
    spacing["clamp-" + size.slug] = size.size;
  });

  // fontsizes
  let fontSizes = {};
  theme.settings.typography.fontSizes.forEach((size) => {
    // add font variables
    fontSizes[size.slug] = `var(--wp--preset--font-size--${size.slug})`;
  });

  const screens = {
    // max 320px
    xs: { max: "767px" },
    md: { min: "768px", max: "1139px" },
    xl: { min: "1140px" },
  };

  const aspectRatio = {
    portrait: "3 / 4",
      landscape: "4 / 3",
  };

  const container = {
    center: true,
    padding: {
      DEFAULT: "1.6rem",
      sm: "2rem",
      lg: "4rem",
    },
  };

  // screens
  return {
    fonts: fonts,
    fontWeights: fontWeights,
    colors: colors,
    spacing: spacing,
    fontSizes: fontSizes,
    screens: screens,
    aspectRatio: aspectRatio,
    container:container
  };
}
