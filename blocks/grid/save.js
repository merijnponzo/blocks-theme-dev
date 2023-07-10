import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { blockId, customFlexClass, gridClass, slideArrows, slidePagination } = attributes;

  const blockProps = useBlockProps.save();
  // set innerBlockProps classes
  const { children, ...innerBlocksProps } = useInnerBlocksProps.save({
    className: `${gridClass} h-full z-10 ${customFlexClass}`,
    id: `grid${blockId}`,
  });

  return (
    <div {...blockProps}>
      <div
        {...innerBlocksProps}
        data-slide-arrows={slideArrows}
        data-slide-pagination={slidePagination}
      >
        {children}
      </div>
    </div>
  );
}
