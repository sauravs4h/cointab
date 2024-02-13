let tableDiv = document.getElementById("table");
tableDiv.innerHTML = "";

let allUserButton = document.getElementById("allUserButton");

allUserButton.addEventListener("click", showtable);

async function showtable() {
  try {
    let apiData = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "Get",
    });
    let users = await apiData.json();

    // Create a table element
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");

    // Create table header
    let thead = document.createElement("thead");
    thead.innerHTML = `
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Website</th>
      <th>City</th>
      <th>Company</th>
      <th>Button</th>
    `;

    table.appendChild(thead);

    // Append table body
    table.appendChild(tbody);

    // Append the table to the tableDiv
    tableDiv.appendChild(table);

    // tableDiv.innerHTML = `

    // <table>
    //     <thead>
    //       <th>Name</th>
    //       <th>Email</th>
    //       <th>Phone</th>
    //       <th>Website</th>
    //       <th>City</th>
    //       <th>Company</th>
    //       <th>Button</th>
    //     </thead>

    //     <tbody>
    //       <tr>
    //         <td>s</td>
    //         <td>s</td>
    //         <td>s</td>
    //         <td>s</td>
    //       </tr>
    //     </tbody>
    //   </table>

    // `;

    users.forEach((user) => {
      let row = document.createElement("tr");

      let nameCell = document.createElement("td");
      nameCell.textContent = user.name;
      row.appendChild(nameCell);

      let emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      row.appendChild(emailCell);

      let phoneCell = document.createElement("td");
      phoneCell.textContent = user.phone;
      row.appendChild(phoneCell);

      let websiteCell = document.createElement("td");
      websiteCell.textContent = user.website;
      row.appendChild(websiteCell);

      let cityCell = document.createElement("td");
      cityCell.textContent = user.address.city;
      row.appendChild(cityCell);

      let companyCell = document.createElement("td");
      companyCell.textContent = user.company.name;
      row.appendChild(companyCell);

      // Add a button cell if needed
      let buttonCell = document.createElement("td");
      let button = document.createElement("button");
      button.textContent = "Action"; // Change this to whatever action you want the button to perform
      buttonCell.appendChild(button);
      row.appendChild(buttonCell);

      tbody.appendChild(row);
    });

    console.log(users);
  } catch (error) {
    console.log(error);
  }
}
