import allProductsInJSON from "../json/allProducts.json" assert { type: "json" };

// // // put all the products in there place
let allSlidesWrapper = document.querySelector(
  ".all-products .all-slides-wrapper"
);

// // // how many slides we want - currently, I have TWO.
let slidesNumber = 0;
let num = 9;
for (let i = 1; i <= allProductsInJSON.length; i++) {
  if (i % num == 0) {
    slidesNumber++;
    if (allProductsInJSON.length - i < num) slidesNumber++;
  }
}

let numb = 0;
for (let i = 1; i <= slidesNumber; i++) {
  let slide = document.createElement("div");
  slide.className = `slide slide-${i}`;

  for (let j = numb; j < allProductsInJSON.length; j++) {
    createProduct(allProductsInJSON[j], slide);

    if ((j + 1) % num == 0) {
      allSlidesWrapper.appendChild(slide);
      numb = j + 1;
      break;
    } else if (j + 1 > 9) {
      // to reset the current slide after every product has been added
      allSlidesWrapper.appendChild(slide);
    }
  }
}

function createProduct(productObj, ourSlide) {
  let aProduct = $("<div/>", {
    id: productObj.id,
    class: "a-product",
    "data-cnd": productObj.condition,
    "data-sz": productObj.size,
    "data-ctg": productObj.category,
    "data-sub-ctg": productObj["sub-category"],
    "data-stl": productObj.style,
  });
  aProduct.html(`
  <span class="before">${productObj.condition}</span>
      <div class="img">
        <img src="${productObj.img}"/>
      </div>
      <div class="info">
        <h2 class="name">${productObj.name}</h2>
        <span class="type d-bl">${productObj["sub-category"]}</span>
        <div class="b-a-price d-fl">
          <span class="price">${productObj.price}</span>
          <del class="prev-price">${productObj.previousPrice}</del>
        </div>
        <a class="cart" href="http://e-shop/shop.index/${productObj.name}"><i class="bx bx-cart-alt"></i></a>
      </div>
    `);

  ourSlide.appendChild(aProduct.get()[0]);
}

let swiperPagination = document.createElement("div");
swiperPagination.className = "all-products-pagination";
allSlidesWrapper.after(swiperPagination);

// // // CREATE THE SWIPER FOR SLIDES
let allSlides = document.querySelectorAll(".all-slides-wrapper .slide");
slidesNumber;
let currentSlide = 1;
let sliderControlsUp = $(".all-products-pagination");

for (let i = 1; i <= slidesNumber; i++) {
  let liItem = $(`<span data-index="${i}">${i}</span>`);
  sliderControlsUp.append(liItem);
}

let sliderControls = document.querySelectorAll(".all-products-pagination span");

function removeActiveClass(el) {
  el.classList.remove("active");
}

let goToSlide;
(goToSlide = function () {
  allSlides.forEach((slide) => removeActiveClass(slide));
  allSlides[currentSlide - 1].classList.add("active");

  sliderControls.forEach((sliderControl) => removeActiveClass(sliderControl));
  sliderControls[currentSlide - 1].classList.add("active");
})();

// // // the controles on the click event

for (let i = 0; i < sliderControls.length; i++) {
  sliderControls[i].onclick = () => {
    currentSlide = +sliderControls[i].getAttribute("data-index");
    goToSlide();
  };
}

// // // FILTERS

let allInputs = document.querySelectorAll("[type='checkbox']");

let filtersSlide = document.createElement("div");
filtersSlide.className = "slide filters-slide";

let checkedItems = filtersSlide.children.length;

for (let i = 0; i < allInputs.length; i++) {
  const input = allInputs[i];

  input.onclick = () => {
    if (input.hasAttribute("checked")) {
      let choosenProducts = document.querySelectorAll(
        ".filters-slide .a-product"
      );
      for (let i = 0; i < choosenProducts.length; i++) {
        const choosenProduct = choosenProducts[i];
        if (
          Object.values(choosenProduct.dataset).find((str) => str == input.id)
        ) {
          choosenProduct.remove();
        }
      }

      input.removeAttribute("checked");
    } else {
      // doesn't have the checked attribute
      if ($(".select-filters [checked]").length > 0) {
        let existedProducts = $(".filters-slide .a-product");
        let existedProductsIdAttrs = [...existedProducts.map((i, el) => el.id)];

        for (let j = 0; j < allProductsInJSON.length; j++) {
          const productObj = allProductsInJSON[j];

          if (Object.values(productObj).find((str) => str == input.id)) {
            if (existedProductsIdAttrs.every((id) => +id != productObj.id)) {
              createProduct(productObj, filtersSlide);
            }
          }
        }
      } else {
        for (let i = 0; i < allProductsInJSON.length; i++) {
          const productObj = allProductsInJSON[i];

          if (Object.values(productObj).find((str) => str == input.id)) {
            createProduct(productObj, filtersSlide);
          }
        }
      }

      allSlidesWrapper.append(filtersSlide);
      allSlides.forEach((slide) => removeActiveClass(slide));
      filtersSlide.classList.add("active");
      input.setAttribute("checked", "");
    }
  };
}
