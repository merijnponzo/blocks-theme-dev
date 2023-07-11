import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import ResponsiveImage from "../../helpers/responsiveImage";
import ResponsiveVideo from "../../helpers/responsiveVideo";

export default function save({ attributes }) {
  const {
    hasContainer,
    hasEqualColumns,
    hasCenteredContent,
    media,
    imageClass,
    pageId,
  } = attributes;

  const blockProps = useBlockProps.save(
    {className: pageId ? "style-" + pageId : null}
  );


  const hasContainerClass = hasContainer ? "container mx-auto" : "w-full";
  const hasEqualColumnsClass = hasEqualColumns
    ? "tabled:grid tabled:grid-cols-2"
    : "";

  const hasCenteredContentClass = hasCenteredContent
    ? "flex flex-col items-center"
    : "";

  const customClass = [
    "section--content",
    hasContainerClass,
    hasEqualColumnsClass,
    hasCenteredContentClass,
  ];
  const customClasses = customClass.join(" ");
  // set innerBlockProps classes
  const { children, ...innerBlocksProps } = useInnerBlocksProps.save({
    className: customClasses,
  });

  return (
    <section {...blockProps}>
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
    </section>
  );
}
