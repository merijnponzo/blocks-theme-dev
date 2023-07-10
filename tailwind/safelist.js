const scales = [
  8,
  16,
  20,
  24,
  32,
  48,
  64,
  80,
  96,
  128,
  144,
  160,
  192,
  256,
  320,
  384,
  448,
  512,
  576,
  640,
  704,
  768,
  832,
  896,
  "1/3",
  "1/2",
  "1/4",
  "2/3",
  "3/4",
  "full",
  "clamp-1",
  "clamp-2",
  "clamp-3",
  "clamp-4",
  "clamp-5",
  "clamp-6",
  "clamp-7",
  "clamp-8",
  "clamp-9",
  "clamp-10",
];

const props = [
  "m-",
  "mx-",
  "my-",
  "ml-",
  "mr-",
  "mt-",
  "mb-",
  "p-",
  "px-",
  "py-",
  "pl-",
  "pr-",
  "pt-",
  "pb-",
  "max-w-",
  "h-",
  "w-",
  "min-h-",
  "min-w-",
  "max-w-",
  "gap-",
  "gap-x-",
  "gap-y-",
  "h-auto",
];

const Responsive = ["", "xs:", "md:", "xl:"];

const list = [];

// scale list
const list_1 = [];
scales.forEach((scale) => {
  Responsive.forEach((res) => {
    props.forEach((prop) => {
      list_1.push(res + prop + scale);
    });
  });
});

// add rounded
const Rounded = ["md", "lg", "xl", "2xl", "3xl", "full"];
const Corners = ["tl-", "tr-", "bl-", "br-", ""];
const list_2 = [];
Responsive.forEach((res) => {
  Rounded.forEach((rounded) => {
    Corners.forEach((corner) => {
      list_2.push(res + "rounded-" + corner + rounded);
    });
  });
});

// add rotation
const RotationValues = [0, 12, 45, 90, 180];
const list_3 = [];
Responsive.forEach((res) => {
  RotationValues.forEach((rotation) => {
    list_3.push(res + "rotate-" + rotation);
    // negative
    list_3.push(res + "-rotate-" + rotation);
  });
});

// add shadow
const ShadowValues = ["sm", "md", "lg", "xl", "2xl", "inner"];
const list_4 = [];
Responsive.forEach((res) => {
  ShadowValues.forEach((shadow) => {
    list_4.push(res + "drop-shadow-" + shadow);
  });
});

const AspectRatio = [
  "aspect-landscape",
  "aspect-portrait",
  "aspect-video",
  "aspect-square",
];
const list_5 = [];
Responsive.forEach((res) => {
  AspectRatio.forEach((ratio) => {
    list_5.push(ratio);
  });
});

const TransformValues = [0, 8, 16, 24, 32, 48, 64, 80, 96, 128, 144, 192];

const Transform = [
  "translate-x-",
  "translate-y-",
  "-translate-x-",
  "-translate-y-",
];

const list_7 = [];
Responsive.forEach((res) => {
  Transform.forEach((transform) => {
    TransformValues.forEach((value) => {
      list_7.push(res + transform + value);
    });
  });
});

// add flex
const FlexValues = [
  "flex",
  "flex-col",
  "flex-row",
  "flex-wrap",
  "items-start",
  "items-center",
  "items-end",
  "items-stretch",
  "justify-start",
  "justify-center",
  "justify-end",
  "justify-between",
  "shrink-0",
  "shrink-1",
  "flex-0",
  "flex-1",
  "order-1",
  "order-2",
  "order-3",
  "order-4",
  "flex-col-reverse",
  "flex-row-reverse",
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-3",
  "grid-cols-4",
  "grid-cols-5",
  "grid-cols-6",
  "grid-rows-1",
  "grid-rows-2",
  "grid-rows-3",
  "grid-rows-4",
  "grid-rows-5",
  "grid-rows-6",
  "items-stretch",
  "place-content-center",
  "place-content-start",
  "place-content-end",
  "place-content-between",
  "place-content-around",
  "place-content-evenly",
  "place-content-stretch",
  "place-items-center",
  "place-items-start",
  "place-items-end",
  "place-items-stretch",
  "place-items-baseline",
];

const list_6 = [];
Responsive.forEach((res) => {
  FlexValues.forEach((flex) => {
    list_6.push(res + flex);
  });
});

const list_x = [
  "grayscale",
  "saturate-50",
  "saturate-100",
  "blur-sm",
  "blur-lg",
  "contrast-50",
  "mx-auto",
  "container",
  "lg:grid",
  "md:grid",
  "xs:grid",
  "grid",
  "fill-current",
  "mx-auto",
  "z-0",
  "z-10",
  "z-20",
  "z-30",
  "z-40",
  "z-50",
  "left-0",
  "top-0",
  "relative",
  "absolute",
  "object-contain",
  "object-cover",
  "object-fill",
  "object-bottom",
  "object-center",
  "object-left",
  "object-left-bottom",
  "object-left-top",
  "object-right",
  "object-right-bottom",
  "object-right-top",
  "object-top",
  "max-h-full",
  "max-w-full",
  "w-full",
  "h-full",
  "text-primary",
  "text-secondary",
  "overflow-hidden",
  "opacity-10",
  "opacity-20",
  "opacity-30",
  "opacity-40",
  "opacity-50",
  "opacity-60",
  "opacity-70",
  "opacity-80",
  "opacity-90",
  "mix-blend-multiply",
  "place-content-center",
  "shrink-0",
  "shrink-1",
  "text-center",
  "text-right",
  "xl:text-center",
  "xl:text-right",
  "scale-100",
  "scale-95",
  "scale-90",
  "scale-75",
  "scale-50",
  "scale-105",
  "scale-110",
  "scale-125",
];

export const safelist = list.concat(
  list_1,
  list_2,
  list_3,
  list_4,
  list_5,
  list_6,
  list_7,
  list_x
);
