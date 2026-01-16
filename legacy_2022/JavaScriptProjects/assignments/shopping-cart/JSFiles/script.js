let w = window.innerWidth;
console.log("width :" + w);

if(w<992) {
    document.getElementById('removeOnsmall').remove();
}

//adding to cart

function addToCart(e) {
    //console.log("button clicked");
    let itemName = e.parentElement.querySelector('a').textContent;
    //console.log(e);
    let price = e.parentElement.querySelector('span').textContent;
    itemName = itemName + "(" + price + ")";
    let noItem = document.getElementById('noItem');
    if (noItem) noItem.remove();
    
    console.log(itemName);
    
    let listItem = document.createElement('li');
    listItem.innerHTML = itemName + ' <span type="button" class="text-danger float-end" onclick="removeFromCart(this)">remove</span> <hr>';
    listItem.className = "listItemColor py-1 fSize-18";
    
    console.log("adding:");
    console.log(listItem);
    
    
    document.querySelector('#cartItems').appendChild(listItem);
    

    //total price add
    let selectedItemPrice = parseInt(price.substring(4, 7));
    let totalPriceString = document.getElementById('totalPrice').textContent;
    let totalPrice = parseInt(totalPriceString.substring(11, (totalPriceString.length-2)));
    totalPrice += selectedItemPrice;
    document.getElementById('totalPrice').textContent = "total: BDT-" + totalPrice + "tk";
}

//removing from cart

function removeFromCart(e) {
    let wholeItem = e.parentElement;
    let parent = e.parentElement.parentElement;
    
    console.log("removing:");
    console.log(wholeItem);
    
    wholeItem.remove();
    
    //total price substract
    let price = wholeItem.textContent;
    console.log(price);
    
    let re = /T-/;
    let re2 = /tk/;
    price = parseInt(price.substring(re.exec(price).index + 2, re2.exec(price).index));
    console.log("adadafa: " + re.exec(price));
    
    let totalPriceString = document.getElementById('totalPrice').textContent;
    let totalPrice = parseInt(totalPriceString.substring(11, (totalPriceString.length-2)));
    console.log("removing price: " + price + " total: " + totalPrice);
    totalPrice -= price;
    document.getElementById('totalPrice').textContent = "total: BDT-" + totalPrice + "tk";
    
    
    if (parent.childNodes.length < 3) {
        let listItem = document.createElement('li');
        listItem.textContent = "no item";
        listItem.id = "noItem";
        listItem.className = "fSize-18";
        document.querySelector("#cartItems").appendChild(listItem);
    }
}