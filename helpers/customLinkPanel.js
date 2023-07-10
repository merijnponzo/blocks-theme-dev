import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
  BlockControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";

import {
  PanelBody,
  PanelRow,
  TextControl,
  RangeControl,
  ToggleControl,
  Button,
  SelectControl,
} from "@wordpress/components";

import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import { isURL } from "@wordpress/url";
import LinkPicker from "./linkPicker.js";

export default function CustomLinkPanel({
  url,
  rel,
  linkTarget,
  linkTile,
  showLinkTile,
  parentCallback,
}) {
  const [isError, setError] = useState(false);
  const [stateUrl, setStateUrl] = useState("");
  const [stateRel, setStateRel] = useState("");
  const [stateTarget, setStateTarget] = useState("");
  const [stateBoolean, setStateBoolean] = useState(false);
  const [stateTile, setStateTile] = useState(false);

  // once
  useEffect(() => {
    if (linkTarget === "_blank") {
      setStateBoolean(true);
    }
    if (linkTile) {
      setStateTile(true);
    }
  }, []);

  // set from default
  useEffect(() => {
    if (url) {
      setStateUrl(url);
    }
    if (rel) {
      setStateRel(rel);
    }
  }, [url, rel]);

  const setLinkProps = (prop, value) => {
    let newLink = { ...getLinkObject() };
    newLink[prop] = value;

    parentCallback(newLink);
  };

  // get link object
  const getLinkObject = () => {
    const link = {
      url: stateUrl,
      rel: stateRel,
      linkTarget: linkTarget,
    };
    // only if needed
    if (showLinkTile) {
      link.linkTile = linkTile;
    }

    return;
  };
  // retrieve link from link picker
  const callbackLinkPicker = (linkObject) => {
    const newLink = { ...getLinkObject() };
    newLink.rel = linkObject.title;
    newLink.url = linkObject.url;
    parentCallback(newLink);
  };
  // reset link
  const removeLink = () => {
    const newLink = { ...getLinkObject() };
    newLink.rel = "";
    newLink.url = "";
    parentCallback(newLink);
  };

  // toggle
  const setTargetToggle = (value) => {
    const target = value ? "_blank" : "_self";
    // toggle stateBoolean
    setStateBoolean(value);
    // update
    setLinkProps("linkTarget", target);
  };

  const setTileToggle = (value) => {
    setStateTile(value);
    setLinkProps("linkTile", value);
  };

  return (
    <>
      <PanelRow>
        {isError ? (
          <span style={{ color: "red" }}>{isError}</span>
        ) : (
          <span>{url}</span>
        )}
      </PanelRow>
      <PanelRow>
        <fieldset>
          <LinkPicker parentCallback={callbackLinkPicker} />
          <Button variant="secondary" onClick={removeLink}>
            Clear link
          </Button>
        </fieldset>
      </PanelRow>

      <PanelRow>
        <TextControl
          label={__("Titel", "ponzoblocks-icon")}
          value={stateRel}
          onChange={(value) => setLinkProps("rel", value)}
          help={__("Change your button title...", "ponzoblocks-icon")}
        />
      </PanelRow>
      <PanelRow>
        <TextControl
          label={__("Url", "ponzoblocks-icon")}
          value={stateUrl}
          onChange={(value) => setLinkProps("url", value)}
          help={__("Change your button url...", "ponzoblocks-icon")}
        />
      </PanelRow>
      <PanelRow>
        <ToggleControl
          label="Open in tab"
          help={stateBoolean ? "Open in tab" : "Within site"}
          checked={stateBoolean}
          onChange={(value) => setTargetToggle(value)}
        />
      </PanelRow>
      {showLinkTile && (
        <PanelRow>
          <ToggleControl
            label="Link as Tile"
            help={
              stateTile
                ? "Make the whole area clickable"
                : "Make only the button clickable"
            }
            checked={stateTile}
            onChange={(value) => setTileToggle(value)}
          />
        </PanelRow>
      )}
    </>
  );
}
