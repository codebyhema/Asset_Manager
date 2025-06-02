const toggleToLight = document.getElementById("toggle-to-light");
toggleToLight.onclick = function () {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    toggleToLight.style.transform = "scaleX(-1.1)";
    toggleToLight.style.filter = "invert(0)"; // Black (default for light mode)
  } else {
    toggleToLight.style.transform = "scaleX(1.1)";
    toggleToLight.style.filter = "invert(1)"; // white (default for dark mode)
  }
};

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu");

menuToggle.addEventListener("click", function () {
  sidebar.classList.toggle("collapsed");
});
