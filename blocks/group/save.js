import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import ResponsiveImage from "../../helpers/responsiveImage";
import ResponsiveVideo from "../../helpers/responsiveVideo";

export default function save({ attributes }) {
  const {
    url,
    rel,
    linkTarget,
    media,
    imageProps,
    imageClass,
    customClass,
    customFlexClass,
  } = attributes;

  /* should be refactored to ponzoClass helpers! */
  const blockProps = useBlockProps.save({
    className: `relative ${customClass}`,
  });

  // set innerBlockProps classes
  const { children, ...innerBlocksProps } = useInnerBlocksProps.save({
    className: `flex relative z-10 h-full w-full ${customFlexClass}`,
  });

  return (
    <div {...blockProps}>
      <div {...innerBlocksProps}>{children}</div>
      {media.id ? (
        <div className="absolute left-0 top-0 w-full h-full z-0">
          {media.type === "video" ? (
            <ResponsiveVideo
              media={media}
              imageClass={imageClass}
              extraClass={"absolute left-0 top-0 w-full h-full z-0"}
            />
          ) : (
            <ResponsiveImage
              media={media}
              imageClass={imageClass}
              extraClass={"absolute left-0 top-0 w-full h-full z-0"}
            />
          )}
        </div>
      ) : null}
      {url ? (
        <a
          rel="noopener noreferrer"
          target={linkTarget}
          href={url}
          title={rel}
          className="tile"
        ></a>
      ) : null}
    </div>
  );
}
