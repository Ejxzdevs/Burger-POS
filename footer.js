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
        
    // DISPLAY ITEMS
    itemList.innerHTML = `
    <div class="card shadow d-flex flex-row py-1 rounded "style="height: 240px; width: 192px;">
        <div class="d-flex flex-column" style="width: 100%;" >
            <div class="p-0 m-0 d-flex justify-content-center align-items-center" >
                <img class="card-img-top" src="${itemPath}" style="height: 110px; width:98%; border-radius: 5px;" >
            </div>
            <div class="d-flex align-items-center fw-medium pt-3 ps-2" style="height: 30px;">
                <p> ₱ ${itemPrice}</p>
            </div>
            <div class="fw-bold d-flex align-items-center ps-2" style="height: 40px;">
                <p class="fw-medium" style="font-size: 13px" >${itemName}</p>
            </div>
            <div class="d-flex justify-content-center align-items-center "
            style="height: 150px;" >
                <button class="btn btn-primary" id="${itemId}" onclick="addCart(this,'${itemId}','${itemName}','${itemPrice}')
                " 
                style="
                    height: 35px;
                    width: 170px;
                    font-size: 12px;
                
                ">
                    Add to Cart
                </button>
            <div>
        </div>
    </div>
    `;
    itemListContainer.append(itemList);
    });


    const cart = [];
    const ulItems = document.getElementById('list');

    // THIS METHOD FOR ADDING ITEM TO CART OR DISPLAY ORDERED
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

  
    let lastItems = cart.length - n;
    let li = document.createElement("tr");
    
    li.innerHTML = `
        <td class="text-center fw-medium " style="width: 100px;" >${cart[lastItems].name}</td>
        <td class="text-center" >
            <input style="width:30px;" class="quantity-input" type="number" max="9" min="1" value="1" onchange="QuantityChange(this,'${cart[lastItems].id}','${cart[lastItems].name}','${cart[lastItems].price}')">
        </td>
        <td id="${cart[lastItems].id}SB" class="subtotal text-center">${cart[lastItems].price}</td>
        <td class="text-center">
            <button class="btn btn-danger" onclick="removeItem(this,'${cart[lastItems].id}','${cart[lastItems].name}','${cart[lastItems].price}','${lastItems}')">
                <i class="bi bi-trash3"></i>
            </button>
        </td>
    `; 
        ulItems.append(li);
        sum = cart.reduce((accumulator, product) => parseInt(accumulator) + parseInt(product.price), 0);
        console.log(sum);
        total.innerHTML = sum;   
    }

    // METHOD FOR REMOVE ITEM FROM ARRAY
    function removeItem(button,Rid,Rname,Rprice,index){
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
        document.getElementById(Rid).disabled = false;
        let listItem = button.closest('td');
        let sum = 0;
        let currentTotal = document.getElementById('total').textContent;
        if (listItem) {
            cart.splice(index,1)
        listItem.remove();

        // UPDATE TOTAL
        total.textContent = parseInt(currentTotal) - Rprice; 
        console.log(currentTotal);
    }
}

    // METHOD FOR INCREASE OR DECREASE QTY 
    function QuantityChange(quan,id,name,itemPrice){
        const index = cart.length - 1;
        const itemID = id;
        const itemName = name;
        const quantity = quan.value;
        console.log(itemID);

        let total = document.getElementById('total');
        let iPrice = itemPrice;
        let newPrice = quantity * iPrice;
            document.getElementById(itemID+"SB").textContent = quantity * iPrice;
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
            const secondLi = myList.getElementsByTagName('li')[liIndex];
            const subtotal = document.querySelectorAll('#subTotal')[liIndex];
            subtotal.textContent = newPrice;
    }
