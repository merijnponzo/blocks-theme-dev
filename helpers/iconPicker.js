import { useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { TextControl, ToggleControl, Button } from "@wordpress/components";

export default function IconPicker(props) {
  const [activeModel, setActiveModel] = useState(0);
  const [icons, setIcons] = useState([{ icon_url: "", icons: [] }]);
  const [activeIcon, setActiveIcon] = useState("");

  useEffect(() => {
    apiFetch({ path: "/ponzoblocks/v1/get-icons/" }).then((icons) => {
      setIcons({ ...icons });
    });
  }, []);

  const sendBackData = (inlineSvg) => {
    if (inlineSvg === undefined) return;
    props.parentCallback(inlineSvg);
  };

  // api call for icon without .svg
  useEffect(() => {
    apiFetch({ path: "/ponzoblocks/v1/pick-icon/" + activeIcon }).then(
      (inlineSvg) => {
        sendBackData(inlineSvg);
        setActiveModel(false);
      }
    );
  }, [activeIcon]);

  return (
    <>
      <h2>Pick Icon</h2>
      <Modal
        title="About"
        isActive={activeModel}
        onClose={() => setActiveModel(false)}
      >
        <p>List of Svg found in blocktheme/resources/svg..</p>
        <div className="ponzo--editor-icon-grid">
          <IconList
            icons={icons}
            onActiveIcon={(icon) => setActiveIcon(icon)}
          />
        </div>
      </Modal>
      <Button variant="secondary" onClick={() => setActiveModel(true)}>
        Open Icons
      </Button>
    </>
  );
}
function IconList({ icons, onActiveIcon }) {
  const list = [];
  if (icons.icons === undefined) return <p>loading...</p>;
  // iterate over the icons and show img with icon based on icon_url and icon
  icons.icons.forEach((icon) => {
    list.push(
      // add key
      <div key={icon}>
        <img
          className="ponzo--editor-icon"
          width="64px"
          height="64px"
          src={`${icons.icon_url}/${icon}.svg`}
          onClick={() => onActiveIcon(icon)}
        />
      </div>
    );
  });
  return list;
}

function Modal({ title, children, isActive, onClose }) {
  return (
    <div>
      {isActive ? (
        <div className="ponzo--editor-modal">
          <div className="ponzo--editor-modalcontent">
            <div className="ponzo--editor-modalnav">
              <button className="ponzo--editor-close-button" onClick={onClose}>
                Close
              </button>
            </div>
            <div className="ponzo--editor-modalscroll">{children}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
