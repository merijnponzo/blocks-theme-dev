// import alpine from "alpinejs";
// window.Alpine = alpine;
import PureCounter from "@srexi/purecounterjs";
import { ponzoSnapSlider, createPagination } from "./ponzo-slider.js";

document.addEventListener("DOMContentLoaded", function () {
  const pure = new PureCounter();
  // init sliders
  const sliders = document.querySelectorAll(
    ".scrollslide--mobile, .scrollslide--tablet, .scrollslide--desktop"
  );
  sliders.forEach((slider) => {
    createPagination(slider, slider.id);
    ponzoSnapSlider(slider, slider.id);
  });
});
