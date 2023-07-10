/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */

import {
  Icon,
  TextControl,
  RangeControl,
  PanelBody,
  PanelRow,
  ToggleControl,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
  InnerBlocks,
  useBlockProps,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";

import DefaultIcon from "./assets/arrow-right.svg";

import React, { Component } from "react";
import IconPicker from "../../helpers/iconPicker.js";
import CustomStylePanel from "../../helpers/customStylePanel";
import {
  dimension,
  padding,
  margin,
  shadow,
  order,
  rotation,
  rounded,
} from "../../helpers/customStyles";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */

export default function Edit({ attributes, setAttributes }) {
  const { svgCode, svgSize, customStyle, customClass } = attributes;

  const onChangeSvgCode = (svgCode) => {
    setAttributes({ svgCode: svgCode });
  };

  const setSvgSize = (size) => {
    setAttributes({ svgSize: size });
  };

  // change svg from icon picker
  const callbackFunction = (childData) => {
    onChangeSvgCode(childData);
  };

  // get custom style settings
  const customStyleSettings = [
    dimension,
    padding,
    margin,
    rotation,
    rounded,
    shadow,
    order,
  ];
  const styleCallback = (styleObj, styleClass) => {
    setAttributes({
      customStyle: styleObj,
      customClass: styleClass,
    });
  };

  const blockProps = useBlockProps({
    className: `wp-element-icon svg-size-${svgSize} ${customClass}`,
  });

  return (
    <div {...blockProps}>
      <span dangerouslySetInnerHTML={{ __html: svgCode }} />
      <InspectorControls>
        <PanelBody
          title={__("Svg Settings", "ponzoblocks-icon")}
          initialOpen={true}
        >
          <PanelRow>
            <IconPicker parentCallback={callbackFunction} />
          </PanelRow>
          <PanelRow>
            <fieldset>
              <TextControl
                label={__("Svg Code", "ponzoblocks-icon")}
                value={svgCode}
                onChange={onChangeSvgCode}
                help={__(
                  "Add your Svg Code, make sure it starts with <svg ...",
                  "ponzoblocks-icon"
                )}
              />
            </fieldset>
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Svg Size"
              value={svgSize}
              withInputField={false}
              onChange={(value) => setSvgSize(value)}
              min={1}
              max={10}
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
      </InspectorControls>
    </div>
  );
}
