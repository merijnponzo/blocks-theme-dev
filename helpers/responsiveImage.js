// fix
export default function ResponsiveImage(props) {
  const { media, imageClass, extraClass } = props;
  const { url, alt, width, height, sizes } = media;

  let thumbnailImg = url;
  let mediumImg = url;
  let largeImg = url;
  let defaultImg = url;

  if (sizes !== undefined && sizes.length > 0 ) {
    const { thumbnail, medium, large } = sizes;
    let thumbnailImg = thumbnail;
    let mediumImg = medium;
    let largeImg = large;
    let defaultImg = medium;
  }

  return (
    <picture className="w-full h-full">
      {thumbnailImg ? (
        <source
          media="(max-width: 576px)"
          srcSet={thumbnailImg}
          className={`${imageClass} ${extraClass}`}
        />
      ) : null}
      {mediumImg ? (
        <source
          media="(min-width: 768px)"
          srcSet={mediumImg}
          className={`${imageClass} ${extraClass}`}
        />
      ) : null}
      {largeImg ? (
        <source
          media="(min-width: 1200px)"
          srcSet={largeImg}
          className={`${imageClass} ${extraClass}`}
        />
      ) : null}
      {mediumImg ? (
        <img src={mediumImg} alt={alt} className={`${imageClass} ${extraClass}`} />
      ) : null}
    </picture>
  );
}
