import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import ResponsiveImage from "../../helpers/responsiveImage";

export default function save({ attributes }) {
  const {
    media,
    imageClass,
    isBanner,
    customClass,
  } = attributes;

  // set classes
  const blockProps = useBlockProps.save(
    { className: `relative overflow-hidden ${customClass}` }
  );

  // set inner blocks as banner wrapper
  const { children, ...innerBlocksProps } = useInnerBlocksProps.save({
    className:
      "z-10 absolute top-0 left-0 w-full h-full flex items-center justify-center",
  });

  return (
    <div {...blockProps}>
        <ResponsiveImage media={media} imageClass={imageClass} extraClass={""} />
        {isBanner ? <div {...innerBlocksProps}>{children}</div> : null}
    </div>
  );
}
