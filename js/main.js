import arrivalProductsInJSON from "../json/newProducts.json" assert { type: "json" };
import allProductsInJSON from "../json/allProducts.json" assert { type: "json" };
let allProductsFromJsons = arrivalProductsInJSON.concat(allProductsInJSON);

// if you imported a JSON file without determining the type of the js file,
//  the js file will not work.

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

let closeIcon = $(".close-icon");
function showAndHide(asideEl) {
  asideEl.css("right", "0");
  closeIcon.on("click", (e) => {
    $(e.currentTarget).closest(asideEl).css("right", " -35em");
  });
}

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

// // // SHOWING NAVBAR
let navIcon = $(".menu-icon");
let navBar = $(".aside-pages-bar");

navIcon.on("click", () => {
  showAndHide(navBar);
});

// // // if the user is existed
let exist = JSON.parse(localStorage.getItem("exist")) || "";
if (exist.length) {
  let abbr = $("<abbr/>", {
    text: exist,
    title: "double click to log out",
  });
  userIcon.before(abbr).hide();

  let personName = $("abbr[title]");
  personName.dblclick((e) => {
    e.target.remove();
    userIcon.show();
    exist = "";
    localStorage.setItem("exist", JSON.stringify(exist));
  });
}
// // // All About The Register Page
let ourLogInForm = $(".log-in-form");
let registerButton = ourLogInForm.children()[4].children[0];

let ourSignUpForm = $(".sign-up-form");
let SignInButton = ourSignUpForm.children()[5].children[0];

let peopleList = JSON.parse(localStorage.getItem("people List")) || [];

ourLogInForm.children("input#sign-in").click((e) => {
  e.preventDefault();
  if (
    peopleList.find(
      (obj) =>
        obj.email == ourLogInForm.children()[1].value &&
        obj.password == ourLogInForm.children()[2].value
    )
  ) {
    exist = peopleList.find(
      (obj) => obj.email == ourLogInForm.children()[1].value
    ).username;
    userIcon.before(exist).hide();
    localStorage.setItem("exist", JSON.stringify(exist));
    console.log(ourLogInForm.children()[1], ourLogInForm.children());
    ourLogInForm.children().eq(1).val("");
    ourLogInForm.children().eq(2).val("");
    location.reload();
  } else {
    if (
      peopleList.find(
        (obj) =>
          obj.email == ourLogInForm.children()[1].value ||
          obj.password == ourLogInForm.children()[2].value
      )
    ) {
      alert("your password or email is wrong");
    } else {
      alert("There is no email equal that in the local storage");
    }
  }
});

registerButton.onclick = () => {
  asideRegister.css("width", "100vw");
  ourLogInForm.attr("hidden", "");
  ourSignUpForm[0].removeAttribute("hidden");
  ourLogInForm.children().eq(1).val("");
  ourLogInForm.children().eq(2).val("");

  closeIcon.click(() => {
    if (window.innerWidth >= 678) {
      asideRegister.css("width", "25em");
    }
  });
};

ourSignUpForm.children("input[type='submit']").click((e) => {
  e.preventDefault();
  if (
    peopleList.find((obj) => obj.email == ourSignUpForm.children()[2].value)
  ) {
    alert("this email has already been registered");
  } else {
    peopleList.push({
      username: String(ourSignUpForm.children()[1].value),
      email: String(ourSignUpForm.children()[2].value),
      password: String(ourSignUpForm.children()[3].value),
    });

    localStorage.setItem("people List", JSON.stringify(peopleList));
    alert("remember your email & password");
    location.reload();
  }
});

SignInButton.onclick = () => {
  ourSignUpForm.attr("hidden", "");
  ourLogInForm.children("input").css("margin", "0 auto 1em");
  ourLogInForm.children("p").css("text-align", "center");
  ourLogInForm[0].removeAttribute("hidden");
  ourSignUpForm.children().eq(1).val("");
  ourSignUpForm.children().eq(2).val("");
  ourSignUpForm.children().eq(3).val("");
};

// // // a little bit of JS for the FAQ's Page
let details = $("details");
let allSummaries = $("summary");

for (let i = 0; i < details.length; i++) {
  // we use toggle instead of click
  // when there is sth such an attr that change automaticaly in html on click

  details[i].ontoggle = () => {
    if (details[i].open) {
      allSummaries[i].children[1].style.rotate = "90deg";
      allSummaries[i].style.color = "#fff";
      [...allSummaries[i].children].forEach(
        (span) => (span.style.backgroundColor = "#fff")
      );
    } else {
      allSummaries[i].children[1].style.rotate = "0deg";
      allSummaries[i].style.color = "#444";
      [...allSummaries[i].children].forEach(
        (span) => (span.style.backgroundColor = "#444")
      );
    }
  };
}

// onload: to do sth immediately after the window has been loaded
// // // ADD THE CHOOSEN PRODUCT from LocalStorage & Products TO THE CART, in addition to its actions
window.onload = () => {
  function addToCart(productObj, quantity, container) {
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
    <p>$<span class="price">${productObj.price}</span></p>
    <div class="controls">
      <span class="minus">&minus;</span>
      <span class="amount">${quantity}</span>
      <span class="plus">&plus;</span>
      <i class="bx bx-trash bx-sm trash"></i>
    </div>
  </div>`);

    $(container).prepend(chosenProd);
  }

  let chosenProductsUp = $("header .chosen-products");
  let chosenProductsNum = $("header .final-details .chosen-products_number");
  let allCarts = $(".info .cart");

  let chosenProductsfromLS =
    JSON.parse(localStorage.getItem("chosen Products")) ?? [];
  chosenProductsfromLS.forEach((arr) => {
    addToCart(
      allProductsFromJsons.find((obj) => obj.id == arr[0]),
      arr[1],
      chosenProductsUp
    );
  });

  let itemsNumfromLS = +localStorage.getItem("item(s) Number");
  chosenProductsNum.children()[0].innerHTML = itemsNumfromLS; // quantity of products

  let theCost = +JSON.parse(localStorage.getItem("the Cost"));
  chosenProductsUp.next().find("#cost").html(theCost.toFixed(2));

  for (let i = 0; i < allCarts.length; i++) {
    allCarts[i].onclick = () => {
      // I want to add the product ID & its QUANTITY to an arr
      // it was necessary to write RETURN because there was brackets
      // the console inside the condition is bad, because it doesn't return what is inside it
      let ourProduct =
        allCarts[i].closest(".new-product") ||
        allCarts[i].closest(".a-product");

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
          allProductsFromJsons.find((obj) => obj.id == arr[0]),
          arr[1],
          chosenProductsUp
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
          +$(allPlusSigns[p]).parent().prev().children().first().html()
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
          +$(allMinusSigns[m]).parent().prev().children().first().html()
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
          +$(allTrashIcons[t]).parent().prev().children().first().html() *
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
};
