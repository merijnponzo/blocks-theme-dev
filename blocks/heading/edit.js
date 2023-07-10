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
  SelectControl,
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
  RichText,
} from "@wordpress/block-editor";

import DefaultIcon from "./assets/arrow-right.svg";

import React, { Component } from "react";
import CustomStylePanel from "../../helpers/customStylePanel";
import {
  dimension,
  padding,
  margin,
  transform,
  order,
  rotation,
  shadow,
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
  const {
    customStyle,
    customClass,
    content,
    contentTag,
    textAlign,
    textAlignDesktop,
  } = attributes;

  // get custom style settings
  const customStyleSettings = [
    dimension,
    padding,
    margin,
    transform,
    rotation,
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
    className: `wp-element-heading h-auto ${customClass} ${textAlign} ${textAlignDesktop}`,
  });

  return (
    <>
      <RichText
        tagName={contentTag}
        {...blockProps}
        value={content}
        onChange={(value) => setAttributes({ content: value })}
        placeholder="Enter your text here"
      />
      <InspectorControls>
        <PanelBody title={"Richtext"} initialOpen={false}>
          <PanelRow>
            <SelectControl
              label="Text Align"
              value={textAlign}
              options={[
                { label: "Left", value: "text-left" },
                { label: "Center", value: "text-center" },
                { label: "Right", value: "text-right" },
              ]}
              onChange={(value) =>
                setAttributes({
                  textAlign: value,
                })
              }
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Text Align Desktop (md)"
              value={textAlignDesktop}
              options={[
                { label: "Default", value: "" },
                { label: "Left", value: "xl:text-left" },
                { label: "Center", value: "xl:text-center" },
                { label: "Right", value: "xl:text-right" },
              ]}
              onChange={(value) =>
                setAttributes({
                  textAlignDesktop: value,
                })
              }
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Tag"
              value={contentTag}
              options={[
                { label: "paragraph", value: "p" },
                { label: "h1", value: "h1" },
                { label: "h2", value: "h2" },
                { label: "h3", value: "h3" },
                { label: "h4", value: "h4" },
                { label: "h5", value: "h5" },
              ]}
              onChange={(value) =>
                setAttributes({
                  contentTag: value,
                })
              }
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
    </>
  );
}
