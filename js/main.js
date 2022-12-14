// set the box-shadow for the header according to the sroll place
let header = $("header");
window.onscroll = () => {
  if (window.scrollY >= header.height()) {
    header.css("box-shadow", "0 1px 3px #ddd");
  } else {
    header.css("box-shadow", "none");
  }
};

// let style the slider
let sliderContainer = document.querySelector(".slider-container");
let allSlides = document.querySelectorAll(".slide");
let slidesNumber = allSlides.length;
let currentSlide = 1;
let sliderControlsUp = $(".slider-controls");

for (let i = 1; i <= slidesNumber; i++) {
  let liItem = $("<li></li>", {
    "data-index": i,
  });
  sliderControlsUp.append(liItem);
}

let goToSlide;
(goToSlide = function () {
  let sliderControls = document.querySelectorAll(".slider-controls li");
  sliderControls[currentSlide - 1].classList.add("active");

  allSlides[currentSlide - 1].classList.add("active");
})();

let sliderControls = document.querySelectorAll(".slider-controls li");
for (let i = 0; i < sliderControls.length; i++) {
  sliderControls[i].onclick = (e) => {
    sliderControls.forEach((sliderControl) => {
      sliderControl.classList.remove("active");
    });
    allSlides.forEach((slide) => {
      slide.classList.remove("active");
    });

    currentSlide = +sliderControls[i].getAttribute("data-index");
    goToSlide();
  };
}
