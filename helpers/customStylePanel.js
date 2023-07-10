import { useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { TextControl, ToggleControl, Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Panel, PanelBody, PanelRow } from "@wordpress/components";

import TagList from "./tagPicker";
import { PonzoDesignerSmall } from "../assets/PonzoIcons";

export default function CustomStylePanel(props) {
  const [responsives, setResponsives] = useState(false);
  const [currentStyles, setCurrentStyles] = useState([]);
  // create once
  useEffect(() => {
    createStyleStructure();
  }, []);

  const createStyleStructure = () => {
    // setResponsives once
    const newSettings = getNewSettings(props.styleSettings);

    setResponsives({
      all: {
        id: "all",
        label: "All",
        active: true,
        settings: { ...newSettings },
      },
      xl: {
        id: "xl",
        label: "Desktop",
        active: false,
        settings: { ...newSettings },
      },
      md: {
        id: "md",
        label: "Tablet",
        active: false,
        settings: { ...newSettings },
      },
      xs: {
        id: "xs",
        label: "Mobile",
        active: false,
        settings: { ...newSettings },
      },
    });
  };

  const styleUpdateCallback = (obj) => {
    const styleObj = createStyleObj(obj);
    const defaultStyle = syncDefaultStyle(styleObj);
    const tailwindClass = tailwindClasses(defaultStyle);

    // display current styles
    displayCurrentStyles(defaultStyle);
    // send back to parent
    // emitStyle(styleObj)
    props.parentCallback(defaultStyle, tailwindClass);
  };

  const styleRemoveCallback = (obj) => {
    const defaultStyle = syncDefaultStyleRemove(obj);
    const tailwindClass = tailwindClasses(defaultStyle);
    props.parentCallback(defaultStyle, tailwindClass);
  };

  const createStyleObj = (obj) => {
    let responsivePrefix = obj.responsive;

    // we design mobile first
    if (obj.responsive === "all") {
      responsivePrefix = "";
    } else {
      responsivePrefix = `${obj.responsive}:`;
    }
    const styleObj = { ...obj };
    const key = `${obj.responsive}:${obj.modifierPrefix}`;
    styleObj.id = key;
    styleObj.tw = `${responsivePrefix}${obj.modifierPrefix}${obj.unit}`;
    return styleObj;
  };

  // sync default style
  const syncDefaultStyle = (styleObj) => {
    const defaultStyle = [...props.defaultStyle];
    // get default style
    const findIndex = defaultStyle.findIndex(
      (style) => style.id === styleObj.id
    );
    if (findIndex === -1) {
      defaultStyle.push(styleObj);
    } else {
      defaultStyle.splice(findIndex, 1, styleObj);
    }
    return defaultStyle;
  };

  const syncDefaultStyleRemove = (obj) => {
    const id = `${obj.responsive}:${obj.modifierPrefix}`;
    const defaultStyle = [...props.defaultStyle];
    const findIndex = defaultStyle.findIndex((style) => style.id === id);
    if (findIndex !== -1) {
      defaultStyle.splice(findIndex, 1);
    }
    return defaultStyle;
  };

  const tailwindClasses = (defaultStyle) => {
    const classes = [];
    for (const key in defaultStyle) {
      const obj = defaultStyle[key];
      classes.push(obj.tw);
    }
    return classes.join(" ");
  };

  // get responsive active from state
  const getResponsiveActive = () => {
    let responsiveActive = false;
    for (const key in responsives) {
      const responsive = responsives[key];
      if (responsive.active) {
        responsiveActive = responsive;
      }
    }
    return responsiveActive;
  };

  const displayCurrentStyles = (defaultStyle) => {
    // for display only
    const newCurrentStyles = [];
    defaultStyle.forEach((style) => {
      newCurrentStyles.push({ ...style });
    });
    setCurrentStyles([...newCurrentStyles]);
  };

  // create new settings
  const getNewSettings = (styleSettings) => {
    // get default style
    const defaultStyle = [...props.defaultStyle];

    // display current styles
    displayCurrentStyles(defaultStyle);

    // add storage
    const settings = {};
    styleSettings.forEach((setting) => {
      settings[setting.id] = { ...setting };
      settings[setting.id].modifiers = { ...setting.modifiers };
      // get keys
      const keys = Object.keys(settings[setting.id].modifiers);
      keys.forEach((key) => {
        settings[setting.id].modifiers[key].id = key;
        settings[setting.id].modifiers[key].value = null;
      });
    });
    const newSettings = JSON.parse(JSON.stringify(settings));
    return newSettings;
  };

  const handleResponsive = (activeObject) => {
    const newResponsives = { ...responsives };
    for (const key in newResponsives) {
      const responsive = newResponsives[key];
      responsive.active = false;
      if (responsive.id === activeObject.id) {
        responsive.active = true;
      }
    }
    setResponsives(newResponsives);
  };

  const resetModifier = (settingActive, modifierActive, responsiveActive) => {
    setResponsives((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      //reset value
      newState[responsiveActive.id].settings[settingActive.id].modifiers[
        modifierActive.id
      ].value = null;
      // reset active
      for (const unit in newState[responsiveActive.id].settings[
        settingActive.id
      ].units) {
        const unitObject =
          newState[responsiveActive.id].settings[settingActive.id].units[unit];
        unitObject.active = false;
      }
      return newState;
    });

    // create style callback object
    const obj = {
      responsive: responsiveActive.id,
      modifierPrefix: modifierActive.prefix,
    };
    styleRemoveCallback(obj);
  };

  const resetAllModifiers = () => {
    createStyleStructure();
    // reset
    const defaultStyle = [];
    const tailwindClass = "";
    props.parentCallback(defaultStyle, tailwindClass);
  };

  const handleUnit = (
    activeObject,
    settingActive,
    modifierActive,
    responsiveActive
  ) => {
    setResponsives((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      // Do some manipulation with the newState object
      newState[responsiveActive.id].settings[settingActive.id].modifiers[
        modifierActive.id
      ].value = activeObject.id;
      // set unnit active
      for (const unit in newState[responsiveActive.id].settings[
        settingActive.id
      ].units) {
        const unitObject =
          newState[responsiveActive.id].settings[settingActive.id].units[unit];
        unitObject.active = false;
        if (unitObject.id === activeObject.id) {
          unitObject.active = true;
        }
      }
      return newState;
    });

    // create style callback object
    const obj = {
      responsive: responsiveActive.id,
      modifier: modifierActive.id,
      modifierPrefix: modifierActive.prefix,
      unit: activeObject.id,
      setting: settingActive.id,
    };
    styleUpdateCallback(obj);
  };

  // set modifier active
  const handleModifier = (activeObject, settingActive, responsiveActive) => {
    setResponsives((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      const keys = Object.keys(
        newState[responsiveActive.id].settings[settingActive.id].modifiers
      );
      let isActiveUnit = null;

      keys.forEach((key) => {
        if (key !== activeObject.id) {
          newState[responsiveActive.id].settings[settingActive.id].modifiers[
            key
          ].active = false;
        } else {
          newState[responsiveActive.id].settings[settingActive.id].modifiers[
            key
          ].active = true;
          // only if active, set found value
          if (
            newState[responsiveActive.id].settings[settingActive.id].modifiers[
              key
            ].value
          ) {
            isActiveUnit =
              newState[responsiveActive.id].settings[settingActive.id]
                .modifiers[key].value;
          }
        }
      });
      // check if unit is already in styleClass
      const styleId = `${responsiveActive.id}:${activeObject.prefix}`;
      const findIndex = props.defaultStyle.findIndex(
        (style) => style.id === styleId
      );
      let styleObj = null;

      if (findIndex !== -1) {
        styleObj = props.defaultStyle[findIndex];
        isActiveUnit = styleObj.unit;
      }

      // set units in-active
      for (const unit in newState[responsiveActive.id].settings[
        settingActive.id
      ].units) {
        const unitObject =
          newState[responsiveActive.id].settings[settingActive.id].units[unit];
        if (unitObject.id === isActiveUnit) {
          unitObject.active = true;
        } else {
          unitObject.active = false;
        }
      }

      return newState;
    });
  };

  const PanelUnits = ({ setting, responsive }) => {
    const elements = [];
    for (const key in setting.modifiers) {
      const modifier = setting.modifiers[key];

      const units = [];
      for (const unitKey in setting.units) {
        const unit = setting.units[unitKey];
        const unitButton = (
          <button
            key={`panelUnit__${responsive.id}__${modifier.id}__${unit.id}`}
            className={`button button--unit ${unit.active ? "active" : ""}`}
            onClick={() => handleUnit(unit, setting, modifier, responsive)}
          >
            {unit.label}
          </button>
        );
        units.push(unitButton);
      }
      // if modifer active
      if (modifier.active) {
        elements.push(
          <div key={`panelUnit__${responsive.id}__${modifier.id}`}>
            <div className="buttons">{units}</div>
            <Button
              onClick={() => resetModifier(setting, modifier, responsive)}
            >
              Reset
            </Button>
          </div>
        );
      }
    }
    return elements;
  };

  /* panel elements */
  const PanelModifiers = ({ responsive }) => {
    const elements = [];
    for (const key in responsive.settings) {
      const setting = responsive.settings[key];
      // push
      elements.push(
        <PanelRow key={`panelModifier__${setting.id}`}>
          <div>
            <h4 class="ponzo--title"> {`${setting.id} ${responsive.label}`}</h4>
            <TagList
              tags={setting.modifiers}
              key={`tagsModifier__${setting.id}`}
              tagClass="tag--small"
              onTagClick={(modifier) =>
                handleModifier(modifier, setting, responsive)
              }
            />
            <PanelUnits setting={setting} responsive={responsive} />
            <Button onClick={() => resetAllModifiers(setting, responsive)}>
              Reset All
            </Button>
          </div>
        </PanelRow>
      );
    }
    return elements;
  };

  let responsive = null;
  if (responsives) {
    responsive = getResponsiveActive();
  }

  const styleList = () => {
    const elements = [];
    currentStyles.forEach((style) => {
      elements.push(
        <div key={`styleList__${style.id}`}>
          <span>
            <strong>{style.responsive}</strong> {style.modifier} {style.unit}
          </span>
        </div>
      );
    });
    return elements;
  };

  return (
    <PanelBody title={"Designer"} icon={PonzoDesignerSmall} initialOpen={false}>
      <div className="ponzo-stylehelper">
        <h4>Current Styles</h4>
        {styleList()}
        <br/>
        <button
          className="button button--reset mt-8"
          onClick={() => resetAllModifiers()}
        >
          Reset All Styles
        </button>
        {responsives ? (
          <div>
            <h4>Viewport</h4>
            <TagList
              key="responsives"
              tagClass="tag--tabs"
              tags={responsives}
              onTagClick={(responsiveActive) =>
                handleResponsive(responsiveActive)
              }
            />
            <PanelModifiers responsive={responsive} />
          </div>
        ) : null}
        <p class="my-16 block">
          Don't forget to check your layouts on mobile view
        </p>
      </div>
    </PanelBody>
  );
}
