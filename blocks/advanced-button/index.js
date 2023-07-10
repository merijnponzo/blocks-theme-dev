// import vanilla counte
import "@srexi/purecounterjs";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import { PonzoButton } from "../../assets/PonzoIcons";



registerBlockType(metadata.name, {
  /**
   * Used to construct a preview for the block to be shown in the block inserter.
   */
  example: {
    attributes: {
      label: "Button Name",
    },
  },
  icon:PonzoButton,
  // Register block styles.
  styles: [
    {
      name: "primary",
      label: "primary",
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
   * @see ./edit.js
   */
  edit: Edit,

  /**
   * @see ./save.js
   */
  save,
});
