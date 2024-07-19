///// HAM BTN AND NAV OPEN/CLOSEDS

const hamBtn = document.querySelector(".ham-btn");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
hamBtn.addEventListener("click", (e) => {
  if (nav.getAttribute("aria-expanded") === "false") {
    nav.setAttribute("aria-expanded", "true");
    hamBtn.setAttribute("data-active", "true");
    // header.setAttribute("data-active", "false");
  } else {
    nav.setAttribute("aria-expanded", "false");
    hamBtn.setAttribute("data-active", "false");
    // header.setAttribute("data-active", "true");
  }
  nav.addEventListener("click", (e) => {
    if (!e.target.matches(".nav__list")) {
      nav.setAttribute("aria-expanded", "false");
      hamBtn.setAttribute("data-active", "false");
    }
  });
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
