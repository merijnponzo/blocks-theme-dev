export const getWrapperClass = (props, isCustomDimensions) => {
  // default dimensions
  let createdDimensionClass = "w-full h-full";
  if (isCustomDimensions) {
    createdDimensionClass = `w-${props.desktopWidth * 64} h-${
      props.desktopHeight * 64
    }`;
  }
  const WrapperArray = [
    "flex",
    "max-sm-aspect:" + props.aspectRatioMobile,
    "aspect-" + props.aspectRatio,
    createdDimensionClass,
  ];
  const createdWrapperClass = WrapperArray.join(" ");
  return createdWrapperClass;
};

export const getImageClass = (props) => {
  const ImageArray = [
    props.imageEffect,
    props.imageFilter,
    props.imageScale,
    "object-" + props.imageFit,
    "object-" + props.imagePosition,
    "max-w-full",
    "max-h-full",
  ];
  const createdImageClass = ImageArray.join(" ");
  return createdImageClass;
};

export const getGridClass = (props) => {
  const { scrollProps } = props;

  const MobileScrollClass = scrollProps.mobile
    ? "scrollslide--mobile"
    : "grid--mobile";
  const TabletScrollClass = scrollProps.tablet
    ? "scrollslide--tablet"
    : "grid--tablet";
  const DesktopScrollClass = scrollProps.desktop
    ? "scrollslide--desktop"
    : "grid--desktop";

  const GridArray = [DesktopScrollClass, TabletScrollClass, MobileScrollClass];
  const createdGridClass = GridArray.join(" ");
  return createdGridClass;
};

export default { getWrapperClass, getImageClass, getGridClass };
