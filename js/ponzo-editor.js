"use strict";

// import tailwind from "./tailwind/tailwind.cdn.min.js";
const tailwindCss = require("./tailwind.cdn.min.js");
const configParser = require("../../blocks-theme-dev/tailwind/theme-parser.js");
const themeJson = require("../../theme.json");
// document onload listener




document.addEventListener("DOMContentLoaded", function () {
  if (typeof wp !== "undefined") {
    if (wp.data !== undefined) {
      const { dispatch } = wp.data;
      wp.data.subscribe(() => {
        let isSavingPost = wp.data.select("core/editor").isSavingPost();
        let post_id = null;
        let siteEditor = false;

        const isAutosavingPost = wp.data
          .select("core/editor")
          .isAutosavingPost();

        /* this needs work
        if( wp.data.select("core/editor").isSavingNonPostEntityChanges() ){
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          postId = urlParams.get('postId');
          siteEditor = true
          isSavingPost = true;
        }
         */

      
        if (isAutosavingPost && !isSavingPost) {
          return;
        } else if (isSavingPost && !isAutosavingPost) {
          // get content
          const content = wp.data.select("core/editor").getEditedPostContent();

          // get alle site styles
          if (siteEditor) {
            post_id = postId;
          } else {
            post_id = wp.data.select("core/editor").getCurrentPostId();
          }
          
          const currentPostType = wp.data.select("core/editor").getCurrentPostType();
          // if is reusable block we are going to prefix tailwind to prevent style overwrites
          let prefix = false;
          if (currentPostType === "wp_block") {
             prefix = ".style-" + post_id;
          }
          
          createTailwind(content, prefix).then((css) => {
            fetch("/wp-json/ponzoblocks/v1/save-styles", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-WP-Nonce": wpApiSettings.nonce,
              },
              body: JSON.stringify({
                post_id: post_id,
                css: css,
              }),
            });
          });
        }
        // Do action.
      });
      // createTailwind();
    }
  }
});

async function createTailwind(content, prefix) {
  // get config from theme.json
  const config = configParser.tailwindTheme(themeJson, false);
  const configResult = createConfig(config, prefix);

  console.log(configResult, content)

  const tailwind = await window.createTailwindcss({
    tailwindConfig: configResult,
  });

  const css = await tailwind.generateStylesFromContent(
    `
    @tailwind components;
    @tailwind utilities;
    `,
    [content]
  );

  return css;
}

// create config
function createConfig(configResult, prefix) {
  // create config - should match tailwind.config.js in theme


  return {
    important: prefix,
    theme: {
      fontFamily: {
        ...configResult.fonts,
      },
      fontWeight: {
        ...configResult.fontWeights,
      },
      blocklist: ["container"],
      extend: {
        fontSize: {
          ...configResult.fontSize,
        },
        colors: {
          ...configResult.colors,
        },
        spacing: {
          ...configResult.spacing,
        },
        minWidth: {
          ...configResult.spacing,
        },
        maxWidth: {
          ...configResult.spacing,
        },
        minHeight: {
          ...configResult.spacing,
        },
        maxHeight: {
          ...configResult.spacing,
        },
        aspectRatio: {
          ...configResult.aspectRatio,
        },
        screens: {
          ...configResult.screens,
        },
      },
    },
  };
}
