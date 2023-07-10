import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
  BlockControls,
  getBlock,
} from "@wordpress/block-editor";

import { useSelect } from "@wordpress/data";

import { useEffect, useState, useRef } from "react";
import {
  PanelBody,
  PanelRow,
  RangeControl,
  ToggleControl,
  SelectControl,
} from "@wordpress/components";

import { ponzoSnapSlider, createPagination } from "../../js/ponzo-slider";
// import CustomFlexPanel
import CustomFlexPanel from "../../helpers/customFlexPanel";

import {
  gridcols,
  gridrows,
  placecontent,
  placeitems,
  gapx,
  gapy
} from "../../helpers/customFlexes";

import { getGridClass } from "../../helpers/ponzoClassHelpers";

export default function Edit({ attributes, setAttributes, clientId }) {
  const { blockId, customFlexClass, customFlex, gridClass } = attributes;

  const [blockCount, setBlockCount] = useState(0);

  const [scrollProps, setScrollProps] = useState({
    mobile: 0,
    tablet: 0,
    desktop: 0,
  });

  const [activeSlider, setActiveSlider] = useState(false);
  const [slideArrows, setSlideArrows] = useState(null);
  const [slidePagination, setSlidePagination] = useState(null);

  // count innerblocks
  const sliderRef = useRef(blockId);

  // count innerblocks
  const innerBlockCount = useSelect(
    (select) => select("core/block-editor").getBlock(clientId).innerBlocks
  );
  if (blockCount !== innerBlockCount.length) {
    setBlockCount(innerBlockCount.length);
  }

  // set initial blockID if not set
  useEffect(() => {
    if (!blockId) {
      setAttributes({ blockId: clientId });
    }
    // set default flex if not set
    if (!customFlex.length && customFlexClass === "") {
      defaultReset();
    }

    setSlidePagination(attributes.slidePagination);
    setSlideArrows(attributes.slideArrows);
    setScrollProps({ ...attributes.scrollProps });

    // set default
    const newGridClass = getGridClass({ scrollProps: attributes.scrollProps });
    setAttributes({ gridClass: newGridClass });
  }, []);

  const defaultReset = () => {
    const defaultFlex = [
      {
        id: "xl:grid-cols-",
        modifier: "cols2",
        modifierPrefix: "grid-cols-",
        responsive: "xl",
        tw: "xl:grid-cols-2",
        unit: "2",
      },
      {
        id: "xl:gap-x-",
        modifier: "gapx2",
        modifierPrefix: "gap-x-",
        responsive: "xl",
        tw: "xl:gap-x-16",
        unit: "16",
      },
      {
        id: "xl:gap-y-",
        modifier: "gapy2",
        modifierPrefix: "gap-y-",
        responsive: "xl",
        tw: "xl:gap-y-16",
        unit: "16",
      },
    ];
    setAttributes({ customFlex: defaultFlex });
    setAttributes({
      customFlexClass: "xl:grid-cols-2 xl:gap-x-16 xl:gap-y-16",
    });
  };

  useEffect(() => {
    const sliderId = `grid-${blockId}`;
    const paginationEl = document.getElementById(`${sliderId}__nav`);
    //  const paginatI
    // Create a new slider
    if (scrollProps.mobile || scrollProps.tablet || scrollProps.desktop) {
      if (activeSlider) {
        // remove old pagination
        if (paginationEl !== null) {
          paginationEl.remove();
          // create new pagination
          createPagination(sliderRef.current, sliderId);
        }
        activeSlider.reset();
      } else {
        // create pagination
        createPagination(sliderRef.current, sliderId);

        if (sliderRef.current) {
          const slider = ponzoSnapSlider(sliderRef.current, sliderId);
          // set active slider
          setActiveSlider(slider);
        }
      }
    } else {
      if (activeSlider && paginationEl !== null) {
        paginationEl.remove();
        activeSlider.destroy();
        setActiveSlider(false);
      }
    }
  }, [blockCount, scrollProps, slideArrows, slidePagination]);

  // flex classes on inner element
  const flexCallback = (flexObj, flexClass) => {
    setAttributes({
      customFlex: flexObj,
      customFlexClass: flexClass,
    });
  };

  const settingObject = {
    gridcols,
    gridrows,
    placecontent,
    placeitems,
    gapx,
    gapy
  };

  const { children, ...innerBlocksProps } = useInnerBlocksProps({
    className: `${gridClass} h-full z-10 ${customFlexClass}`,
    id: `grid${blockId}`,
  });

  const togglescrollProps = (device, value) => {
    /// console.log(newScrollProps, "newScrollProps");
    const newScrollProps = { ...scrollProps };
    newScrollProps[device] = value;
    setScrollProps(newScrollProps);
    setAttributes({ scrollProps: newScrollProps });

    const newGridClass = getGridClass({ scrollProps: newScrollProps });
    setAttributes({ gridClass: newGridClass });
  };

  const toggleScrollPagination = (value) => {
    setAttributes({ slidePagination: value });
    setSlidePagination(value);
  };

  const toggleScrollArrows = (value) => {
    setAttributes({ slideArrows: value });
    setSlideArrows(value);
  };

  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <InspectorControls>
        <CustomFlexPanel
          title="Grid Settings"
          settings={settingObject}
          defaultFlex={customFlex}
          resetCallback={() => defaultReset()}
          parentCallback={(flexObj, flexClass) =>
            flexCallback(flexObj, flexClass)
          }
        />
        <PanelBody title={"Snap Slider"} initialOpen={false}>
          <PanelRow>
            <fieldset>
              <ToggleControl
                label="SnapSlide on desktop"
                help={
                  scrollProps.desktop ? "Scrolls on desktop" : "No scrolling"
                }
                checked={scrollProps.desktop}
                onChange={(value) => togglescrollProps("desktop", value)}
              />
            </fieldset>
          </PanelRow>
          <PanelRow>
            <fieldset>
              <ToggleControl
                label="SnapSlide on tablet"
                help={scrollProps.tablet ? "Scrolls on tablet" : "No scrolling"}
                checked={scrollProps.tablet}
                onChange={(value) => togglescrollProps("tablet", value)}
              />
            </fieldset>
          </PanelRow>
          <PanelRow>
            <fieldset>
              <ToggleControl
                label="SnapSlide on mobile"
                help={scrollProps.mobile ? "Scrolls on mobile" : "No scrolling"}
                checked={scrollProps.mobile}
                onChange={(value) => togglescrollProps("mobile", value)}
              />
            </fieldset>
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Arrows"
              value={slideArrows}
              options={[
                { label: "No Arrows", value: "hidden" },
                { label: "Side", value: "side" },
                { label: "Top Right", value: "top-right" },
              ]}
              onChange={(arrows) => toggleScrollArrows(arrows)}
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Pagination"
              value={slidePagination}
              options={[
                { label: "No Pagination", value: "hidden" },
                { label: "Dots Bottom", value: "dots-bottom" },
                { label: "Numbers Bottom", value: "numbers-button" },
              ]}
              onChange={(pagination) => toggleScrollPagination(pagination)}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div {...innerBlocksProps} ref={sliderRef}>
        {children}
      </div>
    </div>
  );
}
