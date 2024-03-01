const API_BASE_URL = "https://v2.api.noroff.dev";

export const API_RAINYDAYS_URL = `${API_BASE_URL}/rainy-days`;

import { addToCart, clearCart } from './cart.mjs';
import { doFetch } from './doFetch.mjs';


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

function generateJacketHtml(jacket) {
    
  const jacketDisplay = document.createElement('div');
  jacketDisplay.classList.add('jacket-display');

  const jacketImage = document.createElement('img');
  jacketImage.src = jacket.image.url;
  jacketImage.alt = jacket.title;
  jacketImage.classList.add('jacket-image');

  const productInfo = document.createElement('div');
  productInfo.classList.add('product-info');

  const heading = document.createElement('h4');
  heading.textContent = jacket.title;

  const jacketPriceContainer = document.createElement('div');

  const jacketPrice = document.createElement('div');
  jacketPrice.textContent = jacket.price;

  const jacketDiscountedPrice = document.createElement('div');
  jacketDiscountedPrice.textContent = jacket.discountedPrice;

  const jacketBuyButton = document.createElement('button');
  jacketBuyButton.textContent = 'Buy';
  jacketBuyButton.classList.add('jacket-buy-button');
  jacketBuyButton.addEventListener('click',() => {
    addToCart(jacket);
  });

  jacketPriceContainer.append(jacketPrice, jacketDiscountedPrice);
  productInfo.append(heading, jacketImage, jacketPriceContainer, jacketBuyButton);
  jacketDisplay.appendChild(productInfo);
  
  return jacketDisplay;
}   

function displayJackets(jackets) {
  const jacketsPriceContainer = document.getElementById('our-jackets');
  console.log(jackets);
  jackets.forEach((jacket) => {
      const jacketHtml = generateJacketHtml(jacket);
      jacketsPriceContainer.appendChild(jacketHtml);
  });
}

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

async function main() {
  createCart();
  const responseData = await doFetch(API_RAINYDAYS_URL);
  const jackets = responseData.data;
  displayJackets(jackets);
  displayCartItems ();
}

main();