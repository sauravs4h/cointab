let button= document.getElementById("myButton");



/////////////////////////////// Post ///////////////// 

let api = "http://localhost:8080";

const userId = JSON.parse(localStorage.getItem("cointabid"));

console.log(userId);

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

    let bodytext= document.createElement("p");
    bodytext.innerText=body;

    let companytext= document.createElement("h4");
    companytext.innerText=company

    cardDiv.append(nametext,titletext,bodytext,companytext);
  });

  console.log("getPost", getPost);
}

showPost();


