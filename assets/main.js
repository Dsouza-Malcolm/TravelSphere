function changeCss() {
  var bodyElement = document.querySelector(".destination-body");
  var navElement = document.querySelector("nav");
  let sideBar = document.querySelector(".l-nav");
  this.scrollY > 20 ? (sideBar.style.top = 0) : (sideBar.style.top = "85px");
}
window.addEventListener("scroll", changeCss, false);
