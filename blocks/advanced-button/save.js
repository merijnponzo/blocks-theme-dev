/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
  const { url, rel, svgCode, linkTarget, linkTile, customClass } = attributes;

  // hoverable tilte
  const tileClass = linkTile ? "tile" : "";

  const blockProps = useBlockProps.save({
    className: `wp-element-button ${customClass} ${tileClass}`,
  });

  return (
    <a
      rel="noopener noreferrer"
      target={linkTarget}
      title={rel}
      href={url}
      {...blockProps}
    >
      <span dangerouslySetInnerHTML={{ __html: svgCode }} />
      <span>{rel}</span>
    </a>
  );
}
