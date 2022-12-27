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

function createProduct(prodObj, container) {
  let newProduct = document.createElement("div");
  newProduct.id = prodObj.id;
  newProduct.className = "new-product swiper-slide";
  newProduct.innerHTML = `
    <div class="img">
      <img src="${prodObj.img}"/>
    </div>
    <div class="info">
      <h2 class="name">${prodObj.name}</h2>
      <span class="type d-bl">${prodObj.type}</span>
      <div class="b-a-price d-fl">
        <span>$<span class="price">${prodObj.price}</span></span>
        <del class="prev-price">${prodObj.previousPrice}</del>
      </div>
      <a class="cart"><i class="bx bx-cart-alt"></i></a>
    </div>
    `;
  container.appendChild(newProduct);
}
// // // put the arrival products in there place
let newArrivals = document.querySelector("#new-arrivals .swiper-wrapper");
for (let i = 0; i < arrivalProductsInJSON.length; i++) {
  createProduct(arrivalProductsInJSON[i], newArrivals);
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

// // // ADD THE CHOOSEN PRODUCT from LocalStorage & Products TO THE CART
function addToCart(productObj, quantity) {
  let chosenProd = $("<div/>", {
    id: productObj.id,
    class: "chosen-product",
  });

  chosenProd.html(`
  <div class="img">
     <img src="${productObj.img}" alt="monto" />
  </div>
  <div class="details">
    <h3 class="product-title">${productObj.name}</h3>
    <span class="price d-bl">${productObj.price}</span>
    <div class="controls">
      <span class="minus">&minus;</span>
      <span class="amount">${quantity}</span>
      <span class="plus">&plus;</span>
      <i class="bx bx-trash bx-sm trash"></i>
    </div>
  </div>`);

  chosenProductsUp.prepend(chosenProd);
}

let chosenProductsUp = $("header .chosen-products");
let chosenProductsNum = $("header .final-details .chosen-products_number");
let allCarts = $(".info .cart");

let chosenProductsfromLS =
  JSON.parse(localStorage.getItem("chosen Products")) ?? [];
chosenProductsfromLS.forEach((arr) => {
  addToCart(
    arrivalProductsInJSON.find((obj) => obj.id == arr[0]),
    arr[1]
  );
});

let itemsNumfromLS = +localStorage.getItem("item(s) Number");
chosenProductsNum.children()[0].innerHTML = itemsNumfromLS; // quantity of products

let theCost = JSON.parse(localStorage.getItem("the Cost"));
chosenProductsUp.next().find("#cost").html(theCost.toFixed(2));

for (let i = 0; i < allCarts.length; i++) {
  allCarts[i].onclick = () => {
    // I want to add the product ID & its QUANTITY to an arr
    // it was necessary to write RETURN because there was brackets
    // the console inside the condition is bad, because it doesn't return what is inside it
    let ourProduct = allCarts[i].closest(".new-product");

    if (chosenProductsfromLS.length > 0) {
      if (chosenProductsfromLS.every((arr) => arr[0] != +ourProduct.id)) {
        chosenProductsfromLS.push([+ourProduct.id, 1]);
      } else {
        chosenProductsfromLS.find((arr) => arr[0] == +ourProduct.id)[1]++;
      }
    } else {
      chosenProductsfromLS.push([+ourProduct.id, 1]);
    }

    chosenProductsUp.get()[0].innerHTML = "";
    chosenProductsfromLS.forEach((arr) => {
      addToCart(
        arrivalProductsInJSON.find((obj) => obj.id == arr[0]),
        arr[1]
      );
    });
    localStorage.setItem(
      "chosen Products",
      JSON.stringify(chosenProductsfromLS)
    );

    chosenProductsNum.children()[0].innerHTML = ++itemsNumfromLS;
    localStorage.setItem("item(s) Number", itemsNumfromLS);

    theCost = (
      +chosenProductsUp.next().find("#cost").get()[0].innerHTML +
      +$(ourProduct).find(".price").html()
    ).toFixed(2);
    chosenProductsUp.next().find("#cost").get()[0].innerHTML = theCost;
    localStorage.setItem("the Cost", JSON.stringify(theCost));

    allPlusSigns = chosenProductsUp.find(".plus");
    allMinusSigns = chosenProductsUp.find(".minus");
    allTrashIcons = chosenProductsUp.find(".trash");
    reduceIncreaseRemoveCost();
  };
}

// // increase/decrease the number of items.
let allPlusSigns = chosenProductsUp.find(".plus");
let allMinusSigns = chosenProductsUp.find(".minus");
let allTrashIcons = chosenProductsUp.find(".trash");
let reduceIncreaseRemoveCost;

(reduceIncreaseRemoveCost = function () {
  for (let p = 0; p < allPlusSigns.length; p++) {
    allPlusSigns[p].onclick = () => {
      allPlusSigns[p].previousElementSibling.innerHTML++;
      chosenProductsfromLS.find(
        (arr) => arr[0] == allPlusSigns[p].closest(".chosen-product").id
      )[1]++;
      localStorage.setItem(
        "chosen Products",
        JSON.stringify(chosenProductsfromLS)
      );

      chosenProductsNum.children()[0].innerHTML = ++itemsNumfromLS;
      localStorage.setItem("item(s) Number", itemsNumfromLS);

      theCost = (
        +chosenProductsUp.next().find("#cost").get()[0].innerHTML +
        +$(allPlusSigns[p]).parent().prev().html()
      ).toFixed(2);
      chosenProductsUp.next().find("#cost").html(theCost);
      localStorage.setItem("the Cost", JSON.stringify(theCost));
    };
  }

  for (let m = 0; m < allMinusSigns.length; m++) {
    allMinusSigns[m].onclick = () => {
      if (allMinusSigns[m].nextElementSibling.innerHTML == 1) return;
      allMinusSigns[m].nextElementSibling.innerHTML--;
      chosenProductsfromLS.find(
        (arr) => arr[0] == allMinusSigns[m].closest(".chosen-product").id
      )[1]--;
      localStorage.setItem(
        "chosen Products",
        JSON.stringify(chosenProductsfromLS)
      );

      chosenProductsNum.children()[0].innerHTML = --itemsNumfromLS;
      localStorage.setItem("item(s) Number", itemsNumfromLS);

      theCost = (
        +chosenProductsUp.next().find("#cost").get()[0].innerHTML -
        +$(allMinusSigns[m]).parent().prev().html()
      ).toFixed(2);
      chosenProductsUp.next().find("#cost").html(theCost);
      localStorage.setItem("the Cost", JSON.stringify(theCost));
    };
  }

  for (let t = 0; t < allTrashIcons.length; t++) {
    allTrashIcons[t].onclick = () => {
      let relatedProd = allTrashIcons[t].closest(".chosen-product");

      itemsNumfromLS =
        itemsNumfromLS -
        chosenProductsfromLS.find((arr) => arr[0] == relatedProd.id)[1];
      chosenProductsNum.children()[0].innerHTML = itemsNumfromLS;
      localStorage.setItem("item(s) Number", itemsNumfromLS);

      theCost = (
        +chosenProductsUp.next().find("#cost").get()[0].innerHTML -
        +$(allTrashIcons[t]).parent().prev().html() *
          chosenProductsfromLS.find((arr) => arr[0] == relatedProd.id)[1]
      ).toFixed(2);
      chosenProductsUp.next().find("#cost").html(theCost);
      localStorage.setItem("the Cost", JSON.stringify(theCost));

      chosenProductsfromLS.splice(
        chosenProductsfromLS.indexOf(
          chosenProductsfromLS.find((arr) => arr[0] == relatedProd.id)
        ),
        1
      );
      localStorage.setItem(
        "chosen Products",
        JSON.stringify(chosenProductsfromLS)
      );

      relatedProd.remove();
    };
  }
})();
