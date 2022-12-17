import arrivalProducts from "./newProducts.json" assert { type: "json" };
// Let me set the box-shadow for the header according to the sroll possition
// And show the go-up button
let header = $("header");
let goUp = $("#go-up");

window.onscroll = () => {
  if (window.scrollY >= header.height())
    header.css("box-shadow", "0 1px 3px #ddd");
  else header.css("box-shadow", "none");

  if (window.scrollY >= 500) goUp.addClass("visible");
  else goUp.removeClass("visible");
};

// // // SLIDER STYLE
let allSlides = document.querySelectorAll(".slide");
let slidesNumber = allSlides.length;
let currentSlide = 1;
let sliderControlsUp = $("#interface .slider-controls");
console.log(sliderControlsUp);
for (let i = 1; i <= slidesNumber; i++) {
  let liItem = $("<span></span>", {
    "data-index": i,
  });
  sliderControlsUp.append(liItem);
}

let sliderControls = document.querySelectorAll(".slider-controls span");

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

// // // SHOWING CART
let bagIcon = $(".bag-icon");
let asideCart = $(".aside-cart");

bagIcon.on("click", () => {
  showAndHide(asideCart);
});

// // // SHOWING LOGIN
let userIcon = $(".user-icon");
let asideRegister = $(".aside-register");

userIcon.on("click", () => {
  showAndHide(asideRegister);
});

function showAndHide(asideEl) {
  asideEl.css("right", "0");
  let closeIcon = $(".close-icon ");
  closeIcon.on("click", (e) => {
    $(e.currentTarget).closest(asideEl).css("right", " -26em");
  });
}

// // // put the arrival products in there place
let newArrivals = document.querySelector(".swiper-wrapper");

for (let i = 0; i < arrivalProducts.length; i++) {
  const arrivalProduct = arrivalProducts[i];

  let newProduct = document.createElement("div");
  newProduct.id = arrivalProduct.id;
  newProduct.className = "new-product swiper-slide";
  newProduct.innerHTML = `
  <a href="http://e-shop/shop.index/${arrivalProduct.name}">
    <div class="img">
      <img src="${arrivalProduct.img}"/>
    </div>
    <h2 class="name">${arrivalProduct.name}</h2>
    <span class="type d-bl">${arrivalProduct.type}</span>
    <div class="b-a-price d-fl">
    <span class="price">${arrivalProduct.price}</span>
      <del class="prev-price">${arrivalProduct.previousPrice}</del>
    </div>
  </a>
  `;
  newArrivals.appendChild(newProduct);
}
let swiperPagination = document.createElement("div");
swiperPagination.className = "slider-controls";
newArrivals.after(swiperPagination);

let arrivalProductsSwiper = new Swiper(".new-products", {
  slidesPerView: 4,
  spaceBetween: 20,
  pagination: {
    el: ".slider-controls",
    clickable: true,
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
        bullet.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
    };
  }
}
