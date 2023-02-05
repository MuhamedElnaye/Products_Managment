let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let categorys = document.querySelector("#categorys");
let submit = document.querySelector("#submit");

let mood = "create";
let tmp;

//################## 1-get Total #######################
function getTotal() {
  if (price.value != "") {
    //Note the input type is string you should change to number by any way
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "blue";
    // console.log(total.innerHTML);
  } else {
    total.innerHTML = "0";
    total.style.background = "rgba(65, 175, 80, 0.767)";
  }
}

//################## 2-create product #######################
/*################## 3-save it in localstorge  ##########################3 */
let dataOfProducts;
//localStorage in case it space the defult value is null
if (localStorage.productData != null) {
  //you should convert JSON opject(String) to js opject
  dataOfProducts = JSON.parse(localStorage.productData);
} else {
  dataOfProducts = [];
}
submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    categorys: categorys.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    categorys.value != "" &&
    newProduct.count < 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataOfProducts.push(newProduct);
        }
      } else {
        dataOfProducts.push(newProduct);
      }
    } else {
      dataOfProducts[tmp] = newProduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }
  //console.log(dataOfProducts);
  //note localStorage don't accept array it accept string only  and you should
  //convert the array to string by using JSON.strigIfy
  localStorage.setItem("productData", JSON.stringify(dataOfProducts));
  showData();
};

//################## 4-clear inputs #######################
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  categorys.value = "";
  total.style.background = "rgba(65, 175, 80, 0.767)";
}
//################## 4-read #######################
function showData() {
  let table = "";
  for (let i = 0; i < dataOfProducts.length; i++) {
    //+ to add to the found data and don't delete the last
    table += `<tr>
                <td>${i + 1}</td>
                <td>${dataOfProducts[i].title}</td>
                <td>${dataOfProducts[i].price}</td>
                <td>${dataOfProducts[i].taxes}</td>
                <td>${dataOfProducts[i].ads}</td>
                <td>${dataOfProducts[i].discount}</td>
                <td>${dataOfProducts[i].total}</td>
                <td>${dataOfProducts[i].categorys}</td>
                <td><button onclick="updataData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteOneProduct(${i})" id="delete">Delete</button></td>
              </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let divdeleteAllProducts = document.getElementById("deleteall");
  //using delete all products
  if (dataOfProducts.length > 0) {
    divdeleteAllProducts.innerHTML = `<button onclick="fdeleteAllproducts()" style="width:100%;" >Delete ALL Products [${dataOfProducts.length}]</button>`;
    // divdeleteAllProducts.innerHTML = `<button id="btnDelAll" style="width:100%;" >Delete ALL Products</button>`;
  } else {
    divdeleteAllProducts.innerHTML = "";
  }
}
showData();
//################## 5-delete #######################
function deleteOneProduct(i) {
  dataOfProducts.splice(i, 1);
  localStorage.productData = JSON.stringify(dataOfProducts);
  showData();
}
//################## 6-delete ALL Products #######################
/*let btnDelAll = document.getElementById("btnDelAll");
btnDelAll.onclick = function fdeleteAllproducts() {
  localStorage.clear();
  dataOfProducts.splice(0); //meaing delet from first to the end of this array
  //   console.log("its work");
  showData();
}; */
function fdeleteAllproducts() {
  localStorage.clear();
  dataOfProducts.splice(0); //meaing delet from first to the end of this array
  showData();
}

//################## 7-count #######################
//in line 46

//################## 8-update #######################
function updataData(i) {
  title.value = dataOfProducts[i].title;
  price.value = dataOfProducts[i].price;
  taxes.value = dataOfProducts[i].taxes;
  ads.value = dataOfProducts[i].ads;
  discount.value = dataOfProducts[i].discount;
  getTotal();
  count.style.display = "none";
  categorys.value = dataOfProducts[i].categorys;
  submit.innerHTML = "Updata";
  mood = "updata";
  tmp = i;
  window.scroll({ top: 0 });
}
//################## 9-search(by title or categoty) #######################
let searchMood = "title";
function getsearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchtitle") {
    searchMood = "title";
  } else {
    searchMood = "categorys";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
  //   console.log(id);
}
function searchData(value) {
  let table = "";
  //search by Title
  for (let i = 0; i < dataOfProducts.length; i++) {
    if (searchMood === "title") {
      if (dataOfProducts[i].title.includes(value.toLowerCase())) {
        table += `<tr>
                <td>${i}</td>
                <td>${dataOfProducts[i].title}</td>
                <td>${dataOfProducts[i].price}</td>
                <td>${dataOfProducts[i].taxes}</td>
                <td>${dataOfProducts[i].ads}</td>
                <td>${dataOfProducts[i].discount}</td>
                <td>${dataOfProducts[i].total}</td>
                <td>${dataOfProducts[i].categorys}</td>
                <td><button onclick="updataData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteOneProduct(${i})" id="delete">Delete</button></td>
              </tr>
    `;
      }
    }
    //search by category
    else {
      if (dataOfProducts[i].categorys.includes(value.toLowerCase())) {
        table += `<tr>
                <td>${i}</td>
                <td>${dataOfProducts[i].title}</td>
                <td>${dataOfProducts[i].price}</td>
                <td>${dataOfProducts[i].taxes}</td>
                <td>${dataOfProducts[i].ads}</td>
                <td>${dataOfProducts[i].discount}</td>
                <td>${dataOfProducts[i].total}</td>
                <td>${dataOfProducts[i].categorys}</td>
                <td><button onclick="updataData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteOneProduct(${i})" id="delete">Delete</button></td>
              </tr>
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// let tablehead = document.getElementById("thead");
// function changemedia() {
//   if (window.matchMedia("(max-width: 767px)")) {
//     tablehead = ` <tr id="thead">
//               <th>ID</th>
//               <th>Tit</th>
//               <th>Prc</th>
//               <th>Tax</th>
//               <th>ADS</th>
//               <th>Disc</th>
//               <th>Tot</th>
//               <th>Cat</th>
//               <th>Upd</th>
//               <th>Del</th>
//             </tr>
//               `;
//   }
// }
