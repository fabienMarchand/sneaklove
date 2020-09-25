import APIHandler from "./apiHandler.js";
//const stylesApi = new ApiHandler("/api/styles");
const stylesApi = new APIHandler('http://localhost:4242');

editListeners();


function editListeners() {
  //do something
  const boxCheck = document.querySelectorAll(".checkbox");
  const arrBox = [];
  boxCheck.forEach((box) => {
    
    box.onchange = (event) => {
      if (box.checked) {
        arrBox.push(event.target.getAttribute("data-tag-id"));

        stylesApi
        .getAll(arrBox) // Make the call to delete an element
        .then((apiResponse) => {


        const getGrid = document.getElementById("products_grid");
        getGrid.innerHTML = "";
            apiResponse.data.forEach(shoe => {
                
                const oneSneaker = document.createElement("a");
                oneSneaker.setAttribute("href", `/one-product/${shoe._id}`);
                oneSneaker.className = "product-item-wrapper";
                oneSneaker.innerHTML += `
            <div class="product-img">
                <img src="${shoe.images}" alt="${shoe.name} : what a nice pair of kicks">
            </div>
            <p class="product-name">${shoe.name}</p>
            <p class="product-cat">${shoe.category}</p>
            <p class="product-price">${shoe.price}</p>
        `;
        getGrid.appendChild(oneSneaker);



            })

        })
        .catch((apiError) => {
          console.log(apiError);
        });
      } else {
        arrBox.filter(function(e) { return e !==  event.target.getAttribute("data-tag-id")})
      }
      console.log(arrBox);
    };
  });
}