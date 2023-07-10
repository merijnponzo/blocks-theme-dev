import {
  InnerBlocks,
  useInnerBlocksProps,
  useBlockProps,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";

import {
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
} from "@wordpress/components";

import CustomImagePanel from "../../helpers/customImagePanel";
import ResponsiveImage from "../../helpers/responsiveImage";
import ResponsiveVideo from "../../helpers/responsiveVideo";

import {
  common,
  shapes,
  dimension,
  padding,
  margin,
  rounded,
  order,
  shadow,
  transform,
} from "../../helpers/customStyles";

import {
  direction,
  horizontal,
  vertical,
  gapx,
  gapy,
} from "../../helpers/customFlexes";

import CustomStylePanel from "../../helpers/customStylePanel.js";
import CustomCopyPanel from "../../helpers/customCopyPanel";
import CustomFlexPanel from "../../helpers/customFlexPanel";
import CustomLinkPanel from "../../helpers/customLinkPanel.js";

// use state
import { useState, useEffect } from "@wordpress/element";

import { PonzoLink, PonzoImage } from "../../assets/PonzoIcons";

export default function Edit({ attributes, setAttributes }) {
  const {
    media,
    imageProps,
    imageClass,
    customStyle,
    customClass,
    customFlex,
    customFlexClass,
    url,
    rel,
    linkTarget
  } = attributes;

  useEffect(() => {
    // set default style
    if (!customFlex.length && customClass === "") {
      defaultReset();
    }
  }, []);

  const defaultReset = () => {
    const defaultFlex = [
      {
        id: "flex-",
        modifier: "column",
        modifierPrefix: "flex-",
        responsive: "all",
        tw: "flex-col",
        unit: "col",
      },
      {
        id: "justify-",
        modifier: "start",
        modifierPrefix: "justify-",
        responsive: "all",
        tw: "justify-start",
        unit: "start",
      },
      {
        id: "items-",
        modifier: "start",
        modifierPrefix: "items-",
        responsive: "all",
        tw: "items-start",
        unit: "start",
      },
    ];
    setAttributes({ customFlex: [...defaultFlex] });
    setAttributes({
      customFlexClass: "flex flex-col justify-start items-start",
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

  // get custom style settings
  const customStyleSettings = [
    order,
    dimension,
    shapes,
    padding,
    margin,
    transform,
    rounded,
    shadow,
  ];

  // style classes on outer element
  const styleCallback = (styleObj, styleClass) => {
    setAttributes({
      customStyle: styleObj,
      customClass: styleClass,
    });
  };

  // flex classes on inner element
  const flexCallback = (flexObj, flexClass) => {
    setAttributes({
      customFlex: flexObj,
      customFlexClass: flexClass,
    });
  };

  // update attribute
  const linkCallback = (link) => {
    setAttributes({ ...link });
  };

  const settingObject = {
    direction,
    horizontal,
    vertical,
    gapx,
    gapy,
  };

  const blockProps = useBlockProps({
    className: `relative ${customClass}`,
  });

  // set innerBlockProps classes
  const { children, ...innerBlocksProps } = useInnerBlocksProps({
    className: `flex relative z-10 h-full w-full ${customFlexClass}`,
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <CustomFlexPanel
          title="Flex Settings"
          settings={settingObject}
          defaultFlex={customFlex}
          resetCallback={() => defaultReset()}
          parentCallback={(flexObj, flexClass) =>
            flexCallback(flexObj, flexClass)
          }
        />
        <PanelBody title={"Image"} icon={PonzoImage} initialOpen={false}>
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
        <PanelBody title={"Link"} icon={PonzoLink} initialOpen={false}>
        <CustomLinkPanel
          parentCallback={linkCallback}
          url={url}
          rel={rel}
          linkTarget={linkTarget}
          showLinkTile={false}
        />
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
    </div>
  );
}
