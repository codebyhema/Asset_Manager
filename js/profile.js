document.querySelector(".more-details").addEventListener("click", function () {
  const dropdownContent = document.querySelector(".dropdown-content");
  const dropdownSymbol = document.querySelector("#dropdown-symbol");

  // Toggle visibility of dropdown content
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    dropdownSymbol.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-right" id="chevron-right" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
    </svg>`; // Change to right arrow
  } else {
    dropdownContent.style.display = "block";
    dropdownSymbol.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-down"  id="chevron-down" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
    </svg>`; // Change to down arrow
  }
});

document.getElementById("moreDetails").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  const form = e.target;
  const formData = new FormData(form);

  fetch("moreDetails.php", {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.ok) {
      alert("details have been updated");
    }
  });
});
