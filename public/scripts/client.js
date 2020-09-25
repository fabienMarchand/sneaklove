import ApiHandler from "./apiHandler.js";
const stylesApi = new ApiHandler("/api/styles");


editListeners();


function editListeners() {
  //do something
  const boxCheck = document.querySelectorAll(".checkbox");
  const arrBox = [];
  boxCheck.forEach((box) => {
   
    box.onchange = (event) => {
      if (box.checked) {
        arrBox.push(event.target.getAttribute("data-tag-id"));
      } else {
        arrBox.filter(function(e) { return e !==  event.target.getAttribute("data-tag-id")})
      }
      console.log(arrBox);
    
      // stylesApi
      // .deleteOne(id) // Make the call to delete an element
      // .then((apiResponse) => {
      //   parentRow.remove(); // remove the row that has just been clicked
      // })
      // .catch((apiError) => {
      //   cons
    };
  
  });
}

console.log("hello");