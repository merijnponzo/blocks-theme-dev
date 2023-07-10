function getSpacing() {
  // create grid based on 16px
  const spacing = {};
  // create some minimal values below division of 16
  const minimalValues = [0, 1, 2, 4, 6, 8, 10, 12, 14, 18, 20, 22, 24, 32];
  for (let i = 0; i < minimalValues.length; i++) {
    let minimalValue = minimalValues[i];
    spacing[minimalValue] = minimalValue / 16 + "rem";
  }
  for (let i = 1; i < 1030 / 16; i++) {
    const gridsize = i * 16;
    spacing[gridsize] = i + "rem";
  }
  return spacing;
}

export const gridSpacing = () => {
  // create grid based on 16px
  const spacingRem = getSpacing();
  return spacingRem;
};
