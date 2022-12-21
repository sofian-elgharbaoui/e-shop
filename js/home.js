import arrivalProductsInJSON from "../json/newProducts.json" assert { type: "json" };

// // // SLIDER STYLE
let allSlides = document.querySelectorAll(".slide");
let slidesNumber = allSlides.length;
let currentSlide = 1;
let sliderControlsUp = $("#interface .slider-controls");

for (let i = 1; i <= slidesNumber; i++) {
  let liItem = $("<span></span>", {
    "data-index": i,
  });
  sliderControlsUp.append(liItem);
}

let sliderControls = document.querySelectorAll(
  "#interface .slider-controls span"
);

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

// // // the controles on the click event

for (let i = 0; i < sliderControls.length; i++) {
  sliderControls[i].onclick = () => {
    currentSlide = +sliderControls[i].getAttribute("data-index");
    goToSlide();
  };
}

(function selfChange() {
  let autoChange = setInterval(() => {
    currentSlide >= 1 && currentSlide < slidesNumber
      ? currentSlide++
      : (currentSlide = 1);
    goToSlide();
  }, 5000);

  for (let i = 0; i < sliderControls.length; i++) {
    sliderControls[i].onclick = () => {
      clearInterval(autoChange);
      currentSlide = +sliderControls[i].getAttribute("data-index");
      goToSlide();

      selfChange();
    };
  }
})();

// // // put the arrival products in there place
let newArrivals = document.querySelector("#new-arrivals .swiper-wrapper");

for (let i = 0; i < arrivalProductsInJSON.length; i++) {
  const arrivalProduct = arrivalProductsInJSON[i];

  let newProduct = document.createElement("div");
  newProduct.id = arrivalProduct.id;
  newProduct.className = "new-product swiper-slide";
  newProduct.innerHTML = `
    <div class="img">
      <img src="${arrivalProduct.img}"/>
    </div>
    <h2 class="name">${arrivalProduct.name}</h2>
    <span class="type d-bl">${arrivalProduct.type}</span>
    <div class="b-a-price d-fl">
      <span class="price">${arrivalProduct.price}</span>
      <del class="prev-price">${arrivalProduct.previousPrice}</del>
    </div>
    <a href="http://e-shop/shop.index/${arrivalProduct.name}"><i class="bx bx-cart-alt"></i></a>
  `;
  newArrivals.appendChild(newProduct);
}
let swiperPagination = document.createElement("div");
swiperPagination.className = "slider-controls";
newArrivals.after(swiperPagination);

new Swiper(".new-products", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".slider-controls",
    clickable: true,
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

let paginationControls = document.querySelectorAll(
  "#new-arrivals .slider-controls .swiper-pagination-bullet"
);
bulletEffect(paginationControls);

function bulletEffect(controls) {
  for (let i = 0; i < controls.length; i++) {
    controls[i].onclick = (e) => {
      controls.forEach((bullet) => {
        bullet.classList.remove("swiper-pagination-bullet-active");
      });
      e.currentTarget.classList.add("swiper-pagination-bullet-active");
    };
  }
}
