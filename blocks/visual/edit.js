import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";

import {
  PanelBody,
  PanelRow,
  RangeControl,
  ToggleControl,
  Button,
  SelectControl,
} from "@wordpress/components";

import { useState, useEffect } from "@wordpress/element";

import {
  shrink,
  shapes,
  dimension,
  rotation,
  padding,
  margin,
  transform,
  rounded,
  shadow,
  order
} from "../../helpers/customStyles";
import CustomStylePanel from "../../helpers/customStylePanel";
import CustomImagePanel from "../../helpers/customImagePanel";
import CustomCopyPanel from "../../helpers/customCopyPanel";
import ResponsiveImage from "../../helpers/responsiveImage";

import { PonzoImageSmall } from "../../assets/PonzoIcons";

export default function Edit({ attributes, setAttributes, clientId }) {
  const {
    blockId,
    media,
    imageProps,
    imageClass,
    customStyle,
    customClass,
    isBanner,
  } = attributes;

  const [bannerToggle, setBannerToggle] = useState(isBanner);

  useEffect(() => {
    if (!blockId) {
      setAttributes({ blockId: clientId });
    }
  }, []);

  useEffect(() => {
    setAttributes({
      isBanner: isBanner,
    });
    // set default style
    if (!customStyle.length) {
      const defaultStyle = [
        {
          responsive: "all",
          modifier: "width",
          modifierPrefix: "w-",
          unit: "256",
          setting: "dimension",
          id: "all:w-",
          tw: "w-256",
        },
      ];
      setAttributes({ customStyle: [...defaultStyle] });
    }
    // set custom class
    if (customClass === "") {
      setAttributes({ customClass: "w-256" });
    }
  }, [isBanner]);

  // get custom style settings
  const customStyleSettings = [
    shrink,
    order,
    shapes,
    rotation,
    dimension,
    transform,
    padding,
    margin,
    rounded,
    shadow,
  ];

  const styleCallback = (styleObj, styleClass) => {
    setAttributes({
      customStyle: styleObj,
      customClass: styleClass,
    });
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

  // set classes
  const blockProps = useBlockProps({
    className: `relative overflow-hidden ${customClass}`,
  });

  // set inner blocks as banner wrapper
  const { children, ...innerBlocksProps } = useInnerBlocksProps({
    className:
      "z-10 absolute top-0 left-0 w-full h-full flex items-center justify-center",
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Visual" initialOpen={true} icon={PonzoImageSmall}>
          <CustomImagePanel
            mediaProps={media}
            imageProps={imageProps}
            mediaCallback={(image) => handleImage(image)}
            imagePropsCallback={(imageProps, imageClass) => {
              handleImageProps(imageProps, imageClass);
            }}
          />
          <PanelRow>
            <ToggleControl
              label="Create banner"
              help={bannerToggle ? "Place text on visual" : "Only visual"}
              checked={bannerToggle}
              onChange={setBannerToggle}
            />
          </PanelRow>
        </PanelBody>
        <CustomStylePanel
          defaultStyle={customStyle}
          styleSettings={customStyleSettings}
          parentCallback={(styleObj, styleClass) =>
            styleCallback(styleObj, styleClass)
          }
        />
        <CustomCopyPanel title="Copy & Paste Styles" />
      </InspectorControls>
      <ResponsiveImage
        media={media}
        imageClass={imageClass}
        extraClass={""}
        key={`visual_image__${blockId}`}
      />
      {isBanner ? <div {...innerBlocksProps}>{children}</div> : null}
    </div>
  );
}
