let ProudectName = document.getElementById("ProudectName");
let ProudectPrice = document.getElementById("ProudectPrice");
let ProudectCat = document.getElementById("ProudectCat");
let ProductDes = document.getElementById("ProductDes");
let Proudectimg = document.getElementById("Proudectimg");
let search = document.getElementById("search");
let addBtn = document.getElementById("btn");
let upbtn = document.getElementById("upbtn");
let tmp;
let arr = [];

//! validate

let nameRegex = /^[a-z]{4,8} ?([a-z]{0,8}[1-9]{1,3})? ?([a-z]{3,8})? ?([a-z]{3,8})?$/;
let priceRegex = /^([1-9][0-9]{0,6})$/;
let desRegex = /^.{2,12}$/;
let catRegex = /^(TV|Phones|electronics|smart watch)$/;

// check data at localStorage

if (localStorage.getItem("products") != null) {
  arr = JSON.parse(localStorage.getItem("products"));
  display(arr);
}

// click event to add product

addBtn.addEventListener("click", function () {
  addProduct();
  ProudectName.classList.remove("is-valid");
  ProudectPrice.classList.remove("is-valid");
  ProudectCat.classList.remove("is-valid");
  ProductDes.classList.remove("is-valid");
});

// click event to updata product
upbtn.addEventListener("click", function () {
  updateData();
});

// search in products 
search.addEventListener("input", function () {
  searchPro();
});

//! functions

function addProduct() {
  if (
    ProudectName.classList.contains("is-valid") &&
    ProudectPrice.classList.contains("is-valid") &&
    ProudectCat.classList.contains("is-valid") &&
    ProductDes.classList.contains("is-valid")
  ) {
    let product = {
      code: ProudectName.value,
      price: ProudectPrice.value,
      cat: ProudectCat.value,
      des: ProductDes.value,
      img: `imgs/${Proudectimg.files[0].name}`,
    };
    arr.push(product);

    localStorage.setItem("products", JSON.stringify(arr));
    display(arr);

    clearProducts();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Product add successfully",
      showConfirmButton: false,
      timer: 900,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "please enter a vailed data!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
}

// clear input fields before adding 

function clearProducts() {
  ProudectName.value = null;
  ProudectPrice.value = null;
  ProudectCat.value = null;
  ProductDes.value = null;
  Proudectimg.value = null;
}


//display data 

function display(arrs) {
  let x = "";
  for (let i = 0; i < arrs.length; i++) {
    x += `   <div class="col-md-3">
            <div class="product">
              <img src="${arrs[i].img}" class="img-fluid" alt="">
              <h2 class='fs-5  text-white'>ProudectName: <b>${arrs[i].code}</b></h2>
              <h3 class='fs-6  text-white'>ProudectPrice: <b>${arrs[i].price}</b></h3>
              <h4 class='fs-6  text-white'>ProudectCat: <b>${arrs[i].cat}</b></h4>
              <p class='fs-6  text-white'>ProductDes: <b>${arrs[i].des}</b></p>
            </div>
               <button type="button" onclick = 'getdata(${i})' class="btn btn-outline-success w-100 mb-3"> UP data <i class="mx-2 fa-solid fa-pen"></i></button>
             <button type="button" onclick='Dlete(${i})' class="btn btn-outline-danger w-100"> Dlete <i class=" mx-2 fa-solid fa-trash"></i></button>
          </div>`;
  }
  document.getElementById("row").innerHTML = x;
}

// delete product

function Dlete(e) {
  arr.splice(e, 1);
  localStorage.setItem("products", JSON.stringify(arr));
  display(arr);
}

// search for products

function searchPro() {
  let x = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].code.toLowerCase().includes(search.value.toLowerCase())) {
      x.push(arr[i]);
    }
  }
  display(x);
}

// get data from product to input 

function getdata(e) {
  tmp = e;
  upbtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
  ProudectName.value = arr[e].code;
  ProudectPrice.value = arr[e].price;
  ProudectCat.value = arr[e].cat;
  ProductDes.value = arr[e].des;
}

// update data from user add seve it to same place
function updateData() {
  if (
    ProudectName.classList.contains("is-valid") &&
    ProudectPrice.classList.contains("is-valid") &&
    ProudectCat.classList.contains("is-valid") &&
    ProductDes.classList.contains("is-valid")
  ) {
    upbtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    arr[tmp].code = ProudectName.value;
    arr[tmp].price = ProudectPrice.value;
    arr[tmp].cat = ProudectCat.value;
    arr[tmp].des = ProductDes.value;
    if (Proudectimg.files.length > 0) {
      arr[tmp].img = `imgs/${Proudectimg.files[0].name}`;
    }
    localStorage.setItem("products", JSON.stringify(arr));
    display(arr);
    clearProducts();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Updated Product successfully",
      showConfirmButton: false,
      timer: 900,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "please enter vailed data for updata!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
}

// validate products inputs

function validation(regex, ele) {
  if (regex.test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    ele.nextElementSibling.classList.add("d-none");
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
    ele.nextElementSibling.classList.add("d-block");
    ele.nextElementSibling.classList.remove("d-none");
  }
}
