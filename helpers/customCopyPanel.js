import {} from "@wordpress/block-editor";

import { PanelBody, PanelRow, Button } from "@wordpress/components";

// import { useState, useEffect } from "@wordpress/element";
// import { __ } from "@wordpress/i18n";

import { useSelect, useDispatch } from "@wordpress/data";

import { PonzoCopypasteSmall } from "../assets/PonzoIcons";

export default function CustomCopyPanel(props) {
  // get blocks
  const blockList = useSelect((select) =>
    select("core/block-editor").getBlocks()
  );
  const blockActive = useSelect((select) => {
    const { getSelectedBlock } = select("core/block-editor");
    return getSelectedBlock();
  }, []);

  // dispatch
  const dispatch = useDispatch();

  // Define a function to update the block attributes
  const updateBlockAttributes = (clientId, attributes) => {
    dispatch("core/block-editor").updateBlockAttributes(clientId, attributes);
  };

  // only style like attributes
  const BlockAttributes = [
    "customClass",
    "customStyle",
    "imageClass",
    "imageProps",
    "backgroundColor",
    "textColor",
    "style",
    "verticalAlignment",
    "isStackedOnMobile",
    "width",
    "height",
    "className",
    "animationsForBlocks",
    "fontFamily",
    "fontSize",
    "level",
    "hasCenteredContent",
    "hasContainer",
    "hasEqualColumns",
    "desktopProps",
    "tabletProps",
    "mobileProps",
    "gridClass",
    "svgSize",
    "hasColumns",
    "hasColumnsMobile",
    "gapX",
    "gapY",
    "innerClass",
    "customFlex",
    "customFlexClass",
  ];

  const getBlockAttributes = (block) => {
    const copyAttributes = {};
    if (block.attributes) {
      for (const key in block.attributes) {
        if (BlockAttributes.includes(key)) {
          copyAttributes[key] = block.attributes[key];
        }
      }
    }
    return copyAttributes;
  };

  // create a nested list with the block name, innertblocks and (ONLY) style attributes
  const createBlockCopy = (blocks) => {
    const updatedBlocks = blocks.map((block) => {
      // recursive check on blocks.innerBlocks
      const attributes = getBlockAttributes(block);
      if (block.innerBlocks.length > 0) {
        const innerBlocks = createBlockCopy(block.innerBlocks);
        return {
          name: block.name,
          attributes: attributes,
          innerBlocks: innerBlocks,
        };
      } else {
        return {
          name: block.name,
          attributes: attributes,
          innerBlocks: [],
        };
      }
    });
    return updatedBlocks;
  };

  //
  const createBlockPaste = (blocks, copiedBlocks) => {
    const updatedBlocks = blocks.map((block, index) => {
      // check if match
      if (!copiedBlocks[index]) return;
      const ifBlock = copiedBlocks[index].name === block.name;
      if (ifBlock) {
        const originalBlock = block;
        const copiedBlock = copiedBlocks[index];

        // recursive
        if (
          originalBlock.innerBlocks.length > 0 &&
          copiedBlock.innerBlocks.length > 0
        ) {
          createBlockPaste(originalBlock.innerBlocks, copiedBlock.innerBlocks);
        }
        if (originalBlock.name === copiedBlock.name) {
          const newAttributes = { ...block.attributes };

          for (const key in block.attributes) {
            if (BlockAttributes.includes(key)) {
              newAttributes[key] = copiedBlock.attributes[key];
            }
          }
          updateBlockAttributes(block.clientId, newAttributes);
        }
      }
    });
    return updatedBlocks;
  };

  const copyBlocks = () => {
    const blocks = createBlockCopy(blockList);
    const blockString = JSON.stringify(blocks);
    localStorage.setItem("ponzo_copy", blockString);
  };

  const pasteBlocks = () => {
    const copiedBlocks = JSON.parse(localStorage.getItem("ponzo_copy"));
    const blockListUpdated = createBlockPaste(blockList, copiedBlocks);
  };

  const copySingleBlock = () => {
    const blockListSingle = [];
    blockListSingle.push(blockActive);
    const blocks = createBlockCopy(blockListSingle);
    const blockString = JSON.stringify(blocks);
    localStorage.setItem("ponzo_copy", blockString);
  };

  const pasteSingleBlocks = () => {
    const blockListSingle = [];
    blockListSingle.push(blockActive);
    const copiedBlocks = JSON.parse(localStorage.getItem("ponzo_copy"));
    const blockListUpdated = createBlockPaste(blockListSingle, copiedBlocks);
  };

  return (
    <PanelBody
      title={props.title}
      icon={PonzoCopypasteSmall}
      initialOpen={false}
    >
      <div>
        <p class="my-16 block">Only works if the type & amount of elements within this layout are the same</p>

        <div className="flex gap-8">
          <Button variant="secondary" onClick={() => copyBlocks()}>
            Copy All
          </Button>
          <Button variant="secondary" onClick={() => pasteBlocks()}>
            Paste All
          </Button>
        </div>
        <div>
          <p>Copy Single Block Style</p>
          <div className="flex gap-8">
            <Button variant="secondary" onClick={() => copySingleBlock()}>
              Copy Block Style
            </Button>
            <Button variant="secondary" onClick={() => pasteSingleBlocks()}>
              Paste Block Style
            </Button>
          </div>
        </div>
      </div>
    </PanelBody>
  );
}
