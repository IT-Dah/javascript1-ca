import { API_RAINYDAYS_URL } from './constants.mjs';
import { doFetch } from './doFetch.mjs';
import { addToCart, clearCart } from './cart.mjs';

const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
    clearCart();
});

function createCart() {

    const cart = localStorage.getItem('cart');
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
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

  }

  main();