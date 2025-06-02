// Select all elements with the class "more-details"
document.querySelectorAll(".more-details").forEach((button) => {
  button.addEventListener("click", function () {
    // Find the dropdown content and symbol relative to the clicked button
    const dropdownContent = this.nextElementSibling; // Get the direct sibling
    const dropdownSymbol = this.querySelector("#dropdown-symbol");

    if (dropdownContent && dropdownSymbol) {
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
    }
  });
});

function confirmDelete(event) {
  event.preventDefault(); // Prevent the link from navigating immediately

  const confirmAction = confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );
  if (confirmAction) {
    window.location.href = "signout.php"; // Correct redirection
  }
}
