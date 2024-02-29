const API_BASE_URL = "https://v2.api.noroff.dev";

export const API_RAINYDAYS_URL = `${API_BASE_URL}/rainy-days`;

import {doFetch} from './doFetch.js';


// 
function createCart () {
  const cart = localStorage.getItem('cart');
  if (!cart) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
}

function addToCart(jacket) {

  const cart = JSON.parse (localStorage.getItem('cart'))
  const itemIndex = cart.findIndex(function (currentJacket) {
      if (jacket.id === currentJacket.id) {
        return true;
      }
      return false;
  });
  
  if (itemIndex === -1) {
    cart.push({...jacket, quantity: 1 });
  } else {
    cart [itemIndex].quantity += 1;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
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
    jacketPriceContainer.classList.add('jacketPriceContainer');

    const jacketPrice = document.createElement('div');
    jacketPrice.textContent = jacket.price;

    const jacketDiscountedPrice = document.createElement('div');
    jacketDiscountedPrice.textContent = jacket.discountedPrice;

    const jacketBuyButton = document.createElement('button');
    jacketBuyButton.textContent = 'Buy';
    jacketBuyButton.classList.add('jacket-buy-button');
    jacketBuyButton.addEventListener('click',() => {
      addToCart(jacket);
      console.log('id', jacket.id)
    })

    jacketPriceContainer.append(jacketPrice, jacketDiscountedPrice);
    jacketDisplay.append(heading, jacketImage, productInfo, jacketPriceContainer, jacketBuyButton);

    return jacketDisplay;
};   


function displayJackets(jackets) {

  const ourJackets = document.querySelector('#our-jackets');
  ourJackets.textContent = '';

    jackets.forEach((jacket) => {
        const jacketHtml = generateJacketHtml(jacket);
        ourJackets.appendChild(jacketHtml);
    });
}


async function main() {

    createCart();

    const responseData = await doFetch(API_RAINYDAYS_URL);
    const jackets = responseData.data;
    displayJackets(jackets);
}

main();