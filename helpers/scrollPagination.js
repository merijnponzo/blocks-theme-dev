export default function ScrollPagination(props) {
  const { blockCount, hasScroll, navId, pagination, arrows } = props;

  console.log('this bith is rendered')

  const CreateList = () => {
    const elements = [];
    let count = 0;
    for (let i = 0; i < blockCount; i++) {
      count++;
      elements.push(
        <li key={`scroll_li${i}`}>
          <button
            className={"scrollslide--button"}
            type="button"
          >
            {count}
          </button>
        </li>
      );
    }
    const ulAttributes = {
      className: 'scrollslide--nav',
      id: `nav${navId}`,
    };

    return <ul {...ulAttributes}>{elements}</ul>;
  };

  let renderScroll = false;
  if (blockCount > 0 && hasScroll) {
    renderScroll = true;
  }



  return <>{renderScroll ? <CreateList /> : null}</>;
}
