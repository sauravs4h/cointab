const api = "http://localhost:8080";
const userId = JSON.parse(localStorage.getItem("cointabid"));
let button = document.getElementById("myButton");

const checkButtonStatus = async () => {
  console.log("chalo bhai");

  let res = await fetch(`${api}/post/getOnePost/${userId}`);
  res = res.json();
  console.log("....j", res);
};

checkButtonStatus();
//console.log("chalo bhai");

// Function to toggle button text based on data availability
function toggleButtonText(isAvailable) {
  button.innerText = isAvailable ? "Download In Excel" : "Bulk Add";
}

// // Fetch data and toggle button text accordingly
// fetch(`${api}/post/getOnePost/${userId}`)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log("data", data);
//     toggleButtonText(data.isAvailable);
//   })
//   .catch((error) => console.log(error));

// Button click event listener
button.addEventListener("click", async function () {
  try {
    let getOnePost = await fetch(`${api}/post/getOnePost/${userId}`);

    getOnePost = await getOnePost.json();

    console.log("getOnePost", getOnePost);

    if (getOnePost.isAvailable) {
      // download in excel
      console.log("download in excel");
    } else {
      user = await fetch(`${api}/user/getUser/${userId}`);
      user = await user.json();
      user = user.user;

      let getPost = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      getPost = await getPost.json();

      getPost.forEach(async (el) => {
        let id = el.id;
        let name = user.name;
        let title = el.title;
        let body = el.body;
        let company = user.company;

        let payload = {
          id,
          userId,
          name,
          title,
          body,
          company,
        };

        let postData = await fetch(`${api}/post/addPost`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        postData = await postData.json();

        console.log("postData...", postData);
      });

      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
});

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
