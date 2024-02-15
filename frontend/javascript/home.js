//let api = "http://localhost:8080";
let api= "https://cointab-derp.onrender.com"

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

    table.append(thead);

    // Append table body
    table.append(tbody);

    // Append the table to the tableDiv
    tableDiv.append(table);

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

    users.forEach(async (user) => {
      let row = document.createElement("tr");

      let nameCell = document.createElement("td");
      nameCell.textContent = user.name;
      row.append(nameCell);

      let emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      row.append(emailCell);

      let phoneCell = document.createElement("td");
      phoneCell.textContent = user.phone;
      row.append(phoneCell);

      let websiteCell = document.createElement("td");
      websiteCell.textContent = user.website;
      row.append(websiteCell);

      let cityCell = document.createElement("td");
      cityCell.textContent = user.address.city;
      row.append(cityCell);

      let companyCell = document.createElement("td");
      companyCell.textContent = user.company.name;
      row.append(companyCell);

      // Add a button cell if needed

      let userStatus = await fetch(`${api}/user/getUser/${user.id}`);
      userStatus = await userStatus.json();

      let buttonCell = document.createElement("td");
      let tbutton = document.createElement("button");
      tbutton.textContent = userStatus.isUser ? "Open" : "Add"; //"Action"; // Change this to whatever action you want the button to perform
      tbutton.addEventListener("click", () => {
        buttonClick(user, tbutton);
      });
      //button.onclick(buttonClick(userStatus,user))

      buttonCell.append(tbutton);

      row.append(buttonCell);

      tbody.append(row);
    });

    console.log(users);
  } catch (error) {
    console.log(error);
  }
}

async function buttonClick(user, tbutton) {
  //console.log("clicking on button");
  //console.log("nnnnnn.....", userStatus, user);

  let userStatus = await fetch(`${api}/user/getUser/${user.id}`);
  userStatus = await userStatus.json();

  if (userStatus.isUser == false) {
    let bodyObject = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      city: user.address.city,
      company: user.company.name,
    };

    console.log("bodyObject", bodyObject);

    try {
      let addUser = await fetch(`${api}/user/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObject),
      });

      addUser = await addUser.json();
      console.log("addUser", addUser);

      tbutton.textContent = "Open";
    } catch (error) {
      console.log(error);
    }
  } else if (userStatus.isUser == true) {
    localStorage.setItem("cointabid", JSON.stringify(user.id));

    window.location.href = "/postPage.html";

    console.log("this is open");
  }
}
