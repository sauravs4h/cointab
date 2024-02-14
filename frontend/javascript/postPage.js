const api = "http://localhost:8080";
const userId = JSON.parse(localStorage.getItem("cointabid"));
const button = document.getElementById("myButton");

document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle button text based on data availability
  function toggleButtonText(isAvailable) {
    button.innerText = isAvailable ? "Download" : "Post in Bulk";
  }

  // Fetch data and toggle button text accordingly
  fetch(`${api}/post/getOnePost/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      toggleButtonText(data.isAvailable);
    })
    .catch((error) => console.log(error));

  // Button click event listener
  button.addEventListener("click", function () {
    // Logic for button click action (Download or Post in Bulk)
    // You can implement this logic as needed
  });
});

// const api = "http://localhost:8080";
// const userId = JSON.parse(localStorage.getItem("cointabid"));
// const button = document.getElementById("myButton");

// document.addEventListener("DOMContentLoaded", function() {

//   // Function to toggle button text based on data availability
//   function toggleButtonText(isAvailable) {
//     button.innerText = isAvailable ? "Download" : "Post in Bulk";
//   }

//   // Fetch data and toggle button text accordingly
//   fetch(`${api}/post/getOnePost/${userId}`, {

//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("data", data);
//       toggleButtonText(data.isAvailable);
//     })
//     .catch((error) => console.log(error));

//   // Button click event listener
//   button.addEventListener("click", function() {
//     // Logic for button click action (Download or Post in Bulk)
//     // You can implement this logic as needed
//   });
// });

// let api = "http://localhost:8080";

// const userId = JSON.parse(localStorage.getItem("cointabid"));

// console.log(userId);

// let button = document.getElementById("myButton");

// let getOnePost = fetch(`${api}/post/getOnePost`).then((res) => res.json())
// .then((data)=>console.log("data",data))
// .catch((error) => console.log(error));

// let x=fetch(`${api}/post/getOnePost`,{
//   method:"GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({userId}),
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log("data", data);
//     if (data && data.isAvailable) {
//       button.innerText = "Download";
//     } else {
//       button.innerText = "Post in Bulk";
//     }
//   });

// console.log("getOnePost", x);

/////////////////////////////// Post /////////////////

let postDiv = document.getElementById("post");

async function showPost() {
  user = await fetch(`${api}/user/getUser/${userId}`);
  user = await user.json();
  user = user.user;
  console.log(user);

  let getPost = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  getPost = await getPost.json();

  getPost.forEach((el) => {
    let name = user.name;
    let title = el.title;
    let body = el.body;
    let company = user.company;

    let cardDiv = document.createElement("div");
    postDiv.append(cardDiv);

    let nametext = document.createElement("h3");
    nametext.innerText = name;

    let titletext = document.createElement("h4");
    titletext.innerText = title;

    let bodytext = document.createElement("p");
    bodytext.innerText = body;

    let companytext = document.createElement("h4");
    companytext.innerText = company;

    cardDiv.append(nametext, titletext, bodytext, companytext);
  });

  console.log("getPost", getPost);
}

showPost();
