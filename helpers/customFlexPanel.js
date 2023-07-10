import { useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { TextControl, ToggleControl, Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Panel, PanelBody, PanelRow } from "@wordpress/components";

import TagList from "./tagPicker";
import { PonzoGroupSmall } from "../assets/PonzoIcons";

export default function CustomFlexPanel(props) {
  const { title } = props;

  const [responsives, setResponsives] = useState(false);
  const [currentFlex, setCurrentFlex] = useState([]);

  // create flex structure once
  useEffect(() => {
    createFlexStructure(false);
    // set default flex for display
    displayCurrentFlex([...props.defaultFlex]);
     
  }, []);

  const createFlexStructure = (resetMode) => {
    // setResponsives once
    const newSettings = { ...props.settings };

    // make unique objects
    const getNewSettings0 = syncFlexStructure(newSettings, "all", resetMode);
    const getNewSettings1 = syncFlexStructure(newSettings, "xs", resetMode);
    const getNewSettings2 = syncFlexStructure(newSettings, "md", resetMode);
    const getNewSettings3 = syncFlexStructure(newSettings, "xl", resetMode);

     
    setResponsives({
      all: {
        id: "all",
        label: "All",
        active: false,
        settings: { ...getNewSettings0 },
      },
      xl: {
        id: "xl",
        label: "Desktop",
        active: true,
        settings: { ...getNewSettings3 },
      },
      md: {
        id: "md",
        label: "Tablet",
        active: false,
        settings: { ...getNewSettings2 },
      },
      xs: {
        id: "xs",
        label: "Mobile",
        active: false,
        settings: { ...getNewSettings1 },
      },
    });
  };

  const syncFlexStructure = (newSettings, responsive, resetMode) => {
    let newResponsive = responsive;

    if (responsive === "all") {
      newResponsive = "";
    } else {
      newResponsive = `${responsive}:`;
    }

    // get default flex object from block
    const defaultFlexSetting = props.defaultFlex;
    // create unique default flex structure
    const newFlexSetting = JSON.parse(JSON.stringify(newSettings));

    for (const flex in defaultFlexSetting) {
      const flexObj = defaultFlexSetting[flex];

      for (const i in newFlexSetting) {
        const settings = newFlexSetting[i];
        for (const j in settings) {
          const setting = settings[j];
          const uniqueKey = `${newResponsive}${setting.prefix}${setting.value}`;

          if (resetMode) {
            newFlexSetting[i][j].active = false;
          } else {
            if (uniqueKey === flexObj.tw) {
              newFlexSetting[i][j].active = true;
            }
          }
        }
      }
    }

    return newFlexSetting;
  };

  const flexUpdateCallback = (flexObj) => {
    const defaultFlex = syncDefaultFlex(flexObj);
    const tailwindClass = tailwindClasses(defaultFlex);
    // send back to parent
    displayCurrentFlex(defaultFlex);

    props.parentCallback(defaultFlex, tailwindClass);
  };

  const resetAllModifiers = () => {
    
    // reset from parent
    props.resetCallback()
    
    createFlexStructure(true);

    // reset
    displayCurrentFlex([]);
  };

  // sync default style
  const syncDefaultFlex = (flexObj) => {
    const defaultFlex = [...props.defaultFlex];
    // get default style
    const findIndex = defaultFlex.findIndex((flex) => flex.id === flexObj.id);

    if (findIndex === -1) {
      defaultFlex.push(flexObj);
    } else {
      defaultFlex.splice(findIndex, 1, flexObj);
    }
    return defaultFlex;
  };

  const tailwindClasses = (defaultFlex) => {
    const classes = [];
    for (const key in defaultFlex) {
      const obj = defaultFlex[key];
      classes.push(obj.tw);
    }
    return classes.join(" ");
  };

  const setModifier = (obj, modifier, setting, responsive) => {
    // set active
    const newSettings = JSON.parse(JSON.stringify(responsives));
    const newResponsive = newSettings[responsive.id];
    const newModifiers = newResponsive.settings[setting];
    // reset modifiers in setting
    for (const key in newModifiers) {
      const item = newModifiers[key];
      item.active = false;
      if (item.value === obj.value) {
        item.active = true;
      }
    }

    newResponsive.settings[setting] = newModifiers;
    newSettings[responsive.id] = newResponsive;

    setResponsives(newSettings);

    let responsivePrefix = "";
    // we design mobile first
    if (responsive.id === "all") {
      responsivePrefix = "";
    } else {
      responsivePrefix = `${responsive.id}:`;
    }

    // allow one modifier per viewport
    const uniqueKey = `${responsivePrefix}${obj.prefix}`;

    const flexObj = {
      id: uniqueKey,
      modifier: modifier,
      modifierPrefix: obj.prefix,
      responsive: responsive.id,
      tw: `${uniqueKey}${obj.value}`,
      unit: obj.value,
    };

    flexUpdateCallback(flexObj);
  };

  const PanelModifier = ({ setting, responsive }) => {
    const elements = [];
    for (const modifier in responsive.settings[setting]) {
      const obj = responsive.settings[setting][modifier];
      const item = (
        <button
          key={`${responsive.id}__${modifier}_${obj.id}`}
          className={`button button--small ${obj.active ? "active" : ""}`}
          onClick={() => setModifier(obj, modifier, setting, responsive)}
        >
          {obj.label}
        </button>
      );
      elements.push(item);
    }
    return elements;
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

  let responsive = null;
  if (responsives) {
    responsive = getResponsiveActive();
  }

  /* panel elements */
  const PanelModifiers = ({ responsive }) => {
    const elements = [];

    // Direction UX labels, since row and col with flexboxes is confusing
    let DirectionLabel1 = "";
    let DirectionLabel2 = "";
    if (responsive.settings.direction !== undefined) {
      if (responsive.settings.direction.column.active) {
        DirectionLabel1 = "Vertical";
        DirectionLabel2 = "Horizontal";
      }
    }

    for (const key in responsive.settings) {
      let DirectionLabel = "";

      if (key === "horizontal") {
        DirectionLabel = DirectionLabel1;
      } else if (key === "vertical") {
        DirectionLabel = DirectionLabel2;
      }
      const settingRow = (
        <PanelRow key={`${responsive.id}__${key}`}>
          <div>
            <h4 class="ponzo--title">
              {DirectionLabel} {key}
            </h4>
            <PanelModifier
              key={`${responsive.id}__${key}_panel`}
              setting={key}
              responsive={responsive}
            />
          </div>
        </PanelRow>
      );
      elements.push(settingRow);
    }

    return <div key={responsive.id}>{elements}</div>;
  };

  const displayCurrentFlex = (defaultFlex) => {
    // for display only
    const newCurrentFlex = [];
    defaultFlex.forEach((flex) => {
      newCurrentFlex.push({ ...flex });
    });
    setCurrentFlex([...newCurrentFlex]);
  };

  const flexList = () => {
    const elements = [];
    currentFlex.forEach((flex) => {
      elements.push(
        <div key={`flexList__${flex.id}`}>
          <span>
            <strong>{flex.responsive}</strong> {flex.modifier} {flex.unit}
          </span>
        </div>
      );
    });
    return elements;
  };

  return (
    <PanelBody title={title} icon={PonzoGroupSmall} initialOpen={true}>
      <div className="ponzo-stylehelper">
        <h4>Current Flex</h4>
        {flexList()}
        <br />
        <button
          className="button ponzo--button"
          onClick={() => resetAllModifiers()}
        >
          Reset
        </button>
        {responsives ? (
          <div>
            <TagList
              key="responsives"
              tagClass="tag--tabs"
              tags={responsives}
              onTagClick={(responsiveActive) =>
                handleResponsive(responsiveActive)
              }
            />
            <PanelModifiers key={responsive.id} responsive={responsive} />
          </div>
        ) : null}
        <p class="my-16 block">
          Don't forget to check your layouts on mobile view
        </p>
      </div>
    </PanelBody>
  );
}
