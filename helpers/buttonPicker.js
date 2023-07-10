import { useState, useEffect } from "@wordpress/element";

import { Button, ButtonGroup } from "@wordpress/components";

export default function ButtonPicker(props) {
  const { buttonData, active } = props;

  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    setActiveButton(active);
  }, [active]);


  const emitActiveButton = (button) => {
    props.parentCallback(button);
  };

  return (
    <>
      <ButtonGroup>
        <ButtonList
          active={activeButton}
          buttonData={buttonData}
          onActiveButton={(button) => emitActiveButton(button)}
        ></ButtonList>
      </ButtonGroup>
    </>
  );
}

function ButtonList({ buttonData = [], onActiveButton, active }) {
  const list = [];
  buttonData.forEach((button) => {
    list.push(
      // add key
      <Button
        key={button}
        variant={button === active ? "primary" : "secondary"}
        onClick={() => onActiveButton(button)}
      >
        {button}
      </Button>
    );
  });
  return list;
}
