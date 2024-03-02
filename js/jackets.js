import { API_RAINYDAYS_URL } from './constants.mjs';
import { doFetch } from './doFetch.mjs';

//import { createCart, addToCart, clearCart } from './cart.mjs';


// CART CONTENT:
function createCart() {

    const cart = localStorage.getItem('cart');
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
}

function addToCart(jacket) {

    const cart = JSON.parse(localStorage.getItem('cart'));

    const itemIndex = cart.findIndex(function (currentJacket) {
        console.log(currentJacket);
        if (jacket.id === currentJacket.id) {
            return true;
        }
        return false;
    });

    if (itemIndex === -1) {
        cart.push({...jacket, quantity: 1 });
    } else {
        cart[itemIndex].quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}


function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
}




// JACKET PAGE CONTENT:
function generateJacketHtml(jacket) {

    const jacketDisplay = document.createElement('div');
    jacketDisplay.classList.add('jacket-display');

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const jacketHeading = document.createElement('h4');
    jacketHeading.textContent = jacket.title;

    const jacketImage = document.createElement('img');
    jacketImage.src = jacket.image.url;
    jacketImage.alt = jacket.title;
    jacketImage.classList.add('jacket-image');

    const jacketPriceContainer = document.createElement('div');

    const jacketPrice = document.createElement('div');
    jacketPrice.textContent = jacket.price;

    const jacketDiscountedPrice = document.createElement('div');
    jacketDiscountedPrice.textContent = jacket.discountedPrice;

    const jacketBuyButton = document.createElement('button');
    jacketBuyButton.textContent = "Buy";
    // Is this for CSS only? jacketBuyButton.classList.add('jacket-buy-button');
    jacketBuyButton.addEventListener('click', () => {
        addToCart(jacket);
    });
    
    jacketPriceContainer.append(jacketPrice, jacketDiscountedPrice);
    productInfo.append(jacketHeading, jacketImage, jacketPriceContainer, jacketBuyButton);
    jacketDisplay.appendChild(productInfo, jacketPriceContainer);

    return jacketDisplay;

}
 
function displayJackets(jackets) {

    const jacketDisplayContainer = document.getElementById('jacket-display')

    jackets.forEach((jacket) => {
        const jacketHtml = generateJacketHtml(jacket);
        jacketDisplayContainer.appendChild(jacketHtml);
    });
}

async function main() {

    createCart ();
    const responseData = await doFetch(API_RAINYDAYS_URL);
    const jackets = responseData.data;
    displayJackets(jackets);

    //createCart();
    //displayCartItems ();
  }

  main();



  /*
    
    ,jacketBuyButton);
    
    jacketDisplay.appendChild(productInfo);
  
      

const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
  clearCart();
});



function generateHtmlForJacket(jacket) {
  const jacketDisplay = document.createElement('div');
  
  const jacketTitle = document.createElement('h3');
  jacketTitle.textContent = jacket.title;

  const jacketQuantity = document.createElement('div');
  jacketQuantity.textContent = 'Quantity: ' + jacket.quantity;

  const jacketPrice = document.createElement ('div');
  jacketPrice.textContent = 'Price: ' + jacket.price;

  const jacketPriceTotal = document.createElement ('div');
  jacketPriceTotal.textContent = 'Total: ' + jacket.price * jacket.quantity;

  jacketDisplay.append(jacketTitle, jacketQuantity, jacketPrice, jacketPriceTotal);
  return jacketDisplay;
}

function displayCartItems() {
  const displayContainer = document.getElementById('cart-items-display');
  const cart = JSON.parse(localStorage.getItem('cart'));
  
  cart.forEach(function (currentItem) {
      const itemHTML = generateHtmlForJacket(currentItem);
      displayContainer.appendChild(itemHTML);
  });
}
*/