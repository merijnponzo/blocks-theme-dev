/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import {
  TextControl,
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
  const blockProps = useBlockProps();

  const { counterStart, counterEnd, counterCurrency } = attributes;

  const onChangeCounterStart = (counterStart) => {
    setAttributes({
      counterStart: counterStart,
    });
  };

  const onChangeCounterEnd = (counterEnd) => {
    setAttributes({ counterEnd: counterEnd });
  };

  const onChangeCounterCurrency = (counterCurrency) => {
    setAttributes({
      counterCurrency: counterCurrency,
    });
  };

  return (
    <div {...blockProps}>
      <span
        data-purecounter-start={counterStart}
        data-purecounter-end={counterEnd}
        data-purecounter-currency={counterCurrency}
        className="purecounter"
      >
        {counterStart}
      </span>
      <InspectorControls>
        <PanelBody
          title={__("Counter Settings", "ponzoblocks-counter")}
          initialOpen={true}
        >
          <PanelRow>
            <fieldset>
              <TextControl
                label={__("Start", "ponzoblocks-counter")}
                value={counterStart}
                onChange={onChangeCounterStart}
                help={__("Add Start", "ponzoblocks-counter")}
              />
            </fieldset>
          </PanelRow>
          <PanelRow>
            <fieldset>
              <TextControl
                label={__("End", "ponzoblocks-counter")}
                value={counterEnd}
                onChange={onChangeCounterEnd}
                help={__("Add End", "ponzoblocks-counter")}
              />
            </fieldset>
          </PanelRow>
          <PanelRow>
            <fieldset>
              <TextControl
                label={__("Currency", "ka-example-block")}
                value={counterCurrency}
                onChange={onChangeCounterCurrency}
                help={__("Add Currency", "ponzoblocks-counter")}
              />
            </fieldset>
          </PanelRow>
        </PanelBody>
      </InspectorControls>
    </div>
  );
}
