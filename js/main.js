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

function showAndHide(asideEl) {
  asideEl.css("right", "0");
  let closeIcon = $(".close-icon ");
  closeIcon.on("click", (e) => {
    $(e.currentTarget).closest(asideEl).css("right", " -26em");
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
  console.log(navBar);
});
