import {
  InnerBlocks,
  useInnerBlocksProps,
  useBlockProps,
  BlockControls,
} from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ className: "site-main" });
  const { children } = useInnerBlocksProps();

  return (
    <main id="main" {...blockProps}>
      {children}
    </main>
  );
}
