const product = [
    {
        id: 0,
        name: "Bag",
        price: 100,
       
    },
     {
        id: 1,
        name: "Dress",
        price: 50,
    
    },
     {
        id: 2,
        name: "Short",
        price: 20,
        
    }
]


const itemListContainer = document.getElementById('itemlist');
product.forEach(element => {

let itemId = element.id;
let itemName = element.name;
let itemPrice = element.price; 
let itemList = document.createElement("p");
itemList.innerHTML = `${itemName}` + ` : ` + `${itemPrice}  ` + `<button onclick="addCart(this,'${itemId}','${itemName}','${itemPrice}')" >add cart </button>`;
// console.log(itemList); 

itemListContainer.append(itemList);


});


// 

const cart = [];
const ulItems = document.getElementById('list');



function addCart(dis,Itemid,itemName,itemPrice){

// document.querySelector('.modal').style.display="Flex";
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
let li = document.createElement("li");
// In order to get the last value of array u have to -1 in lenght of array
// in arr.lenght counting the number of data in array eg: 1-2-3-4-5 = 5
li.innerHTML = `<p>` + `${cart[lastItems].name}` + ` - ` + `${cart[lastItems].price}`+ `<input style="margin-left:2em; width:50px;" type="number" id="myInput" max="10" min="1" value="1" onchange="QuantiityChange(this,'${cart[lastItems].id}','${cart[lastItems].name}','${cart[lastItems].price}')" />
` + `<span style=" margin-left:2em;" id="subTotal"> ${cart[lastItems].price} </span>` +`<button style="margin-left:2em;" onclick="removeItem(this,'${cart[lastItems].id}','${cart[lastItems].name}','${cart[lastItems].price}','${lastItems}')" >Remove</button>` + `</p>`   ; 
ulItems.append(li);

// for(i=0; i < cart.length; i++){
// sum += parseInt(cart[i].price);
// }
// console.log(sum);

// accumulator the first value is set to 0 = u can see it 2nd parameter
// accumalator is current value
sum = cart.reduce((accumulator, product) => parseInt(accumulator) + parseInt(product.price), 0);

// console.log('Total price:', total);
console.log(sum);

total.innerHTML = sum;   


}





function removeItem(button,Rid,Rname,Rprice,index){
// console.log(index);
var listItem = button.closest('li');
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
// console.log(newPrice);
// console.log("Price:" + iPrice)
// console.log("NewPrice:" + newPrice)  
var totalSum = 0;

// cart[index].price = newPrice;

const productToUpdate = cart.find(product => product.id === itemID);
if (productToUpdate) {
    productToUpdate.price = newPrice;
 }

// cart.forEach(function(product) {
// totalSum += parseInt(product.price);
// });

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
