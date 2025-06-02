const addButton = document.getElementById("add-widgets");
const boxContainer = document.getElementById("box-container");
// const saveReport = document.getElementById("save-report");

const MAX_BOXES = 10;

// load saved widget with data
async function savedataload() {
  let responsedata = await fetch("savedataload.php");
  let data = await responsedata.json();

  let i = 0;
  while (i < data.length) {
    const newBox = document.createElement("div");
    newBox.classList.add("box");
    newBox.setAttribute("data-id", data[i].id);

    // Create the close button
    const closeButton = document.createElement("span");
    closeButton.classList.add("close-btn");
    closeButton.innerHTML = "&times;";
    newBox.appendChild(closeButton);

    // Create filter button with dropdown
    const filterDropdown = document.createElement("div");
    filterDropdown.classList.add("filter-dropdown");
    filterDropdown.innerHTML = `
     <button class="filter-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel icon" viewBox="0 0 16 16">
      <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
      </svg>
     </button>
    <div class="filterBox">
        <h4>Filter Options</h4>
        <!-- Chart Type Dropdown -->
        <form class="filterForm">
          <div class="dropdown">
              <select  name="category" class="chartType">
                  <option value="" disabled selected>Select Chart Type</option>
                  <option value="table">Table</option>
                  <option value="pie">Pie Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="netWorth">Net Worth</option>
              </select>       
          </div>
          <div class="dropdown table">
              <select  name="assettype" class="assetType">
                  <option value="" disabled selected>Select Asset Type</option>
                  <option value="All">All</option>
                  <option value="Cash">Cash</option>
                  <option value="Investments">Investments</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Loans">Loans</option>
                  <option value="Taxable Fixed Income">Taxable Fixed Income</option>
                  <option value="Non Taxable Fixed Income">Non Taxable Fixed Income</option>
                  <option value="Alternative Investments">Alternative Investments</option>
                  <option value="Business Interest">Business Interest</option>
                  <option value="Intellectual Property">Intellectual Property</option>
                  <option value="Insurance Policies">Insurance Policies</option>
                  <option value="Miscellaneous Assets">Miscellaneous Assets</option>
                  <option value = "Other">Other</option>
              </select>       
          </div>
          <div class="dropdown pie">
              <select  name="pietype" class="columnType">
                  <option value="" disabled selected>Select Column Type</option>
                  <option value="assetvalue">Asset Value</option>
                  <option value="allocation">Allocation(%)</option>
              </select>       
          </div>
          <div class="dropdown Bar">
              <select  name="bartype" class="columnType">
                  <option value="" disabled selected>Select Column Type</option>
                  <option value="assetvalue">Asset Value</option>
                  <option value="allocation">Allocation(%)</option>
              </select>       
          </div>
          <div class="dropdown Bar checkbox-dropdown ">
              <!-- Button to toggle the dropdown display -->
              <button type="button" class="checkbox-btn">Select Assets</button>
              <!-- This container is the dropdown menu that holds the checkboxes -->
              <div class ="checkbox-menu" style="display: none;">
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Cash"> Cash
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Investments"> Investments
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Real Estate"> Real Estate
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Taxable Fixed Income"> Taxable Fixed Income
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Non Taxable Fixed Income"> Non Taxable Fixed Income
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Alternative Investments"> Alternative Investments
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Business Interest"> Business Interest 
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Intellectual Property"> Intellectual Property
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Insurance Policies"> Insurance Policies
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Miscellaneous Assets"> Miscellaneous Assets
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Other"> Other
                </label>
              </div>
          </div>
          <div class="dropdown net">
              <select  name="nettype" class="columnType">
                  <option value="" disabled selected>Select Any One </option>
                  <option value="Current Net Worth">Current Net Worth</option>
                  <option value="Total Assets">Total Assets</option>
                  <option value="Total Liabilities">Total Liabilities</option>
              </select> 
          </div>
          <input type="hidden" value="${data[i].id}" name="id">
          <input type="submit" value="RUN" class="filter-submit">
        </form>
    </div>
   `;
    newBox.appendChild(filterDropdown);
    const outputele = document.createElement("div");
    outputele.classList.add("output");
    newBox.appendChild(outputele);

    // Getting  the chart type select element in the current widget.
    const chartTypeSelect = newBox.querySelector(".chartType");
    // Getting the corresponding additional dropdown containers.
    const tableDropdown = newBox.querySelector(".dropdown.table");
    const pieDropdown = newBox.querySelector(".dropdown.pie");
    const barDropdown = newBox.querySelector(".dropdown.Bar");
    const checkDropdown = newBox.querySelector(".checkbox-dropdown");
    const netDropdown = newBox.querySelector(".dropdown.net");
    const filterSubmitButton = newBox.querySelector(".filter-submit");

    // Add the change event listener to the chart type dropdown
    chartTypeSelect.addEventListener("change", function () {
      // Hide all extra dropdowns first
      tableDropdown.style.display = "none";
      pieDropdown.style.display = "none";
      barDropdown.style.display = "none";
      checkDropdown.style.display = "none";
      netDropdown.style.display = "none";

      // Show the dropdown that corresponds to the selected chart type
      if (chartTypeSelect.value === "table") {
        tableDropdown.style.display = "block";
        filterSubmitButton.style.display = "block";
      } else if (chartTypeSelect.value === "pie") {
        pieDropdown.style.display = "block";
        filterSubmitButton.style.display = "block";
      } else if (chartTypeSelect.value === "bar") {
        barDropdown.style.display = "block";
        checkDropdown.style.display = "block";
        filterSubmitButton.style.display = "block";
      } else if (chartTypeSelect.value === "netWorth") {
        netDropdown.style.display = "block";
        filterSubmitButton.style.display = "block";
      }
    });

    newBox
      .querySelector(".filterForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevents page reload

        // Fetch JSON data
        let response = await fetch("filter_fetch.php");
        let jsondata = await response.json();

        let formData = new FormData(this);
        let category = formData.get("category");
        let assettype = formData.get("assettype");
        let pietype = formData.get("pietype");
        let bartype = formData.get("bartype");
        console.log(bartype);
        let nettype = formData.get("nettype");

        if (category === "table") {
          let fetchResponse = await fetch("visualization/table.php");
          let data = await fetchResponse.text();

          newBox.querySelector(".output").innerHTML = data;

          let tablecontainer = newBox.querySelector(
            ".table-wrapper .table-container table"
          );

          if (category === "table" && assettype === "All") {
            let totalValue = jsondata.reduce(
              (sum, item) => sum + item.category_asset_value,
              0
            );

            // Define liquidity levels for each category
            const liquidityLevels = {
              Cash: "High",
              Investments: "High",
              "Real Estate": "Low",
              Loans: "Low",
              "Taxable Fixed Income": "Medium",
              "Non Taxable Fixed Income": "Medium",
              "Alternative Investments": "Low",
              "Business Interest": "Low",
              "Intellectual Property": "Low",
              "Insurance Policies": "Low",
              "Miscellaneous Assets": "Varies",
              Other: "Varies",
            };

            let groupedData = {};
            jsondata.forEach((item) => {
              if (!groupedData[item.asset_category]) {
                groupedData[item.asset_category] = {
                  asset_category: item.asset_category,
                  total_value: 0, // Start from 0
                  allocation: 0, // Placeholder for allocation %
                  liquidity: liquidityLevels[item.asset_category] || "Unknown", // Assign liquidity level
                };
              }
              // Sum up values
              groupedData[item.asset_category].total_value +=
                item.category_asset_value;
            });
            // Step 3: Calculate allocation percentage
            Object.keys(groupedData).forEach((key) => {
              groupedData[key].allocation = (
                (groupedData[key].total_value / totalValue) *
                100
              ).toFixed(2);
            });
            let thead = `
                <thead>
                  <tr>
                    <th></th>
                    <th>Value</th>
                    <th>Allocation(%)</th>
                    <th>Liquidity</th>
                  </tr>
                </thead>`;

            // Step 5: Generate unique category rows
            let tbody = Object.values(groupedData)
              .map(
                (item) => `
                  <tr>
                    <td>${item.asset_category}</td>
                    <td>${item.total_value.toLocaleString("en-IN")}</td>
                    <td>${item.allocation}%</td>
                    <td>${item.liquidity}</td>
                  </tr>
                `
              )
              .join("");
            tablecontainer.innerHTML = thead + tbody;
          } else {
            let thead = `
                <thead>
                  <tr>
                    <th></th>
                    <th>Value</th>
                    <th>Growth/Decline(%)</th>
                    <th>Last update</th>
                  </tr>
                </thead>`;

            let tbody = jsondata
              .filter((item) => item.asset_category === assettype)
              .map((item) => {
                // Convert last_date string to a Date object
                let date = new Date(item.last_date);
                let formattedDate = date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                let heading = newBox.querySelector(
                  ".table-wrapper .heading h2"
                );
                heading.textContent = ` Detailed Breakdown of Your ${assettype} as on date ${formattedDate} `;
                return `
                  <tr>
                    <td>${item.asset_name}</td>
                    <td>${(Number(item.asset_value) || 0).toLocaleString(
                      "en-IN"
                    )}</td>
  
                    <td>${
                      item.last_asset_value && item.last_asset_value !== 0
                        ? Math.min(
                            (
                              ((item.asset_value - item.last_asset_value) /
                                item.last_asset_value) *
                              100
                            ).toFixed(2),
                            1000
                          ) + "%"
                        : "N/A"
                    }</td>
                    
                    <td>${formattedDate}</td>
                  </tr>
                `;
              })
              .join("");
            tablecontainer.innerHTML = thead + tbody;
          }
        } else if (category === "pie") {
          if (category === "pie" && pietype === "allocation") {
            let fetchResponse = await fetch("visualization/piechart.php");
            let data = await fetchResponse.text();
            newBox.querySelector(".output").innerHTML = data;

            let totalValue;
            let groupedData = {};
            jsondata.forEach((item) => {
              if (!groupedData[item.asset_category]) {
                groupedData[item.asset_category] = {
                  asset_category: item.asset_category,
                  total_value: 0, // Start from 0
                  allocation: 0, // Placeholder for allocation %
                };
              }

              totalValue = jsondata.reduce(
                (sum, item) => sum + item.category_asset_value,
                0
              );

              // Sum up values
              groupedData[item.asset_category].total_value +=
                item.category_asset_value;
            });

            // Step 3: Calculate allocation percentage
            Object.keys(groupedData).forEach((key) => {
              groupedData[key].allocation = (
                (groupedData[key].total_value / totalValue) *
                100
              ).toFixed(0);
            });

            let pie = newBox.querySelector(".pie-container .pie-chart");
            let figcaption = newBox.querySelector(
              ".pie-container .detail-info .detail-info-content"
            );

            //
            let colors = [
              "--c1",
              "--c2",
              "--c3",
              "--c4",
              "--c5",
              "--c6",
              "--c7",
              "--c8",
              "--c9",
              "--c10",
              "--c11",
              "--c12",
            ]; // Define multiple colors
            let start = 0; // Start position for gradient

            let gradient = Object.values(groupedData)
              .map((item, index) => {
                let end = Number(start) + Number(item.allocation); // Calculates the end position
                let color = `var(${colors[index]})`; // loop through colors
                let segment = `${color} ${start}% ${end}%,`; // Define segment
                start = end; // Update start for next segment
                return segment;
              })
              .join("")
              .slice(0, -1);

            let textvalue = Object.values(groupedData)
              .map(
                (item) => `
  
                  <span>${item.asset_category}: ${item.allocation}%</span>
                  
  
                `
              )
              .join("");

            pie.style.setProperty("--chart", gradient);
            figcaption.innerHTML = textvalue;

            //label after figure
            let figureElement = newBox.querySelector(".pie-container figure");

            // Remove any existing label before inserting a new one
            let existingLabel =
              figureElement.parentNode.querySelector(".chart-label");
            if (existingLabel) {
              existingLabel.remove();
            }

            // Create label element
            let label = document.createElement("label");
            label.className = "chart-label";
            label.textContent = "Allocation(%)";

            // Insert after figure
            figureElement.parentNode.insertBefore(
              label,
              figureElement.nextSibling
            );
          } else {
            let fetchResponse = await fetch("visualization/piechart.php");
            let data = await fetchResponse.text();
            newBox.querySelector(".output").innerHTML = data;

            let totalValue;
            let groupedData = {};
            jsondata.forEach((item) => {
              if (!groupedData[item.asset_category]) {
                groupedData[item.asset_category] = {
                  asset_category: item.asset_category,
                  total_value: 0, // Start from 0
                  allocation: 0, // Placeholder for allocation %
                };
              }
              totalValue = jsondata.reduce(
                (sum, item) => sum + item.category_asset_value,
                0
              );

              // Sum up values
              groupedData[item.asset_category].total_value +=
                item.category_asset_value;
            });

            // Step 3: Calculate allocation percentage
            Object.keys(groupedData).forEach((key) => {
              groupedData[key].allocation = (
                (groupedData[key].total_value / totalValue) *
                100
              ).toFixed(0);
            });

            let pie = newBox.querySelector(".pie-container .pie-chart");
            let figcaption = newBox.querySelector(
              ".pie-container .detail-info .detail-info-content"
            );

            //
            let colors = [
              "--c1",
              "--c2",
              "--c3",
              "--c4",
              "--c5",
              "--c6",
              "--c7",
              "--c8",
              "--c9",
              "--c10",
              "--c11",
              "--c12",
            ]; // Define multiple colors
            let start = 0; // Start position for gradient

            let gradient = Object.values(groupedData)
              .map((item, index) => {
                let end = Number(start) + Number(item.allocation); // Calculate end position
                let color = `var(${colors[index]})`; // Cycle through colors
                let segment = `${color} ${start}% ${end}%,`; // Define segment
                start = end; // Update start for next segment
                return segment;
              })
              .join("")
              .slice(0, -1);

            let textvalue = Object.values(groupedData)
              .map(
                (item) => `
  
                  <span>${
                    item.asset_category
                  }: ₹${item.total_value.toLocaleString("en-IN")}</span>
  
                `
              )
              .join("");

            pie.style.setProperty("--chart", gradient);
            figcaption.innerHTML = textvalue;

            //label after figure
            let figureElement = newBox.querySelector(".pie-container figure");

            // Remove any existing label before inserting a new one
            let existingLabel =
              figureElement.parentNode.querySelector(".chart-label");
            if (existingLabel) {
              existingLabel.remove();
            }

            // Create label element
            let label = document.createElement("label");
            label.className = "chart-label";
            label.textContent = "Asset Values(₹)";

            // Insert after figure
            figureElement.parentNode.insertBefore(
              label,
              figureElement.nextSibling
            );
          }
        } else if (category === "bar") {
          // Function to get selected categories dynamically
          function getSelectedCategories() {
            return [
              ...newBox.querySelectorAll(
                '.checkbox-menu input[type="checkbox"]:checked'
              ),
            ].map((cb) => cb.value);
          }

          if (category === "bar" && bartype === "allocation") {
            let fetchResponse = await fetch("visualization/barchart.php");
            let data = await fetchResponse.text();
            newBox.querySelector(".output").innerHTML = data;
            let totalValue;
            let groupedData = {};
            jsondata.forEach((item) => {
              if (!groupedData[item.asset_category]) {
                groupedData[item.asset_category] = {
                  asset_category: item.asset_category,
                  total_value: 0, // Start from 0
                  allocation: 0, // Placeholder for allocation %
                };
              }

              totalValue = jsondata.reduce(
                (sum, item) => sum + item.category_asset_value,
                0
              );

              // Sum up values
              groupedData[item.asset_category].total_value +=
                item.category_asset_value;
            });

            // Step 3: Calculate allocation percentage
            Object.keys(groupedData).forEach((key) => {
              groupedData[key].allocation = (
                (groupedData[key].total_value / totalValue) *
                100
              ).toFixed(0);
            });
            // **Filter groupedData to only include selected categories**
            let selectedCategories = getSelectedCategories();
            let filteredData = Object.values(groupedData).filter((item) =>
              selectedCategories.includes(item.asset_category)
            );

            let barcontainer = newBox.querySelector(".bar-container .barchart");
            let textvalue = filteredData
              .map(
                (item) => `
                  <div class="bar-wrapper">
                    <div class = "bar" style ="--value:${item.allocation}%;"  data-value="${item.allocation}"></div>
                    <span class = "bar-label ">${item.asset_category}</span>
                  </div>  
                  <div class="y-axis">
                      <div class="y-label">100</div>
                      <div class="y-label">80</div>
                      <div class="y-label">60</div>
                      <div class="y-label">40</div>
                      <div class="y-label">20</div>
                      <div class="y-label" >0</div>
                  </div>
                  <div class="bar-grid"></div>
                `
              )
              .join("");

            barcontainer.innerHTML = textvalue;
            // Label after figure
            let figureElement = newBox.querySelector(
              ".bar-container .barchart"
            );

            // Remove any existing label before inserting a new one
            if (figureElement.parentNode) {
              let existingLabel =
                figureElement.parentNode.querySelector(".barlabel");
              if (existingLabel) existingLabel.remove();
            }

            let label = document.createElement("label");
            label.className = "barlabel";
            label.textContent = "Allocation(%)";

            // Append the label inside the barchart
            figureElement.appendChild(label);
          } else {
            let fetchResponse = await fetch("visualization/barchart.php");
            let data = await fetchResponse.text();
            newBox.querySelector(".output").innerHTML = data;

            let totalValue;
            let groupedData = {};
            jsondata.forEach((item) => {
              if (!groupedData[item.asset_category]) {
                groupedData[item.asset_category] = {
                  asset_category: item.asset_category,
                  total_value: 0,
                  allocation: 0,
                };
              }

              totalValue = jsondata.reduce(
                (sum, item) => sum + item.category_asset_value,
                0
              );

              groupedData[item.asset_category].total_value +=
                item.category_asset_value;
            });

            Object.keys(groupedData).forEach((key) => {
              groupedData[key].allocation = (
                (groupedData[key].total_value / totalValue) *
                100
              ).toFixed(0);
            });

            let selectedCategories = getSelectedCategories();
            let filteredData = Object.values(groupedData).filter((item) =>
              selectedCategories.includes(item.asset_category)
            );
            console.log(filteredData);

            let barcontainer = newBox.querySelector(".barchart");
            // Calculate max value and step value before .map()
            let textvalue = filteredData
              .map(
                (item) => `
                  <div class="bar-wrapper">
                    <div class = "bar" style ="--value:${
                      item.allocation
                    }%;"  data-value="${item.total_value.toLocaleString(
                  "en-IN"
                )}"></div>
                    <span class = "bar-label ">${item.asset_category}</span>
                  </div>  
                  
                  <div class="bar-grid"></div>
                `
              )
              .join("");

            // Inject everything directly
            barcontainer.innerHTML = textvalue;

            let figureElement = newBox.querySelector(".barchart");
            if (figureElement.parentNode) {
              let existingLabel =
                figureElement.parentNode.querySelector(".barlabel");
              if (existingLabel) existingLabel.remove();
            }

            let label = document.createElement("label");
            label.className = "barlabel";
            label.textContent = "  Value (in Crores)";

            figureElement.appendChild(label);
          }
        } else if (category === "netWorth") {
          let fetchResponse = await fetch("visualization/networth.php");
          let data = await fetchResponse.text();

          newBox.querySelector(".output").innerHTML = data;

          let totalAssets = jsondata.reduce(
            (sum, item) => sum + item.category_asset_value,
            0
          );

          // Filter only "Loans" category and sum up its values
          let totalLiabilities = jsondata
            .filter((item) => item.asset_category === "Loans")
            .reduce((sum, item) => sum + item.category_asset_value, 0);
          let currentNetWorth = totalAssets - totalLiabilities;

          let result = 0;
          if (category === "netWorth" && nettype === "Current Net Worth") {
            result = currentNetWorth;
          } else if (category === "netWorth" && nettype === "Total Assets") {
            result = totalAssets;
          } else if (
            category === "netWorth" &&
            nettype === "Total Liabilities"
          ) {
            result = totalLiabilities;
          }
          let networthContainer = newBox.querySelector(
            ".networth-container .net-content"
          );
          // Display result in output
          let netValue = `
                <h1 id="value" style="font-size:50px">
                    <span style="font-size:16px;color:gray; margin-bottom:10px;">${nettype}</span>
                    ₹${result.toLocaleString("en-IN")}
                </h1>
            `;
          networthContainer.innerHTML = netValue;
        }

        fetch("widgetprocess.php", {
          method: "POST",
          body: formData,
        });
        newBox.querySelector(".filterBox").style.display = "none";
      });

    // Toggle dropdown visibility when the button (checkbox dropdown of bar)is clicked.
    newBox
      .querySelector(".checkbox-btn")
      .addEventListener("click", function () {
        const menu = newBox.querySelector(".checkbox-menu");
        // Toggle display between 'none' and 'block'
        menu.style.display =
          menu.style.display === "none" || menu.style.display === ""
            ? "block"
            : "none";
      });

    // Get all checkboxes within the dropdown.
    const checkboxes = newBox.querySelectorAll(
      '.checkbox-menu input[type="checkbox"]'
    );
    // Add an event listener for changes on each checkbox.
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        // Count how many checkboxes are checked.
        const checkedCount = newBox.querySelectorAll(
          '.checkbox-menu input[type="checkbox"]:checked'
        ).length;

        // If 5 or more are checked, disable the ones that are not checked.
        if (checkedCount >= 5) {
          checkboxes.forEach(function (cb) {
            if (!cb.checked) {
              cb.disabled = true;
            }
          });
        } else {
          // Otherwise, re-enable all checkboxes.
          checkboxes.forEach(function (cb) {
            cb.disabled = false;
          });
        }
      });
    });

    // Append the new box to the container
    boxContainer.appendChild(newBox);

    //load save selection data
    if (data) {
      // let formData = new FormData(this);
      let category = data[i].category;
      let assettype = data[i].assettype;
      let pietype = data[i].pietype;
      let bartype = data[i].bartype;
      let nettype = data[i].nettype;

      // Fetch JSON data
      let response = await fetch("filter_fetch.php");
      let jsondata = await response.json();

      if (category === "table") {
        let fetchResponse = await fetch("visualization/table.php");
        let data = await fetchResponse.text();

        newBox.querySelector(".output").innerHTML = data;

        let tablecontainer = newBox.querySelector(
          ".table-wrapper .table-container table"
        );

        if (category === "table" && assettype === "All") {
          let totalValue = jsondata.reduce(
            (sum, item) => sum + item.category_asset_value,
            0
          );

          // Define liquidity levels for each category
          const liquidityLevels = {
            Cash: "High",
            Investments: "High",
            "Real Estate": "Low",
            Loans: "Low",
            "Taxable Fixed Income": "Medium",
            "Non Taxable Fixed Income": "Medium",
            "Alternative Investments": "Low",
            "Business Interest": "Low",
            "Intellectual Property": "Low",
            "Insurance Policies": "Low",
            "Miscellaneous Assets": "Varies",
            Other: "Varies",
          };

          let groupedData = {};
          jsondata.forEach((item) => {
            if (!groupedData[item.asset_category]) {
              groupedData[item.asset_category] = {
                asset_category: item.asset_category,
                total_value: 0, // Start from 0
                allocation: 0, // Placeholder for allocation %
                liquidity: liquidityLevels[item.asset_category] || "Unknown", // Assign liquidity level
              };
            }
            // Sum up values
            groupedData[item.asset_category].total_value +=
              item.category_asset_value;
          });
          // Step 3: Calculate allocation percentage
          Object.keys(groupedData).forEach((key) => {
            groupedData[key].allocation = (
              (groupedData[key].total_value / totalValue) *
              100
            ).toFixed(2);
          });
          let thead = `
              <thead>
                <tr>
                  <th></th>
                  <th>Value</th>
                  <th>Allocation(%)</th>
                  <th>Liquidity</th>
                </tr>
              </thead>`;

          // Step 5: Generate unique category rows
          let tbody = Object.values(groupedData)
            .map(
              (item) => `
                <tr>
                  <td>${item.asset_category}</td>
                  <td>${item.total_value.toLocaleString("en-IN")}</td>
                  <td>${item.allocation}%</td>
                  <td>${item.liquidity}</td>
                </tr>
              `
            )
            .join("");
          tablecontainer.innerHTML = thead + tbody;
        } else {
          let thead = `
              <thead>
                <tr>
                  <th></th>
                  <th>Value</th>
                  <th>Growth/Decline(%)</th>
                  <th>Last update</th>
                </tr>
              </thead>`;

          let tbody = jsondata
            .filter((item) => item.asset_category === assettype)
            .map((item) => {
              // Convert last_date string to a Date object
              let date = new Date(item.last_date);
              let formattedDate = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });
              let heading = newBox.querySelector(".table-wrapper .heading h2");
              heading.textContent = ` Detailed Breakdown of Your ${assettype} as on date ${formattedDate} `;
              return `
                <tr>
                  <td>${item.asset_name}</td>
                  <td>${(Number(item.asset_value) || 0).toLocaleString(
                    "en-IN"
                  )}</td>

                  <td>${
                    item.last_asset_value && item.last_asset_value !== 0
                      ? Math.min(
                          (
                            ((item.asset_value - item.last_asset_value) /
                              item.last_asset_value) *
                            100
                          ).toFixed(2),
                          1000
                        ) + "%"
                      : "N/A"
                  }</td>
                  
                  <td>${formattedDate}</td>
                </tr>
              `;
            })
            .join("");
          tablecontainer.innerHTML = thead + tbody;
        }
      } else if (category === "pie") {
        if (category === "pie" && pietype === "allocation") {
          let fetchResponse = await fetch("visualization/piechart.php");
          let data = await fetchResponse.text();
          newBox.querySelector(".output").innerHTML = data;

          let totalValue;
          let groupedData = {};
          jsondata.forEach((item) => {
            if (!groupedData[item.asset_category]) {
              groupedData[item.asset_category] = {
                asset_category: item.asset_category,
                total_value: 0, // Start from 0
                allocation: 0, // Placeholder for allocation %
              };
            }

            totalValue = jsondata.reduce(
              (sum, item) => sum + item.category_asset_value,
              0
            );

            // Sum up values
            groupedData[item.asset_category].total_value +=
              item.category_asset_value;
          });

          // Step 3: Calculate allocation percentage
          Object.keys(groupedData).forEach((key) => {
            groupedData[key].allocation = (
              (groupedData[key].total_value / totalValue) *
              100
            ).toFixed(0);
          });

          let pie = newBox.querySelector(".pie-container .pie-chart");
          let figcaption = newBox.querySelector(
            ".pie-container .detail-info .detail-info-content"
          );

          //
          let colors = [
            "--c1",
            "--c2",
            "--c3",
            "--c4",
            "--c5",
            "--c6",
            "--c7",
            "--c8",
            "--c9",
            "--c10",
            "--c11",
            "--c12",
          ]; // Define multiple colors
          let start = 0; // Start position for gradient

          let gradient = Object.values(groupedData)
            .map((item, index) => {
              let end = Number(start) + Number(item.allocation); // Calculates the end position
              let color = `var(${colors[index]})`; // loop through colors
              let segment = `${color} ${start}% ${end}%,`; // Define segment
              start = end; // Update start for next segment
              return segment;
            })
            .join("")
            .slice(0, -1);

          let textvalue = Object.values(groupedData)
            .map(
              (item) => `

                <span>${item.asset_category}: ${item.allocation}%</span>
                

              `
            )
            .join("");

          pie.style.setProperty("--chart", gradient);
          figcaption.innerHTML = textvalue;

          //label after figure
          let figureElement = newBox.querySelector(".pie-container figure");

          // Remove any existing label before inserting a new one
          let existingLabel =
            figureElement.parentNode.querySelector(".chart-label");
          if (existingLabel) {
            existingLabel.remove();
          }

          // Create label element
          let label = document.createElement("label");
          label.className = "chart-label";
          label.textContent = "Allocation(%)";

          // Insert after figure
          figureElement.parentNode.insertBefore(
            label,
            figureElement.nextSibling
          );
        } else {
          let fetchResponse = await fetch("visualization/piechart.php");
          let data = await fetchResponse.text();
          newBox.querySelector(".output").innerHTML = data;

          let totalValue;
          let groupedData = {};
          jsondata.forEach((item) => {
            if (!groupedData[item.asset_category]) {
              groupedData[item.asset_category] = {
                asset_category: item.asset_category,
                total_value: 0, // Start from 0
                allocation: 0, // Placeholder for allocation %
              };
            }
            totalValue = jsondata.reduce(
              (sum, item) => sum + item.category_asset_value,
              0
            );

            // Sum up values
            groupedData[item.asset_category].total_value +=
              item.category_asset_value;
          });

          // Step 3: Calculate allocation percentage
          Object.keys(groupedData).forEach((key) => {
            groupedData[key].allocation = (
              (groupedData[key].total_value / totalValue) *
              100
            ).toFixed(0);
          });

          let pie = newBox.querySelector(".pie-container .pie-chart");
          let figcaption = newBox.querySelector(
            ".pie-container .detail-info .detail-info-content"
          );

          //
          let colors = [
            "--c1",
            "--c2",
            "--c3",
            "--c4",
            "--c5",
            "--c6",
            "--c7",
            "--c8",
            "--c9",
            "--c10",
            "--c11",
            "--c12",
          ]; // Define multiple colors
          let start = 0; // Start position for gradient

          let gradient = Object.values(groupedData)
            .map((item, index) => {
              let end = Number(start) + Number(item.allocation); // Calculate end position
              let color = `var(${colors[index]})`; // Cycle through colors
              let segment = `${color} ${start}% ${end}%,`; // Define segment
              start = end; // Update start for next segment
              return segment;
            })
            .join("")
            .slice(0, -1);

          let textvalue = Object.values(groupedData)
            .map(
              (item) => `

                <span>${
                  item.asset_category
                }: ₹${item.total_value.toLocaleString("en-IN")}</span>

              `
            )
            .join("");

          pie.style.setProperty("--chart", gradient);
          figcaption.innerHTML = textvalue;

          //label after figure
          let figureElement = newBox.querySelector(".pie-container figure");

          // Remove any existing label before inserting a new one
          let existingLabel =
            figureElement.parentNode.querySelector(".chart-label");
          if (existingLabel) {
            existingLabel.remove();
          }

          // Create label element
          let label = document.createElement("label");
          label.className = "chart-label";
          label.textContent = "Asset Values(₹)";

          // Insert after figure
          figureElement.parentNode.insertBefore(
            label,
            figureElement.nextSibling
          );
        }
      } else if (category === "bar") {
        // Function to get selected categories dynamically
        function getSelectedCategories() {
          return data[i].barcheckbox.split(",");
        }

        if (category === "bar" && bartype === "allocation") {
          let fetchResponse = await fetch("visualization/barchart.php");
          let data = await fetchResponse.text();
          newBox.querySelector(".output").innerHTML = data;
          let totalValue;
          let groupedData = {};
          jsondata.forEach((item) => {
            if (!groupedData[item.asset_category]) {
              groupedData[item.asset_category] = {
                asset_category: item.asset_category,
                total_value: 0, // Start from 0
                allocation: 0, // Placeholder for allocation %
              };
            }

            totalValue = jsondata.reduce(
              (sum, item) => sum + item.category_asset_value,
              0
            );

            // Sum up values
            groupedData[item.asset_category].total_value +=
              item.category_asset_value;
          });

          // Step 3: Calculate allocation percentage
          Object.keys(groupedData).forEach((key) => {
            groupedData[key].allocation = (
              (groupedData[key].total_value / totalValue) *
              100
            ).toFixed(0);
          });
          // **Filter groupedData to only include selected categories**
          let selectedCategories = getSelectedCategories();
          let filteredData = Object.values(groupedData).filter((item) =>
            selectedCategories.includes(item.asset_category)
          );

          let barcontainer = newBox.querySelector(".bar-container .barchart");
          let textvalue = filteredData
            .map(
              (item) => `
                <div class="bar-wrapper">
                  <div class = "bar" style ="--value:${item.allocation}%;"  data-value="${item.allocation}"></div>
                  <span class = "bar-label ">${item.asset_category}</span>
                </div>  
                <div class="y-axis">
                    <div class="y-label">100</div>
                    <div class="y-label">80</div>
                    <div class="y-label">60</div>
                    <div class="y-label">40</div>
                    <div class="y-label">20</div>
                    <div class="y-label" >0</div>
                </div>
                <div class="bar-grid"></div>
              `
            )
            .join("");

          barcontainer.innerHTML = textvalue;
          // Label after figure
          let figureElement = newBox.querySelector(".bar-container .barchart");

          // Remove any existing label before inserting a new one
          if (figureElement.parentNode) {
            let existingLabel =
              figureElement.parentNode.querySelector(".barlabel");
            if (existingLabel) existingLabel.remove();
          }

          let label = document.createElement("label");
          label.className = "barlabel";
          label.textContent = "Allocation(%)";

          // Append the label inside the barchart
          figureElement.appendChild(label);
        } else {
          let fetchResponse = await fetch("visualization/barchart.php");
          let data = await fetchResponse.text();
          newBox.querySelector(".output").innerHTML = data;

          let totalValue;
          let groupedData = {};
          jsondata.forEach((item) => {
            if (!groupedData[item.asset_category]) {
              groupedData[item.asset_category] = {
                asset_category: item.asset_category,
                total_value: 0,
                allocation: 0,
              };
            }

            totalValue = jsondata.reduce(
              (sum, item) => sum + item.category_asset_value,
              0
            );

            groupedData[item.asset_category].total_value +=
              item.category_asset_value;
          });

          Object.keys(groupedData).forEach((key) => {
            groupedData[key].allocation = (
              (groupedData[key].total_value / totalValue) *
              100
            ).toFixed(0);
          });

          let selectedCategories = getSelectedCategories();
          let filteredData = Object.values(groupedData).filter((item) =>
            selectedCategories.includes(item.asset_category)
          );
          console.log(filteredData);

          let barcontainer = newBox.querySelector(".barchart");
          // Calculate max value and step value before .map()
          let textvalue = filteredData
            .map(
              (item) => `
                <div class="bar-wrapper">
                  <div class = "bar" style ="--value:${
                    item.allocation
                  }%;"  data-value="${item.total_value.toLocaleString(
                "en-IN"
              )}"></div>
                  <span class = "bar-label ">${item.asset_category}</span>
                </div>  
                
                <div class="bar-grid"></div>
              `
            )
            .join("");

          // Inject everything directly
          barcontainer.innerHTML = textvalue;

          let figureElement = newBox.querySelector(".barchart");
          if (figureElement.parentNode) {
            let existingLabel =
              figureElement.parentNode.querySelector(".barlabel");
            if (existingLabel) existingLabel.remove();
          }

          let label = document.createElement("label");
          label.className = "barlabel";
          label.textContent = "  Value (in Crores)";

          figureElement.appendChild(label);
        }
      } else if (category === "netWorth") {
        let fetchResponse = await fetch("visualization/networth.php");
        let data = await fetchResponse.text();

        newBox.querySelector(".output").innerHTML = data;

        let totalAssets = jsondata.reduce(
          (sum, item) => sum + item.category_asset_value,
          0
        );

        // Filter only "Loans" category and sum up its values
        let totalLiabilities = jsondata
          .filter((item) => item.asset_category === "Loans")
          .reduce((sum, item) => sum + item.category_asset_value, 0);
        let currentNetWorth = totalAssets - totalLiabilities;

        let result = 0;
        if (category === "netWorth" && nettype === "Current Net Worth") {
          result = currentNetWorth;
        } else if (category === "netWorth" && nettype === "Total Assets") {
          result = totalAssets;
        } else if (category === "netWorth" && nettype === "Total Liabilities") {
          result = totalLiabilities;
        }
        let networthContainer = newBox.querySelector(
          ".networth-container .net-content"
        );
        // Display result in output
        let netValue = `
              <h1 id="value" style="font-size:50px">
                  <span style="font-size:16px;color:gray; margin-bottom:10px;">${nettype}</span>
                  ₹${result.toLocaleString("en-IN")}
              </h1>
          `;
        networthContainer.innerHTML = netValue;
      }
    }

    i++;
  }
}
savedataload();

// add widget section
addButton.addEventListener("click", function () {
  const currentBoxes = boxContainer.getElementsByClassName("box").length;

  if (currentBoxes < MAX_BOXES) {
    const newBox = document.createElement("div");
    newBox.classList.add("box");

    // Create the close button
    const closeButton = document.createElement("span");
    closeButton.classList.add("close-btn");
    closeButton.innerHTML = "&times;";
    newBox.appendChild(closeButton);

    // Create filter button with dropdown
    const filterDropdown = document.createElement("div");
    filterDropdown.classList.add("filter-dropdown");
    filterDropdown.innerHTML = `
     <button class="filter-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel icon" viewBox="0 0 16 16">
      <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
      </svg>
     </button>
    <div class="filterBox">
        <h4>Filter Options</h4>
        <!-- Chart Type Dropdown -->
        <form class="filterForm">
          <div class="dropdown">
              <select  name="category" class="chartType">
                  <option value="" disabled selected>Select Chart Type</option>
                  <option value="table">Table</option>
                  <option value="pie">Pie Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="netWorth">Net Worth</option>
              </select>       
          </div>
          <div class="dropdown table">
              <select  name="assettype" class="assetType">
                  <option value="" disabled selected>Select Asset Type</option>
                  <option value="All">All</option>
                  <option value="Cash">Cash</option>
                  <option value="Investments">Investments</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Loans">Loans</option>
                  <option value="Taxable Fixed Income">Taxable Fixed Income</option>
                  <option value="Non Taxable Fixed Income">Non Taxable Fixed Income</option>
                  <option value="Alternative Investments">Alternative Investments</option>
                  <option value="Business Interest">Business Interest</option>
                  <option value="Intellectual Property">Intellectual Property</option>
                  <option value="Insurance Policies">Insurance Policies</option>
                  <option value="Miscellaneous Assets">Miscellaneous Assets</option>
                  <option value = "Other">Other</option>
              </select>       
          </div>
          <div class="dropdown pie">
              <select  name="pietype" class="columnType">
                  <option value="" disabled selected>Select Column Type</option>
                  <option value="assetvalue">Asset Value</option>
                  <option value="allocation">Allocation(%)</option>
              </select>       
          </div>
          <div class="dropdown Bar">
              <select  name="bartype" class="columnType">
                  <option value="" disabled selected>Select Column Type</option>
                  <option value="assetvalue">Asset Value</option>
                  <option value="allocation">Allocation(%)</option>
              </select>       
          </div>
          <div class="dropdown Bar checkbox-dropdown ">
              <!-- Button to toggle the dropdown display -->
              <button type="button" class="checkbox-btn">Select Assets</button>
              <!-- This container is the dropdown menu that holds the checkboxes -->
              <div class ="checkbox-menu" style="display: none;">
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Cash"> Cash
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Investments"> Investments
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Real Estate"> Real Estate
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Taxable Fixed Income"> Taxable Fixed Income
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Non Taxable Fixed Income"> Non Taxable Fixed Income
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Alternative Investments"> Alternative Investments
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Business Interest"> Business Interest 
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Intellectual Property"> Intellectual Property
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Insurance Policies"> Insurance Policies
                </label>
                <label>
                  <input type="checkbox" name="multiOptions[]" value="Other"> Other
                </label>
              </div>
          </div>
          <div class="dropdown net">
              <select  name="nettype" class="columnType">
                  <option value="" disabled selected>Select Any One </option>
                  <option value="Current Net Worth">Current Net Worth</option>
                  <option value="Total Assets">Total Assets</option>
                  <option value="Total Liabilities">Total Liabilities</option>
              </select> 
          </div>    
          <input type="submit" value="RUN" class="filter-submit">
        </form>
    </div>
   `;
    newBox.appendChild(filterDropdown);
    const outputele = document.createElement("div");
    outputele.classList.add("output");
    newBox.appendChild(outputele);

    // Getting  the chart type select element in the current widget.
    const chartTypeSelect = newBox.querySelector(".chartType");
    // Getting the corresponding additional dropdown containers.
    const tableDropdown = newBox.querySelector(".dropdown.table");
    const pieDropdown = newBox.querySelector(".dropdown.pie");
    const barDropdown = newBox.querySelector(".dropdown.Bar");
    const checkDropdown = newBox.querySelector(".checkbox-dropdown");
    const netDropdown = newBox.querySelector(".dropdown.net");
    const filterSubmitButton = newBox.querySelector(".filter-submit");

    // Add the change event listener to the chart type dropdown
    chartTypeSelect.addEventListener("change", function () {
      // Hide all extra dropdowns first
      tableDropdown.style.display = "none";
      pieDropdown.style.display = "none";
      barDropdown.style.display = "none";
      checkDropdown.style.display = "none";
      netDropdown.style.display = "none";

      // Show the dropdown that corresponds to the selected chart type
      if (chartTypeSelect.value === "table") {
        tableDropdown.style.display = "block";
        filterSubmitButton.style.display = "block";
      } else if (chartTypeSelect.value === "pie") {
        pieDropdown.style.display = "block";
        filterSubmitButton.style.display = "block";
      } else if (chartTypeSelect.value === "bar") {
        barDropdown.style.display = "block";
        checkDropdown.style.display = "block";
        filterSubmitButton.style.display = "block";
      } else if (chartTypeSelect.value === "netWorth") {
        netDropdown.style.display = "block";
        filterSubmitButton.style.display = "block";
      }
    });

    newBox
      .querySelector(".filterForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevents page reload

        // Fetch JSON data
        let response = await fetch("filter_fetch.php");
        let jsondata = await response.json();

        let formData = new FormData(this);
        let category = formData.get("category");
        let assettype = formData.get("assettype");
        let pietype = formData.get("pietype");
        let bartype = formData.get("bartype");
        let nettype = formData.get("nettype");

        if (category === "table") {
          let fetchResponse = await fetch("visualization/table.php");
          let data = await fetchResponse.text();

          newBox.querySelector(".output").innerHTML = data;

          let tablecontainer = newBox.querySelector(
            ".table-wrapper .table-container table"
          );

          if (category === "table" && assettype === "All") {
            let totalValue = jsondata.reduce(
              (sum, item) => sum + item.category_asset_value,
              0
            );

            // Define liquidity levels for each category
            const liquidityLevels = {
              Cash: "High",
              Investments: "High",
              "Real Estate": "Low",
              Loans: "Low",
              "Taxable Fixed Income": "Medium",
              "Non Taxable Fixed Income": "Medium",
              "Alternative Investments": "Low",
              "Business Interest": "Low",
              "Intellectual Property": "Low",
              "Insurance Policies": "Low",
              "Miscellaneous Assets": "Varies",
              Other: "Varies",
            };

            let groupedData = {};
            jsondata.forEach((item) => {
              if (!groupedData[item.asset_category]) {
                groupedData[item.asset_category] = {
                  asset_category: item.asset_category,
                  total_value: 0, // Start from 0
                  allocation: 0, // Placeholder for allocation %
                  liquidity: liquidityLevels[item.asset_category] || "Unknown", // Assign liquidity level
                };
              }
              // Sum up values
              groupedData[item.asset_category].total_value +=
                item.category_asset_value;
            });
            // Step 3: Calculate allocation percentage
            Object.keys(groupedData).forEach((key) => {
              groupedData[key].allocation = (
                (groupedData[key].total_value / totalValue) *
                100
              ).toFixed(2);
            });
            let thead = `
              <thead>
                <tr>
                  <th></th>
                  <th>Value</th>
                  <th>Allocation(%)</th>
                  <th>Liquidity</th>
                </tr>
              </thead>`;

            // Step 5: Generate unique category rows
            let tbody = Object.values(groupedData)
              .map(
                (item) => `
                <tr>
                  <td>${item.asset_category}</td>
                  <td>${item.total_value.toLocaleString("en-IN")}</td>
                  <td>${item.allocation}%</td>
                  <td>${item.liquidity}</td>
                </tr>
              `
              )
              .join("");
            tablecontainer.innerHTML = thead + tbody;
          } else {
            let thead = `
              <thead>
                <tr>
                  <th></th>
                  <th>Value</th>
                  <th>Growth/Decline(%)</th>
                  <th>Last update</th>
                </tr>
              </thead>`;

            let tbody = jsondata
              .filter((item) => item.asset_category === assettype)
              .map((item) => {
                // Convert last_date string to a Date object
                let date = new Date(item.last_date);
                let formattedDate = date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                let heading = newBox.querySelector(
                  ".table-wrapper .heading h2"
                );
                heading.textContent = ` Detailed Breakdown of Your ${assettype} as on date ${formattedDate} `;
                return `
                <tr>
                  <td>${item.asset_name}</td>
                  <td>${(Number(item.asset_value) || 0).toLocaleString(
                    "en-IN"
                  )}</td>

                  <td>${
                    item.last_asset_value && item.last_asset_value !== 0
                      ? Math.min(
                          (
                            ((item.asset_value - item.last_asset_value) /
                              item.last_asset_value) *
                            100
                          ).toFixed(2),
                          1000
                        ) + "%"
                      : "N/A"
                  }</td>
                  
                  <td>${formattedDate}</td>
                </tr>
              `;
              })
              .join("");
            tablecontainer.innerHTML = thead + tbody;
          }
        } else if (category === "pie") {
          if (category === "pie" && pietype === "allocation") {
            let fetchResponse = await fetch("visualization/piechart.php");
            let data = await fetchResponse.text();
            newBox.querySelector(".output").innerHTML = data;

            let totalValue;
            let groupedData = {};
            jsondata.forEach((item) => {
              if (!groupedData[item.asset_category]) {
                groupedData[item.asset_category] = {
                  asset_category: item.asset_category,
                  total_value: 0, // Start from 0
                  allocation: 0, // Placeholder for allocation %
                };
              }

              totalValue = jsondata.reduce(
                (sum, item) => sum + item.category_asset_value,
                0
              );

              // Sum up values
              groupedData[item.asset_category].total_value +=
                item.category_asset_value;
            });

            // Step 3: Calculate allocation percentage
            Object.keys(groupedData).forEach((key) => {
              groupedData[key].allocation = (
                (groupedData[key].total_value / totalValue) *
                100
              ).toFixed(0);
            });

            let pie = newBox.querySelector(".pie-container .pie-chart");
            let figcaption = newBox.querySelector(
              ".pie-container .detail-info .detail-info-content"
            );

            //
            let colors = [
              "--c1",
              "--c2",
              "--c3",
              "--c4",
              "--c5",
              "--c6",
              "--c7",
              "--c8",
              "--c9",
              "--c10",
              "--c11",
              "--c12",
            ]; // Define multiple colors
            let start = 0; // Start position for gradient

            let gradient = Object.values(groupedData)
              .map((item, index) => {
                let end = Number(start) + Number(item.allocation); // Calculates the end position
                let color = `var(${colors[index]})`; // loop through colors
                let segment = `${color} ${start}% ${end}%,`; // Define segment
                start = end; // Update start for next segment
                return segment;
              })
              .join("")
              .slice(0, -1);

            let textvalue = Object.values(groupedData)
              .map(
                (item) => `

                <span>${item.asset_category}: ${item.allocation}%</span>
                

              `
              )
              .join("");

            pie.style.setProperty("--chart", gradient);
            figcaption.innerHTML = textvalue;

            //label after figure
            let figureElement = newBox.querySelector(".pie-container figure");

            // Remove any existing label before inserting a new one
            let existingLabel =
              figureElement.parentNode.querySelector(".chart-label");
            if (existingLabel) {
              existingLabel.remove();
            }

            // Create label element
            let label = document.createElement("label");
            label.className = "chart-label";
            label.textContent = "Allocation(%)";

            // Insert after figure
            figureElement.parentNode.insertBefore(
              label,
              figureElement.nextSibling
            );
          } else {
            let fetchResponse = await fetch("visualization/piechart.php");
            let data = await fetchResponse.text();
            newBox.querySelector(".output").innerHTML = data;

            let totalValue;
            let groupedData = {};
            jsondata.forEach((item) => {
              if (!groupedData[item.asset_category]) {
                groupedData[item.asset_category] = {
                  asset_category: item.asset_category,
                  total_value: 0, // Start from 0
                  allocation: 0, // Placeholder for allocation %
                };
              }
              totalValue = jsondata.reduce(
                (sum, item) => sum + item.category_asset_value,
                0
              );

              // Sum up values
              groupedData[item.asset_category].total_value +=
                item.category_asset_value;
            });

            // Step 3: Calculate allocation percentage
            Object.keys(groupedData).forEach((key) => {
              groupedData[key].allocation = (
                (groupedData[key].total_value / totalValue) *
                100
              ).toFixed(0);
            });

            let pie = newBox.querySelector(".pie-container .pie-chart");
            let figcaption = newBox.querySelector(
              ".pie-container .detail-info .detail-info-content"
            );

            //
            let colors = [
              "--c1",
              "--c2",
              "--c3",
              "--c4",
              "--c5",
              "--c6",
              "--c7",
              "--c8",
              "--c9",
              "--c10",
              "--c11",
              "--c12",
            ]; // Define multiple colors
            let start = 0; // Start position for gradient

            let gradient = Object.values(groupedData)
              .map((item, index) => {
                let end = Number(start) + Number(item.allocation); // Calculate end position
                let color = `var(${colors[index]})`; // Cycle through colors
                let segment = `${color} ${start}% ${end}%,`; // Define segment
                start = end; // Update start for next segment
                return segment;
              })
              .join("")
              .slice(0, -1);

            let textvalue = Object.values(groupedData)
              .map(
                (item) => `

                <span>${
                  item.asset_category
                }: ₹${item.total_value.toLocaleString("en-IN")}</span>

              `
              )
              .join("");

            pie.style.setProperty("--chart", gradient);
            figcaption.innerHTML = textvalue;

            //label after figure
            let figureElement = newBox.querySelector(".pie-container figure");

            // Remove any existing label before inserting a new one
            let existingLabel =
              figureElement.parentNode.querySelector(".chart-label");
            if (existingLabel) {
              existingLabel.remove();
            }

            // Create label element
            let label = document.createElement("label");
            label.className = "chart-label";
            label.textContent = "Asset Values(₹)";

            // Insert after figure
            figureElement.parentNode.insertBefore(
              label,
              figureElement.nextSibling
            );
          }
        } else if (category === "bar") {
          // Function to get selected categories dynamically
          function getSelectedCategories() {
            return [
              ...newBox.querySelectorAll(
                '.checkbox-menu input[type="checkbox"]:checked'
              ),
            ].map((cb) => cb.value);
          }

          if (category === "bar" && bartype === "allocation") {
            let fetchResponse = await fetch("visualization/barchart.php");
            let data = await fetchResponse.text();
            newBox.querySelector(".output").innerHTML = data;
            let totalValue;
            let groupedData = {};
            jsondata.forEach((item) => {
              if (!groupedData[item.asset_category]) {
                groupedData[item.asset_category] = {
                  asset_category: item.asset_category,
                  total_value: 0, // Start from 0
                  allocation: 0, // Placeholder for allocation %
                };
              }

              totalValue = jsondata.reduce(
                (sum, item) => sum + item.category_asset_value,
                0
              );

              // Sum up values
              groupedData[item.asset_category].total_value +=
                item.category_asset_value;
            });

            // Step 3: Calculate allocation percentage
            Object.keys(groupedData).forEach((key) => {
              groupedData[key].allocation = (
                (groupedData[key].total_value / totalValue) *
                100
              ).toFixed(0);
            });
            // **Filter groupedData to only include selected categories**
            let selectedCategories = getSelectedCategories();
            console.log(selectedCategories);
            let filteredData = Object.values(groupedData).filter((item) =>
              selectedCategories.includes(item.asset_category)
            );

            let barcontainer = newBox.querySelector(".bar-container .barchart");
            let textvalue = filteredData
              .map(
                (item) => `
                <div class="bar-wrapper">
                  <div class = "bar" style ="--value:${item.allocation}%;"  data-value="${item.allocation}"></div>
                  <span class = "bar-label ">${item.asset_category}</span>
                </div>  
                <div class="y-axis">
                    <div class="y-label">100</div>
                    <div class="y-label">80</div>
                    <div class="y-label">60</div>
                    <div class="y-label">40</div>
                    <div class="y-label">20</div>
                    <div class="y-label" >0</div>
                </div>
                <div class="bar-grid"></div>
              `
              )
              .join("");

            barcontainer.innerHTML = textvalue;
            // Label after figure
            let figureElement = newBox.querySelector(
              ".bar-container .barchart"
            );

            // Remove any existing label before inserting a new one
            if (figureElement.parentNode) {
              let existingLabel =
                figureElement.parentNode.querySelector(".barlabel");
              if (existingLabel) existingLabel.remove();
            }

            let label = document.createElement("label");
            label.className = "barlabel";
            label.textContent = "Allocation(%)";

            // Append the label inside the barchart
            figureElement.appendChild(label);
          } else {
            let fetchResponse = await fetch("visualization/barchart.php");
            let data = await fetchResponse.text();
            newBox.querySelector(".output").innerHTML = data;

            let totalValue;
            let groupedData = {};
            jsondata.forEach((item) => {
              if (!groupedData[item.asset_category]) {
                groupedData[item.asset_category] = {
                  asset_category: item.asset_category,
                  total_value: 0,
                  allocation: 0,
                };
              }

              totalValue = jsondata.reduce(
                (sum, item) => sum + item.category_asset_value,
                0
              );

              groupedData[item.asset_category].total_value +=
                item.category_asset_value;
            });

            Object.keys(groupedData).forEach((key) => {
              groupedData[key].allocation = (
                (groupedData[key].total_value / totalValue) *
                100
              ).toFixed(0);
            });

            let selectedCategories = getSelectedCategories();
            let filteredData = Object.values(groupedData).filter((item) =>
              selectedCategories.includes(item.asset_category)
            );
            // console.log(filteredData);

            let barcontainer = newBox.querySelector(".barchart");
            // Calculate max value and step value before .map()
            let textvalue = filteredData
              .map(
                (item) => `
                <div class="bar-wrapper">
                  <div class = "bar" style ="--value:${
                    item.allocation
                  }%;"  data-value="${item.total_value.toLocaleString(
                  "en-IN"
                )}"></div>
                  <span class = "bar-label ">${item.asset_category}</span>
                </div>  
                
                <div class="bar-grid"></div>
              `
              )
              .join("");

            // Inject everything directly
            barcontainer.innerHTML = textvalue;

            let figureElement = newBox.querySelector(".barchart");
            if (figureElement.parentNode) {
              let existingLabel =
                figureElement.parentNode.querySelector(".barlabel");
              if (existingLabel) existingLabel.remove();
            }

            let label = document.createElement("label");
            label.className = "barlabel";
            label.textContent = "  Value (in Crores)";

            figureElement.appendChild(label);
          }
        } else if (category === "netWorth") {
          let fetchResponse = await fetch("visualization/networth.php");
          let data = await fetchResponse.text();

          newBox.querySelector(".output").innerHTML = data;

          let totalAssets = jsondata.reduce(
            (sum, item) => sum + item.category_asset_value,
            0
          );

          // Filter only "Loans" category and sum up its values
          let totalLiabilities = jsondata
            .filter((item) => item.asset_category === "Loans")
            .reduce((sum, item) => sum + item.category_asset_value, 0);
          let currentNetWorth = totalAssets - totalLiabilities;

          let result = 0;
          if (category === "netWorth" && nettype === "Current Net Worth") {
            result = currentNetWorth;
          } else if (category === "netWorth" && nettype === "Total Assets") {
            result = totalAssets;
          } else if (
            category === "netWorth" &&
            nettype === "Total Liabilities"
          ) {
            result = totalLiabilities;
          }
          let networthContainer = newBox.querySelector(
            ".networth-container .net-content"
          );
          // Display result in output
          let netValue = `
              <h1 id="value" style="font-size:50px">
                  <span style="font-size:16px;color:gray; margin-bottom:10px;">${nettype}</span>
                  ₹${result.toLocaleString("en-IN")}
              </h1>
          `;
          networthContainer.innerHTML = netValue;
        }

        fetch("widgetprocess.php", {
          method: "POST",
          body: formData,
        });

        location.reload();
        newBox.querySelector(".filterBox").style.display = "none";
      });

    // Toggle dropdown visibility when the button (checkbox dropdown of bar)is clicked.
    newBox
      .querySelector(".checkbox-btn")
      .addEventListener("click", function () {
        const menu = newBox.querySelector(".checkbox-menu");
        // Toggle display between 'none' and 'block'
        menu.style.display =
          menu.style.display === "none" || menu.style.display === ""
            ? "block"
            : "none";
      });

    // Get all checkboxes within the dropdown.
    const checkboxes = newBox.querySelectorAll(
      '.checkbox-menu input[type="checkbox"]'
    );
    // Add an event listener for changes on each checkbox.
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        // Count how many checkboxes are checked.
        const checkedCount = newBox.querySelectorAll(
          '.checkbox-menu input[type="checkbox"]:checked'
        ).length;

        // If 5 or more are checked, disable the ones that are not checked.
        if (checkedCount >= 5) {
          checkboxes.forEach(function (cb) {
            if (!cb.checked) {
              cb.disabled = true;
            }
          });
        } else {
          // Otherwise, re-enable all checkboxes.
          checkboxes.forEach(function (cb) {
            cb.disabled = false;
          });
        }
      });
    });

    // Append the new box to the container
    boxContainer.appendChild(newBox);
  } else {
    alert("You can only add up to 10 widgets.");
  }
});

// Handle events for close buttons, filter dropdowns, and widget loading
boxContainer.addEventListener("click", function (event) {
  // Handle close button click
  if (event.target.classList.contains("close-btn")) {
    const confirmDelete = confirm(
      "Are You Sure You Want To Delete This Widget?"
    );
    const id = event.target.closest(".box").getAttribute("data-id");

    if (confirmDelete) {
      event.target.closest(".box").remove();

      fetch("widgetprocess.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "widgetid=" + id,
      });
    }
  }
  //handle filter button click
  if (event.target.closest(".filter-btn")) {
    const dropdown = event.target.closest(".filter-btn").nextElementSibling;

    // Toggle dropdown visibility
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  }
});
//for hiding  dropdown on any click on the pg
document.addEventListener("click", function (event) {
  const allDropdowns = document.querySelectorAll(".filter-dropdown .filterBox");
  allDropdowns.forEach((dropdown) => {
    if (!dropdown.closest(".filter-dropdown").contains(event.target)) {
      dropdown.style.display = "none";
    }
  });
});
//hididng dropdown on esape key press
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const allDropdowns = document.querySelectorAll(
      ".filter-dropdown .filterBox"
    );
    allDropdowns.forEach((dropdown) => {
      dropdown.style.display = "none";
    });
  }
});
