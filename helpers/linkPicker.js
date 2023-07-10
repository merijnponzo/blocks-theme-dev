import { useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { TextControl, ToggleControl, Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function LinkPicker(props) {
  const [activeKeyword, setActiveKeyword] = useState("");
  const [links, setLinks] = useState(null);
  const [activeLink, setActiveLink] = useState({
    url: "",
    title: "",
  });

  useEffect(() => {
    if (activeKeyword === "") return;
    setLinks(null);
    apiFetch({ path: `/ponzoblocks/v1/get-links/${activeKeyword}` }).then(
      (links) => {
        if (links.length) {
          setLinks([...links]);
        } else {
          setLinks([]);
        }
      }
    );
  }, [activeKeyword]);

  useEffect(() => {
    if (activeLink.url !== "") {
      props.parentCallback(activeLink);
    }
  }, [activeLink]);

  return (
    <>
      <div className="ponzo--editor-linkwrap">
        <TextControl
          label={__("Search link", "ponzolinks")}
          value={activeKeyword}
          placeholder="Example: About"
          onChange={(value) => setActiveKeyword(value)}
          help={__("Type a post, page, title", "ponzolinks")}
        />
        {activeKeyword ? (
          <div className="ponzo--editor-linklist">
            <LinkList
              links={links}
              onActiveLink={(link) => [
                setActiveLink({ ...link }),
                setActiveKeyword(""),
              ]}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
function LinkList({ links, onActiveLink }) {
  const list = [];
  if (links === null) {
    return <p>Loading...</p>;
  } else if (links.length === 0) {
    return <p>No Results</p>;
  } else {
    // iterate over the links and show img with icon based on icon_url and icon
    links.forEach((link) => {
      list.push(
        // add key
        <div key={link.id}>
          <span
            className="ponzo--editor-link"
            onClick={() => onActiveLink(link)}
          >
            <span>{link.title}</span>
            <span className="ponzo--preview-link">{link.url}</span>
          </span>
        </div>
      );
    });
    return list;
  }
}
