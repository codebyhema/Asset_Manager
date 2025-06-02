document.addEventListener("DOMContentLoaded", async function () {
  // Get references to the tab buttons
  const addButton = document.querySelector(".add.button");
  const updateButton = document.querySelector(".update.button");
  const deleteButton = document.querySelector(".delete.button");

  // Get references to the tab content containers
  const addAssets = document.querySelector(".add-assets");
  const updateAssets = document.querySelector(".update-assets");
  const deleteAssets = document.querySelector(".delete-assets");

  // function that shows the clicked tab
  function showTab(tabToShow) {
    // Check if the chosen tab is already visible by using the computed style.
    const isVisible = window.getComputedStyle(tabToShow).display == "block";

    if (isVisible) {
      // If it's visible, hide it.
      tabToShow.style.display = "none";
    } else {
      // Reset inline display styles, so the CSS (display: none) takes over
      addAssets.style.display = "";
      updateAssets.style.display = "";
      deleteAssets.style.display = "";

      // Then set the chosen tab to be visible.
      tabToShow.style.display = "block";
    }
  }
  // Attach click event listeners to each button
  addButton.addEventListener("click", () => {
    showTab(addAssets);
  });
  updateButton.addEventListener("click", () => {
    showTab(updateAssets);
  });
  deleteButton.addEventListener("click", () => {
    showTab(deleteAssets);
  });
});

document.querySelectorAll(".category-assets").forEach((categoryDropdown) => {
  categoryDropdown.addEventListener("change", function () {
    let selectedCategory = this.value;

    // Find the closest section (Update or Delete) and then find its asset dropdown
    let assetDropdown = this.closest("form").querySelector(".asset-name");

    let options = assetDropdown.querySelectorAll("option");

    options.forEach((option) => {
      if (
        option.getAttribute("data-cat") === selectedCategory ||
        option.value === ""
      ) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
    assetDropdown.value = "";
  });
});

// value fetch in value input
let nameselect = document.getElementById("nameselect");

nameselect.addEventListener("change", async function () {
  let response = await fetch("filter_fetch.php");
  let jsondata = await response.json();

  let nameselectvalue = nameselect.value;

  let valuenumber;

  jsondata
    .filter((item) => item.asset_name === nameselectvalue)
    .map((item) => {
      valuenumber = item.asset_value;
    });

  document.getElementById("valueselect").value = valuenumber;
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // Toast disappears after 2 seconds
}

document
  .getElementById("addAssetForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // prevent normal form submission

    const form = e.target;
    const formData = new FormData(form);

    formData.append("addAsset", "1");

    fetch("track.php", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        showToast("Asset Added Successfully!");
        form.reset();
        setTimeout(() => {
          location.reload();
        }, 1000); // waits 1 seconds before reloading
      }
    });
  });
document
  .getElementById("updateAssetForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // prevent normal form submission

    const form = e.target;
    const formData = new FormData(form);

    formData.append("updateAsset", "1");

    fetch("track.php", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        showToast("Asset updated Successfully!");
        form.reset();
        setTimeout(() => {
          location.reload();
        }, 1000); // waits 1 seconds before reloading
      }
    });
  });
document
  .getElementById("deleteAssetForm")
  .addEventListener("submit", function (e) {
    // e.preventDefault(); // prevent normal form submission

    const form = e.target;
    const formData = new FormData(form);

    formData.append("deleteAsset", "1");

    fetch("track.php", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        showToast("Asset deleted Successfully!");
        form.reset();
        setTimeout(() => {
          location.reload();
        }, 1000); // waits 1  seconds before reloading
      }
    });
  });
