// Change navbar background on scroll
window.addEventListener("scroll", function() {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Toggle mobile menu
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", function() {
  menu.classList.toggle("show");
});
