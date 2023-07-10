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
  RangeControl,
  ToggleControl,
  Button,
  SelectControl,
} from "@wordpress/components";

import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import ButtonPicker from "./buttonPicker";
import { getImageClass } from "./ponzoClassHelpers";

export default function CustomImagePanel({
  mediaProps,
  imageProps,
  mediaCallback,
  imagePropsCallback,
}) {
  const imageFits = ["contain", "cover", "fill"];
  // toggles
  const [stateMedia, setStateMedia] = useState({
    id: null,
    url: "",
    sizes: [],
    alt: "",
    type: "",
    width: 0,
    height: 0,
  });
  const [stateImageProps, setStateImageProps] = useState({
    imageFit: null,
    imagePosition: null,
    imageEffect: null,
    imageFilter: null,
  });

  useEffect(() => {
    if (mediaProps) {
      setStateMedia({ ...mediaProps });
    }
    if (imageProps) {
      setStateImageProps({ ...imageProps });
    }
  }, [mediaProps, imageProps]);

  const updateImageProps = (prop, val) => {
    const newImageProps = { ...stateImageProps };
    newImageProps[prop] = val;
    // get imageclass
    const imageClass = getImageClass(newImageProps);
    imagePropsCallback({ ...newImageProps }, imageClass);
  };

  // image handlers
  const removeMedia = () => {
    const mediaObj = {
      mediaId: 0,
      mediaUrl: "",
    };
    mediaCallback({ ...mediaObj });
  };
  // onselect media
  const onSelectMedia = (media) => {
    // add responsive sizes
    const responsive = ["large", "medium", "thumbnail"];
    const sizes = [];
    for (const key in media.sizes) {
      if (responsive.includes(key)) {
        sizes[key] = media.sizes[key].url;
      }
    }
    const mediaObj = {
      id: media.id,
      url: media.url,
      sizes: sizes,
      alt: media.alt,
      type: media.type,
      width: media.width,
      height: media.height,
    };
    mediaCallback({ ...mediaObj });
  };

  return (
    <>
      <PanelRow>
        {stateMedia.id !== null && (
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectMedia}
              value={stateMedia.id}
              allowedTypes={["image", "video"]}
              render={({ open }) => (
                <Button
                  className={
                    stateMedia.id == 0
                      ? "editor-post-featured-image__toggle"
                      : "editor-post-featured-image__preview"
                  }
                  onClick={open}
                >
                  {stateMedia.id == 0 && __("Choose an image", "ponzoblocks")}
                  {stateMedia.id && (
                    <div className="ponzo--editor-visual-image">
                      <img src={stateMedia.url} />
                    </div>
                  )}
                </Button>
              )}
            />
          </MediaUploadCheck>
        )}
        {stateMedia.id != 0 && (
          <MediaUploadCheck>
            <MediaUpload
              title={__("Replace image", "ponzoblocks")}
              value={stateMedia.id}
              onSelect={onSelectMedia}
              allowedTypes={["image"]}
              render={({ open }) => (
                <Button onClick={open}>
                  {__("Replace image", "ponzoblocks")}
                </Button>
              )}
            />
          </MediaUploadCheck>
        )}
        {stateMedia.id != 0 && (
          <MediaUploadCheck>
            <Button onClick={() => removeMedia()} isDestructive>
              {__("Remove image", "ponzoblocks")}
            </Button>
          </MediaUploadCheck>
        )}
      </PanelRow>
      <PanelRow>
        <ButtonPicker
          buttonData={imageFits}
          active={stateImageProps.imageFit}
          parentCallback={(imageFit) => updateImageProps("imageFit", imageFit)}
        />
      </PanelRow>
      <PanelRow>
        <SelectControl
          label="Image Position"
          value={stateImageProps.imagePosition}
          options={[
            { label: "Center", value: "center" },
            { label: "Bottom", value: "bottom" },
            { label: "Top", value: "top" },
            { label: "Left", value: "left" },
            { label: "Left Bottom", value: "left-bottom" },
            { label: "Left Top", value: "left-top" },
            { label: "Right", value: "right" },
            { label: "Right Bottom", value: "right" },
            { label: "Right Top", value: "right-top" },
          ]}
          onChange={(newPosition) =>
            updateImageProps("imagePosition", newPosition)
          }
        />
      </PanelRow>
      <PanelRow>
        <SelectControl
          label="Effect"
          value={stateImageProps.imageEffect}
          options={[
            { label: "Opacity 100", value: "" },
            { label: "Opacity 90", value: "opacity-90" },
            { label: "Opacity 80", value: "opacity-80" },
            { label: "Opacity 50", value: "opacity-70" },
            { label: "Opacity 30", value: "opacity-60" },
            { label: "Opacity 70", value: "opacity-50" },
            { label: "Opacity 50", value: "opacity-40" },
            { label: "Opacity 30", value: "opacity-30" },
            { label: "Opacity 20", value: "opacity-20" },
            { label: "Mix blend multiply", value: "mix-blend-multiply" },
          ]}
          onChange={(imageEffect) =>
            updateImageProps("imageEffect", imageEffect)
          }
        />
      </PanelRow>
      <PanelRow>
        <SelectControl
          label="Filter"
          value={stateImageProps.imageFilter}
          options={[
            { label: "none", value: "" },
            { label: "grayscale", value: "grayscale" },
            { label: "saturate 50", value: "saturate-50" },
            { label: "saturate 100", value: "saturate-100" },
            { label: "blur small", value: "blur-sm" },
            { label: "blur large", value: "blur-lg" },
            { label: "contrast", value: "contrast-50" },
          ]}
          onChange={(imageFilter) =>
            updateImageProps("imageFilter", imageFilter)
          }
        />
      </PanelRow>
      <PanelRow>
        <SelectControl
          label="Scale"
          value={stateImageProps.imageScale}
          options={[
            { label: "100%", value: "" },
            { label: "95%", value: "scale-95" },
            { label: "90%", value: "scale-90" },
            { label: "75%", value: "scale-75" },
            { label: "50%", value: "scale-50" },
            { label: "105%", value: "scale-105" },
            { label: "110%", value: "scale-110" },
            { label: "125%", value: "scale-125" },
          ]}
          onChange={(imageScale) => updateImageProps("imageScale", imageScale)}
        />
      </PanelRow>
    </>
  );
}
