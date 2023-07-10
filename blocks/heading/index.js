// import vanilla counte
import "@srexi/purecounterjs";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import { PonzoHeading } from "../../assets/PonzoIcons";

registerBlockType(metadata.name, {
  /**
   * Used to construct a preview for the block to be shown in the block inserter.
   */
  example: {
    attributes: {
      message: "Heading",
    },
  },
  icon: PonzoHeading,
  /**
   * @see ./edit.js
   */
  edit: Edit,

  /**
   * @see ./save.js
   */
  save,
});
