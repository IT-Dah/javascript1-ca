const API_BASE_URL = "https://v2.api.noroff.dev";

export const API_RAINYDAYS_URL = `${API_BASE_URL}/rainy-days`;

import {doFetch} from './doFetch.js';


function generateJacketHtml(jacket) {
    
    const jacketDisplay = document.createElement('div');
    jacketDisplay.classList.add('jacket-display');

    const jacketImage = document.createElement('img');
    //Image.classList.add('jacket-image');

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

    jacketPriceContainer.append(jacketPrice, jacketDiscountedPrice);
    jacketDisplay.append(heading, jacketImage, productInfo, jacketPriceContainer);

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

    const responseData = await doFetch(API_RAINYDAYS_URL);
    const jackets = responseData.data;
    displayJackets(jackets);
}

main();