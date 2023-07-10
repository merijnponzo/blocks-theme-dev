/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */

import { __ } from "@wordpress/i18n";

import {
  TextControl,
  PanelBody,
  PanelRow,
  ToggleControl,
  Button,
} from "@wordpress/components";

import { useState, useEffect } from "@wordpress/element";


import {
  useBlockProps,
  InspectorControls,
  BlockControls,
  RichText,
} from "@wordpress/block-editor";

import React, { Component } from "react";

import {
  order,
  dimension,
  padding,
  margin,
  rounded,
  transform,
  gap,
  shadow,
} from "../../helpers/customStyles";


import CustomStylePanel from "../../helpers/customStylePanel.js";
import CustomLinkPanel from "../../helpers/customLinkPanel.js";
import IconPicker from "../../helpers/iconPicker.js";


export default function Edit({ attributes, setAttributes }) {
  const { customStyle, customClass } = attributes;

  const [svgCode, setSvgCode] = useState(attributes.svgCode);
  // link attributes
  const { url, rel, linkTarget, linkTile } = attributes;

  // change svg from icon picker
  const callbackFunctionSvg = (svg) => {
    setSvgCode(svg);
  };

  // svg code
  useEffect(() => {
    setAttributes({
      svgCode: svgCode,
    });
  }, [svgCode]);

  // set svg
  const onChangeSvgCode = (svgCode) => {
    const formattedSvg = svgCode.split(/\s+/).join(" ");
    // remove any class attributes
    const replacedSvg = formattedSvg.replace("class", "data-class");
    if (replacedSvg !== undefined) {
      setSvgCode(replacedSvg);
    } else {
      setError("Please enter a svg");
    }
  };

  // get custom style settings
  // get custom style settings
  const customStyleSettings = [
    dimension,
    padding,
    margin,
    transform,
    rounded,
    gap,
    shadow,
  ];
  const styleCallback = (styleObj, styleClass) => {
    setAttributes({
      customStyle: styleObj,
      customClass: styleClass,
    });
  };

  // update attribute
  const linkCallback = (link) => {
    setAttributes({...link });
  };

  const blockProps = useBlockProps({
    className: `wp-element-button ${customClass}`,
  });

  return (
    <div {...blockProps}>
      <span dangerouslySetInnerHTML={{ __html: svgCode }} />
      <span>{rel}</span>
      <InspectorControls>
        <PanelBody
          title={__("Link Settings", "ponzoblocks-link")}
          initialOpen={true}
        >
          <CustomLinkPanel
            parentCallback={linkCallback}
            url={url}
            rel={rel}
            linkTarget={linkTarget}
            linkTile={linkTile}
            showLinkTile={true}
          />
          <PanelRow>
            <TextControl
              label={__("Svg Code", "ponzoblocks-icon")}
              value={svgCode}
              onChange={onChangeSvgCode}
              help={__(
                "Add your Svg Code, make sure it starts with <svg ...",
                "ponzoblocks-icon"
              )}
            />
          </PanelRow>
          <PanelRow>
            <IconPicker parentCallback={callbackFunctionSvg} />
          </PanelRow>
        </PanelBody>
        <CustomStylePanel
          defaultStyle={customStyle}
          styleSettings={customStyleSettings}
          parentCallback={(styleObj, styleClass) =>
            styleCallback(styleObj, styleClass)
          }
        />
      </InspectorControls>
    </div>
  );
}
