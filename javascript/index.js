var BookmarkSite = document.getElementById("BookmarkSite");
var BookmarkName = document.getElementById("BookmarkName");
var BookmarkTable = document.getElementById("BookmarkTable");
var alertBox = document.getElementById("alertBox");
var closebtn = document.getElementsByClassName("btn-close");
var bookMarkBody = document.getElementById("bookMarkBody");
var BookmarkArr;

//check if bookmark exist in local storage
if (localStorage.getItem("bookmarkList")) {
  BookmarkArr = JSON.parse(localStorage.getItem("bookmarkList"));
  displayBookmark(BookmarkArr);
} else {
  BookmarkArr = [];
  // Optionally, you can add a default product to the list
  // productList.push({name: "Sample Product", price: 100, cat: "Sample Category", desc: "Sample Description", img: "sample.jpg"});
}

//function to save in local storage
function saveToLocalStorage() {
  localStorage.setItem("bookmarkList", JSON.stringify(BookmarkArr));
}

function addBookmark() {
  //check if the inputs are empty
  if (checkEmptyInputs()) {
    //check if the arr has a valid url nad name
    if (validateBookmarkName() === true && validateBookmarkSite() === true) {
      //creat an object to hold product data
      var product = {
        name: BookmarkName.value,
        site: BookmarkSite.value,
      };

      //to add the product to the array
      BookmarkArr.push(product);
      displayBookmark(BookmarkArr);
      clearInputs();

      saveToLocalStorage();
    }
  }
}

function displayBookmark(arr) {
  var cartoona = "";

  //check if the array is empty
  if (arr.length === 0) {
 
    BookmarkTable.innerHTML = cartoona;
  }
  //loop through the array and create table rows
  else{
  for (var i = 0; i < arr.length; i++) {
    cartoona += `<tr>
              <th scope="row">${i + 1}</th>
              <td>${arr[i].name}</td>
              <td>
                <button onclick="visitWebsite(${i})" class="btn btn-success">
                  <i class="fa-solid fa-eye pe-2"></i>visit
                </button>
              </td>
              <td>
                <button onclick="deleteBookmark(${i})" class="btn btn-danger">
                  <i class="fa-solid fa-trash pe-2"></i>Delete
                </button>
              </td>
            </tr>`;
      BookmarkTable.innerHTML = cartoona;
  }
  }
}

//function to clear

function clearInputs() {
  BookmarkName.value = null;
  BookmarkSite.value = null;
}

//function to visit websit and add https in case of live server
function visitWebsite(index) {
  var userURL = BookmarkArr[index].site;

  //i add https:// for the live server because some sites may not work without it
  var httpsRegex = /^https?:\/\//g;
  // Check if the URL starts with http:// or https://
  if (!httpsRegex.test(userURL)) {
    userURL = "https://" + userURL; // Add https:// if not present
  }
  // Open the URL in a new tab
  window.open(userURL, "_blank");
}

//function to delete bookmark
function deleteBookmark(index) {
  BookmarkArr.splice(index, 1);
  displayBookmark(BookmarkArr);
  saveToLocalStorage();
}

//function to validate bookmark name more than 3 characters and using only characters and numbers
function validateBookmarkName() {
  var name = BookmarkName.value;
  // Regular expression to allow only letters and spaces, with a minimum length of 3 characters
  var regex = /^[a-zA-Z\s]{3,}$/;

  if (!regex.test(name)) {
  addAlertBox();
   
    return false;
  } else {
    closeAlertBox();
    return true;
  }
}

//function to validate bookmark site .com or .net or .org
function validateBookmarkSite() {
  var site = BookmarkSite.value;
  // Regular expression to validate URL format
  var regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

  if (!regex.test(site)) {
      addAlertBox();

    return false;
  } else {
       closeAlertBox();

    return true;
  }
}

//function to check for empty inputs
function checkEmptyInputs() {
  if (BookmarkName.value === "" || BookmarkSite.value === "") {
      addAlertBox();

    return false;
  } else {
     closeAlertBox();

    return true;
  }
}

//function to close alert box
function closeAlertBox() {
  alertBox.classList.add("d-none");
  bookMarkBody.classList.replace("opacity-50", "opacity-100");
}
for (var i = 0; i < closebtn.length; i++) {
  closebtn[i].addEventListener("click", function () {
    closeAlertBox();
  });
}


//function to add alert box
function addAlertBox() {
  alertBox.classList.remove("d-none");
  bookMarkBody.classList.replace("opacity-100", "opacity-50");
}


//event listener for the escape key to close the alert box
document.addEventListener("keyup", function (e) {
// console.log(e.key);
  if (e.key === "Escape") {
    closeAlertBox();
  }
});




