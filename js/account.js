// Section 1: Toggle between Sign In and Sign Up Forms
const signInBtnLink = document.querySelector(".signInBtn-link");
const signUpBtnLink = document.querySelector(".signUpBtn-link");
const wrapper = document.querySelector(".wrapper");

// Event listener for switching to Sign Up form when Sign Up link is clicked
signUpBtnLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});
// Event listener for switching to Sign In form when Sign In link is clicked
signInBtnLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});

// Section 2: Toggle Password Visibility for Sign In Form
const showPasswordIcon = document.querySelector("#show-password");
const passwordField = document.querySelector("#password");

// Event listener for showing/hiding the password when the icon is clicked
showPasswordIcon.addEventListener("click", function () {
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  this.classList.toggle("fa-lock");
  this.classList.toggle("fa-lock-open");
});

// Section 3: Toggle Password Visibility for Sign Up Form
const showSignUpPasswordIcon = document.querySelector("#show-signup-password");
const signUpPasswordField = document.querySelector("#signup-password");

// Event listener for showing/hiding the password when the icon is clicked for the Sign Up form
showSignUpPasswordIcon.addEventListener("click", function () {
  const type =
    signUpPasswordField.getAttribute("type") === "password"
      ? "text"
      : "password";
  signUpPasswordField.setAttribute("type", type);
  this.classList.toggle("fa-lock");
  this.classList.toggle("fa-lock-open");
});
document.getElementById("log-out").addEventListener("click", function (event) {
  confirmLogout(event);
});

function confirmLogout(event) {
  event.preventDefault(); // Prevent the link from navigating immediately

  const confirmAction = confirm("Are you sure you want to log out?");
  if (confirmAction) {
    window.location.href = "logout.php"; // Correct redirection
  }
}
