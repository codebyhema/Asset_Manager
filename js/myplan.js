const checkbox = document.getElementById("check");
const currencySymbols = document.querySelectorAll(".symbol");
const currencyTexts = document.querySelectorAll(".currency");
const price = document.querySelectorAll(".price");

const exchangeRate = 50; // Example: 1 USD = 50 INR

checkbox.addEventListener("click", function () {
  if (checkbox.checked) {
    // Convert to USD
    currencySymbols.forEach((Symbol) => {
      Symbol.innerHTML = "$";
    });
    currencyTexts.forEach((text) => {
      text.innerHTML = "USD/Year";
    });
    price.forEach((price) => {
      const inrPrice = parseFloat(price.innerHTML.replace(/[^0-9.-]+/g, ""));
      price.innerHTML = (inrPrice / exchangeRate).toLocaleString();
    });
  } else {
    // Convert back to INR
    currencySymbols.forEach((symbol) => {
      symbol.innerHTML = "₹"; // Update symbol to INR
    });
    currencyTexts.forEach((text) => {
      text.innerHTML = "INR/Year"; // Update text to "INR/Year"
    });
    price.forEach((price) => {
      const usdPrice = parseFloat(price.innerHTML.replace(/[^0-9.-]+/g, ""));
      price.innerHTML = (usdPrice * exchangeRate).toLocaleString();
    });
  }
});
document
  .querySelector(".get-version")
  .addEventListener("click", function (event) {
    const show = document.querySelector(".form");
    const body = document.body;

    // Prevent event from propagating to document's click listener
    event.stopPropagation();

    if (show.style.display === "block") {
      show.style.display = "none";
      body.classList.remove("blurred");
    } else {
      show.style.display = "block";
      body.classList.add("blurred");
    }
  });
// Close the form popup when clicking outside
document.addEventListener("click", (event) => {
  const show = document.querySelector(".form"); // Popup form
  const openButton = document.querySelector(".get-version"); // Open button

  if (show.style.display === "block" && !show.contains(event.target)) {
    show.style.display = "none"; // Hide the form
    document.body.classList.remove("blurred"); // Remove the blur effect
  }
});

document.getElementById("meetingform").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  const form = e.target;
  const formData = new FormData(form);

  fetch("saveMeeting.php", {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.ok) {
      const container = document.getElementById("form-container");
      const thankYou = document.getElementById("thank-you");
      const formContent = document.getElementById("form-content");
      container.classList.add("show-thank-you");
      formContent.style.display = "none";
      thankYou.style.display = "block"; // Ensure it's visible
    }
  });
});
