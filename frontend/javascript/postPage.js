const api = "http://localhost:8080";
const userId = JSON.parse(localStorage.getItem("cointabid"));
let button = document.getElementById("myButton");

const checkButtonStatus = async () => {
  let res = await fetch(`${api}/post/getOnePost/${userId}`);
  res = await res.json();

  toggleButtonText(res.isAvailable);
};

checkButtonStatus();


// Function to toggle button text based on data availability
function toggleButtonText(isAvailable) {
  button.innerText = isAvailable ? "Download In Excel" : "Bulk Add";
}



// Button click event listener
button.addEventListener("click", async function () {
  try {
    let getOnePost = await fetch(`${api}/post/getOnePost/${userId}`);

    getOnePost = await getOnePost.json();

   

    if (getOnePost.isAvailable) {
      let response = await fetch(`${api}/post/sendExcelFile/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to download data");
      }
      // Trigger download of the Excel file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      
      // download in excel
      console.log("download in excel");
    } else {
      console.log("posting....");
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        postData = await postData.json();

        
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

  
}

showPost();
