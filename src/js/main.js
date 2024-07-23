///// HAM BTN AND NAV OPEN/CLOSEDS

const hamBtn = document.querySelector(".ham-btn");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
hamBtn.addEventListener("click", (e) => {
  if (nav.getAttribute("aria-expanded") === "false") {
    nav.setAttribute("aria-expanded", "true");
    hamBtn.setAttribute("data-active", "true");
    document.querySelector(".main").classList.add("body-overlay");
    // header.setAttribute("data-active", "false");
  } else {
    nav.setAttribute("aria-expanded", "false");
    hamBtn.setAttribute("data-active", "false");
    document.querySelector(".main").classList.remove("body-overlay");

    // header.setAttribute("data-active", "true");
  }
  nav.addEventListener("click", (e) => {
    if (!e.target.matches(".nav__list")) {
      nav.setAttribute("aria-expanded", "false");
      hamBtn.setAttribute("data-active", "false");
    }
  });
});

document.body.addEventListener("click", (e) => {
  if (nav.getAttribute("aria-expanded") === "true") {
    if (e.target.matches(".body-overlay")) {
      nav.setAttribute("aria-expanded", "false");
      hamBtn.setAttribute("data-active", "false");
      document.querySelector(".main").classList.remove("body-overlay");
    }
  }
});

// PROJECT COUNTER

let valueDisplays = document.querySelectorAll(".count");
let interval = 5000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = Number(valueDisplay.getAttribute("data-num"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(() => {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});

// SWIPER

var swiper = new Swiper(".testimonial-swiper", {
  slidesPerView: 1,
  spaceBetween: 550,
  loop: true,
  autoplay: true,
  speed: 1500,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// INPUT FOCUS

const contactInputAll = document.querySelectorAll(".contact__form-input input");
const contactLabelAll = document.querySelectorAll(".contact-label");

contactInputAll.forEach((contactInput) => {
  contactInput.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    const label = e.target.nextElementSibling;
    if (inputValue.trim() === "") {
      label.classList.remove("contact-focus-js");
    } else {
      label.classList.add("contact-focus-js");
    }
  });
});

// HERO PLAY VIDEO BTN

const videoOverlay = document.createElement("div");
const heroCta = document.querySelector(".play-video-btn");

heroCta.addEventListener("click", (e) => {
  // Create a div for the video overlay
  videoOverlay.classList.add("hero-overlay");

  // Create the video element and set its attributes
  const videoClip = document.createElement("video");
  videoClip.src = "/src/assets/konig-pferd-ovelray-video.mp4";
  videoClip.autoplay = true;
  videoClip.loop = true;
  videoClip.controls = true;
  videoClip.muted = false;
  videoClip.poster = "/src/assets/images/thumbnail-splash-overlay.jpg";
  videoClip.preload = "auto";
  videoClip.crossOrigin = "anonymous";
  videoClip.playsInline = true;
  videoClip.disableRemotePlayback = true;
  videoClip.classList.add("modal-video");

  // Create the source element and set its attributes
  const sourceElement = document.createElement("source");
  sourceElement.src = "video.mp4";
  sourceElement.type = "video/mp4";

  // Append the source element to the video element
  videoClip.appendChild(sourceElement);

  // Append the video element to the video overlay div
  videoOverlay.append(videoClip);

  // Append the video overlay div to the body
  document.body.append(videoOverlay);
});
videoOverlay.addEventListener("click", (e) => {
  if (e.target.matches(".hero-overlay")) {
    videoOverlay.firstElementChild.remove();
    videoOverlay.remove();
  }
});
