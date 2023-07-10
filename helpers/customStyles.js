// scaleSteps
let smallScale = [8, 16, 20, 24, 32, 48, 64];
let mediumScale = [80, 96, 128, 144, 192, 256, 320, 384];
let largeScale = [448, 512, 576, 640, 704, 768, 832, 896];
let percentScale = ["auto", "1/3", "1/2", "1/4", "2/3", "3/4", "full"];
let roundedScale = ["md", "lg", "xl", "2xl", "3xl", "full"];
let shadowScale = ["sm", "md", "lg", "xl", "2xl", "inner"];
let rotateScale = [0, 12, 45, 90, 180];
let orderScale = [1, 2, 3, 4, 5];
let transformScale = [0, 8, 16, 24, 32, 48, 56, 64, 80, 96, 128, 144, 192];

let aspectRatio = [
  { label: "Video", id: "aspect-video", active: false },
  { label: "Landscape", id: "aspect-landscape", active: false },
  { label: "Square", id: "aspect-square", active: false },
  { label: "Portrait", id: "aspect-portrait", active: false },
  { label: "Circle", id: "rounded-full overflow-hidden", active: false },
];

let shrinkValues = [
  { label: "No Shrink", id: "shrink-0", active: false },
  { label: "Shrink", id: "shrink-1", active: false },
];

// map scaleSteps to array with objects with label and id
const mapScale = (scale) => {
  return scale.map((step) => {
    return { label: step, id: step.toString(), active: false };
  });
};

smallScale = mapScale(smallScale);
mediumScale = mapScale(mediumScale);
largeScale = mapScale(largeScale);
percentScale = mapScale(percentScale);
roundedScale = mapScale(roundedScale);
rotateScale = mapScale(rotateScale);
shadowScale = mapScale(shadowScale);
orderScale = mapScale(orderScale);
transformScale = mapScale(transformScale);

// export default an object dimension, no prefix for modifer
export const shapes = {
  id: "shapes",
  units: [...aspectRatio],
  modifiers: {
    // we use prefix here only as an identifier
    aspectRatio: { label: "Shape", prefix: "no_ " },
  },
};

export const rotation = {
  id: "rotation",
  units: [...rotateScale],
  modifiers: {
    rotateRight: { label: "Rotation Right", prefix: "rotate-" },
    rotateLeft: { label: "Rotation Left", prefix: "-rotate-" },
  },
};

export const dimension = {
  id: "dimension",
  units: [...percentScale, ...smallScale, ...mediumScale, ...largeScale],
  modifiers: {
    maxwidth: { label: "Max Width", prefix: "max-w-" },
    height: { label: "Exact Height", prefix: "h-" },
    minheight: { label: "Min Height", prefix: "min-h-" },
    width: { label: "Exact Width", prefix: "w-" },
  },
};

export const padding = {
  id: "padding",
  units: [...smallScale],
  modifiers: {
    around: { label: "Around", prefix: "p-" },
    left: { label: "Left", prefix: "pl-" },
    right: { label: "Right", prefix: "pr-" },
    top: { label: "Top", prefix: "pt-" },
    bottom: { label: "Bottom", prefix: "pb-" },
    x: { label: "Horizontal", prefix: "px-" },
    y: { label: "Vertical", prefix: "py-" },
  },
};

export const margin = {
  id: "margin",
  units: [...percentScale, ...smallScale],
  modifiers: {
    around: { label: "Around", prefix: "m-" },
    left: { label: "Left", prefix: "ml-" },
    right: { label: "Right", prefix: "mr-" },
    top: { label: "Top", prefix: "mt-" },
    bottom: { label: "Bottom", prefix: "mb-" },
    x: { label: "Horizontal", prefix: "mx-" },
    y: { label: "Vertical", prefix: "my-" },
  },
};

export const rounded = {
  id: "rounded",
  units: [...roundedScale],
  modifiers: {
    around: { label: "Around", prefix: "rounded-" },
    topleft: { label: "Top Left", prefix: "rounded-tl" },
    topright: { label: "Top Right", prefix: "rounded-tr" },
    bottomleft: { label: "Bottom Left", prefix: "rounded-bl" },
    bottomright: { label: "Bottom Right", prefix: "rounded-br" },
  },
};

export const gap = {
  id: "gap",
  units: [...smallScale],
  modifiers: {
    around: { label: "Around", prefix: "gap-" },
    x: { label: "Horizontal", prefix: "gap-x-" },
    y: { label: "Vertical", prefix: "gap-y" },
  },
};

export const shadow = {
  id: "shadow",
  units: [...shadowScale],
  modifiers: {
    around: { label: "Shadow", prefix: "drop-shadow-" },
  },
};

export const order = {
  id: "order",
  units: [...orderScale],
  modifiers: {
    around: { label: "Order", prefix: "order-" },
  },
};

export const shrink = {
  id: "shrink",
  units: [...shrinkValues],
  modifiers: {
    // we use prefix here only as an identifier
    aspectRatio: { label: "Shrink", prefix: "no_ " },
  },
};

export const transform = {
  id: "transform",
  units: [...transformScale],
  modifiers: {
    transformx: { label: "Position X", prefix: "translate-x-" },
    transformy: { label: "Position Y", prefix: "translate-y-" },
    transform_x: { label: "-Position X", prefix: "-translate-x-" },
    transform_y: { label: "-Position Y", prefix: "-translate-y-" },
  },
};
export default {
  dimension,
  padding,
  margin,
  rounded,
  gap,
  order,
  shrink,
  transform,
  rotation,
  shapes,
  shadow,
};
