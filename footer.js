const product = [
    {
        id: 0,
        name: "Beef Burger",
        price: 150,
        path: "./assets/Burgers/BeefBurger.jpg"
       
    },
     {
        id: 1,
        name: "Bacon & Beef Burger",
        price: 175,
        path: "./assets/Burgers/BaconAndBeefBurger.jpg"
    },
     {
        id: 2,
        name: "BBQ Bacon Burger",
        price: 220,
        path: "./assets/Burgers/BbqBaconBurger.jpg"
        
    },
    {
        id: 3,
        name: "Mushroom Burger",
        price: 220,
        path: "./assets/Burgers/CaramelizedOnionMushroomBurger.jpg"
       
        
    },
    {
        id: 4,
        name: "Veggie Burger",
        price: 220,
        path: "./assets/Burgers/VeggieBurger.jpg"
       
        
    },
    {
        id: 5,
        name: "Cheese Burger",
        price: 120,
        path: "./assets/Burgers/CheeseBurger.jpg"
        
    },
    {
        id: 6,
        name: "Crispy Chicken Burger",
        price: 270,
        path: "./assets/Burgers/CrispyChickenBurger.jpg"
        
    },
    {
        id: 7,
        name: "Hawai Burger",
        price: 230,
        path: "./assets/Burgers/Hawai Burger.jpg"
        
    }

]


const itemListContainer = document.getElementById('itemlist');
product.forEach(element => {

let itemId = element.id;
let itemName = element.name;
let itemPrice = element.price;
let itemPath = element.path; 
let itemList = document.createElement("p");
itemList.innerHTML = `
    <div class="d-flex flex-row border border-warning border-2 p-1 rounded-2 " style="height: 240px; width: 192px;">
        <div class="d-flex flex-column" style="width: 100%;" >
            <div class="d-flex justify-content-center align-items-center p-3 " >
            <img src="${itemPath}" style="height: 100px; width:100%">
            </div>
            <div class="d-flex justify-content-center align-items-center " style="height: 40px;">
            <p class="fs-6 font-weight-bold" >${itemName}</p>
            </div>
            <div class="d-flex justify-content-center align-items-center "
            style="height: 20px;">
                <p>${itemPrice}</p>
            </div>
            <div class="d-flex justify-content-center align-items-center "
            style="height: 150px;" >
                <button style="height: 35px;"class="btn btn-primary h-1" id="${itemId}" onclick="addCart(this,'${itemId}','${itemName}','${itemPrice}')">Add to Cart
                </button>
            <div>
        </div>
    </div>`;


itemListContainer.append(itemList);

});


// 

const cart = [];
const ulItems = document.getElementById('list');



function addCart(dis,Itemid,itemName,itemPrice){

dis.disabled = true;
let id = Itemid;
let name = itemName;
let price = itemPrice;
let n = 1;
let sum = 0;
let i = 0;
let total = document.getElementById('total');



const addItems = {id,name,price};
cart.push(addItems);

// Fetch names of all items and display to HTML
let lastItems = cart.length - n;
let li = document.createElement("tr");
// In order to get the last value of array u have to -1 in lenght of array
// in arr.lenght counting the number of data in array eg: 1-2-3-4-5 = 5
li.innerHTML = `
<td >${cart[lastItems].name}</td>
<td>
  <input style="width:30px;" class="quantity-input" type="number" max="10" min="1" value="1" onchange="QuantiityChange(this,'${cart[lastItems].id}','${cart[lastItems].name}','${cart[lastItems].price}')">
</td>
<td class="subtotal">$${cart[lastItems].price}</td>
<td>
  <button class="btn btn-danger" onclick="removeItem(this,'${cart[lastItems].id}','${cart[lastItems].name}','${cart[lastItems].price}','${lastItems}')">
    <i class="bi bi-trash3"></i>
  </button>
</td>
`; 
ulItems.append(li);


// accumulator the first value is set to 0 = u can see it 2nd parameter
// accumalator is current value
sum = cart.reduce((accumulator, product) => parseInt(accumulator) + parseInt(product.price), 0);

console.log(sum);

total.innerHTML = sum;   


}





function removeItem(button,Rid,Rname,Rprice,index){
// console.log(index);
document.getElementById(Rid).disabled = false;
let listItem = button.closest('li');
let sum = 0;
let currentTotal = document.getElementById('total').textContent;
if (listItem) {
cart.splice(index,1)
listItem.remove();

// update total
total.textContent = parseInt(currentTotal) - Rprice; 
console.log(currentTotal);



}

}

function QuantiityChange(quan,id,name,itemPrice){
const index = cart.length - 1;
const itemID = id;
const itemName = name;
const quantity = quan.value;
let total = document.getElementById('total');
let iPrice = itemPrice;
let newPrice = quantity * iPrice;
console.log(itemID + " " + itemName + " -- " + quantity + "Price" + newPrice);
console.log(index)
var totalSum = 0;


const productToUpdate = cart.find(product => product.id === itemID);
if (productToUpdate) {
    productToUpdate.price = newPrice;
 }

totalSum = cart.reduce((accumulator, product) => parseInt(accumulator) + parseInt(product.price), 0);

console.log("total Price: " + totalSum);

console.log(cart);

total.innerHTML = totalSum;

var a = quan.closest("li");
var liIndex = Array.from(a.parentNode.children).indexOf(a);

console.log("index:" + liIndex);


const myList = document.getElementById('list');

// Get a reference to the second <li> element (index 1)
const secondLi = myList.getElementsByTagName('li')[liIndex];
// const subtotal = document.querySelectorAll('#subTotal')[liIndex].textContent;
const subtotal = document.querySelectorAll('#subTotal')[liIndex];
subtotal.textContent = newPrice;

// Change the content of the second <li>
// secondLi.textContent = 'New Content for Item 2';


}
