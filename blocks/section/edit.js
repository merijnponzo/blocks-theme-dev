import {
  InnerBlocks,
  useInnerBlocksProps,
  useBlockProps,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";

import { PanelBody, PanelRow, ToggleControl } from "@wordpress/components";

import CustomImagePanel from "../../helpers/customImagePanel";
import CustomCopyPanel from "../../helpers/customCopyPanel";
import ResponsiveImage from "../../helpers/responsiveImage";
import ResponsiveVideo from "../../helpers/responsiveVideo";

import { PonzoImageSmall } from "../../assets/PonzoIcons";

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();

  const {
    media,
    imageProps,
    imageClass,
    hasContainer,
    hasEqualColumns,
    hasCenteredContent,
  } = attributes;

  const toggleContainer = () => {
    setAttributes({ hasContainer: !hasContainer });
  };

  const toggleEqualColumns = () => {
    setAttributes({ hasEqualColumns: !hasEqualColumns });
  };

  const toggleCenteredContent = () => {
    setAttributes({ hasCenteredContent: !hasCenteredContent });
  };

  // handle image callback
  const handleImage = (media) => {
    setAttributes({
      media: media,
    });
  };

  const handleImageProps = (imageProps, imageClass) => {
    setAttributes({
      imageProps: { ...imageProps },
      imageClass: imageClass,
    });
  };

  const hasContainerClass = hasContainer ? "container mx-auto" : "w-full";

  const hasCenteredContentClass = hasCenteredContent
    ? "flex flex-col items-center"
    : "";

  const customClass = [
    "section--content",
    hasContainerClass,
    hasCenteredContentClass,
  ];

  const customClasses = customClass.join(" ");
  // set innerBlockProps classes
  const { children, ...innerBlocksProps } = useInnerBlocksProps({
    className: customClasses,
  });

  return (
    <section {...blockProps}>
      <InspectorControls>
        <PanelBody title={"Container"} initialOpen={true}>
          <PanelRow>
            <fieldset>
              <ToggleControl
                label="Add container"
                help={hasContainer ? "Has container" : "No container."}
                checked={hasContainer}
                onChange={toggleContainer}
              />
            </fieldset>
          </PanelRow>

          <PanelRow>
            <fieldset>
              <ToggleControl
                label="Center content"
                help={
                  hasEqualColumns
                    ? "Has centered content"
                    : "No centerened content"
                }
                checked={hasCenteredContent}
                onChange={toggleCenteredContent}
              />
            </fieldset>
          </PanelRow>
        </PanelBody>
        <PanelBody
          title="Background Image"
          icon={PonzoImageSmall}
          initialOpen={true}
        >
          <CustomImagePanel
            title="Background Image"
            mediaProps={media}
            imageProps={imageProps}
            mediaCallback={(image) => handleImage(image)}
            imagePropsCallback={(imageProps, imageClass) => {
              handleImageProps(imageProps, imageClass);
            }}
          />
        </PanelBody>
        <CustomCopyPanel title="Copy & Paste Styles" />
      </InspectorControls>
      <div {...innerBlocksProps}>{children}</div>
      {media.id ? (
        <div className="absolute left-0 top-0 w-full h-full z-0">
          {media.type}
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
        </div>
      ) : null}
    </section>
  );
}
