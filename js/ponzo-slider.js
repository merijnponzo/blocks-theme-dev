import SnapSlider from "@tannerhodges/snap-slider";
import { getScrollSnapPositions } from "scroll-snap-api";
import animateScrollTo from "animated-scroll-to";

// Make Sliders draggable
export const createSliders = (slider) => {
  const snapPositions = getScrollSnapPositions(slider);
  const scrollSpeed = 2.5;
  const easeTime = 1000;
  let isDown = false;
  let isAnimating = false;
  let startX;
  let startY;
  let scrollLeft;
  let scrollLeftUpdated;

  slider.addEventListener("mousedown", (e) => {
    slider.classList.add("snap-none");
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    startY = e.pageY - slider.offsetTop;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    // find closest number scrollLeftUpdated within snapPositions.x
    const closest = snapPositions.x.reduce((prev, curr) => {
      return Math.abs(curr - scrollLeftUpdated) <
        Math.abs(prev - scrollLeftUpdated)
        ? curr
        : prev;
    });
    // use animateScrollTo to scroll to closest number with a promise
    animateScrollTo([closest, 0], {
      elementToScroll: slider,
      speed: easeTime,
    }).then((hasScrolledToPosition) => {
      if (hasScrolledToPosition) {
        slider.classList.remove("snap-none");
      }
    });
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) {
      e.preventDefault();
    } else {
      const x = e.pageX - slider.offsetLeft;
      const y = e.pageY - slider.offsetTop;
      const walk_x = (x - startX) * scrollSpeed; // the higher the faster
      scrollLeftUpdated = scrollLeft - walk_x;
      slider.scrollLeft = scrollLeftUpdated;
    }
  });
};

export const createPagination = (slider, sliderId) => {
  const ifSlider = slider.getAttribute("data-snap-slider");
  const hasArrows = slider.getAttribute("data-slide-arrows");
  const hasPagination = slider.getAttribute("data-slide-pagination");
  // create  ul to parent of slider
  const pagination = document.createElement("ul");
  pagination.setAttribute("id", `${sliderId}__nav`);
  pagination.classList.add("scrollslide--nav");
  slider.parentNode.insertBefore(pagination, slider.nextSibling);

  const children = slider.children.length;
  // add pagination dots
  if (children > 1 && hasPagination !== "hidden") {
    // append <li> to pagination
    for (let i = 0; i < children; i++) {
      const li = document.createElement("li");
      // append button element to li
      const button = document.createElement("button");
      button.classList.add("scrollslide--button");
      button.setAttribute("data-slide-to", i);
      button.setAttribute("aria-label", `Slide ${i + 1}`);
      if (hasPagination === "dots-bottom") {
        button.innerHTML = "";
      } else {
        button.innerHTML = i + 1;
      }
      li.appendChild(button);
      pagination.appendChild(li);
      li.classList.add("slider__item");
    }
  }

  if (hasArrows !== "hidden") {
    const leftArrow = document.createElement("button");
    leftArrow.setAttribute("id", `${sliderId}__left`);
    leftArrow.classList.add("scrollslide--nav--left");
    leftArrow.setAttribute("aria-label", "Previous slide");
    leftArrow.setAttribute("data-snap-slider-goto", "prev");
    pagination.appendChild(leftArrow);

    // create right arrow in slider
    const rightArrow = document.createElement("button");
    rightArrow.setAttribute("id", `${sliderId}__left`);
    rightArrow.classList.add("scrollslide--nav--right");
    rightArrow.setAttribute("aria-label", "Next slide");
    rightArrow.setAttribute("data-snap-slider-goto", "next");

    pagination.appendChild(rightArrow);
  }

  return pagination;
};

export const ponzoSnapSlider = (sliderEl, sliderId) => {
  // createPagination
  const slider = new SnapSlider(sliderEl, {
    id: sliderId,
    nav: `#${sliderId}__nav`,
    start: "start",
    on: {
      load: () => {},
      change: () => {},
      "change.click": () => {},
    },
  });
  return slider;
};

export default { ponzoSnapSlider, createSliders, createPagination };
