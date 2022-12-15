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

let sliderControls = document.querySelectorAll(".slider-controls li");

let goToSlide;
(goToSlide = function () {
  allSlides.forEach((slide) => {
    slide.classList.remove("active");
  });
  allSlides[currentSlide - 1].classList.add("active");

  sliderControls.forEach((sliderControl) => {
    sliderControl.classList.remove("active");
  });
  sliderControls[currentSlide - 1].classList.add("active");
})();

// controles onclick event

for (let i = 0; i < sliderControls.length; i++) {
  sliderControls[i].onclick = () => {
    currentSlide = +sliderControls[i].getAttribute("data-index");
    goToSlide();
  };
}

(function selfChange() {
  let autoChange = setInterval(() => {
    if (currentSlide >= 1 && currentSlide < slidesNumber) {
      currentSlide++;
      console.log(currentSlide);
    } else {
      currentSlide = 1;
      console.log(currentSlide);
    }
    goToSlide();
  }, 3000);

  for (let i = 0; i < sliderControls.length; i++) {
    sliderControls[i].onclick = () => {
      clearInterval(autoChange);
      currentSlide = +sliderControls[i].getAttribute("data-index");
      goToSlide();

      selfChange();
    };
  }
})();
