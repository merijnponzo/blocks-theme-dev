import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({ className: "site-main" });

  const { children, ...innerBlocksProps } = useInnerBlocksProps.save({
    className: "site-main",
  });

  return (
    <main id="main" {...blockProps}>
      {children}
    </main>
  );
}
