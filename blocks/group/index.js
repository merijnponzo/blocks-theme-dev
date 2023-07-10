/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import { PonzoGroup } from "../../assets/PonzoIcons";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(metadata.name, {
  /**
   * Used to construct a preview for the block to be shown in the block inserter.
   */
  example: {
    attributes: {
      message: "Group",
    },
  },
  icon: PonzoGroup,
  /**
   * @see ./edit.js
   */
  edit: Edit,

  styles: [
    {
      name: "card",
      label: "card",
      isDefault: true,
    },
    {
      name: "outline",
      label: "outline",
    },
    {
      name: "default",
      label: "default",
    },
  ],

  /**
   * @see ./save.js
   */
  save,
});
