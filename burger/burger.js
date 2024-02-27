const burger = document.getElementById("burger");
burger.addEventListener("click", toggleBurger);
document.addEventListener("mouseup", closeOnClicOut);
function closeOnClicOut(e) {
  if (!burger.contains(e.target) && burger.classList.contains("active")) {
    toggleBurger();
  }
}
function toggleBurger() {
  burger.classList.toggle("active");
}
