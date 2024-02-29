const API_BASE_URL = "https://v2.api.noroff.dev";

export const API_RAINYDAYS_URL = `${API_BASE_URL}/rainy-days`;

import {doFetch} from './doFetch.js';

/* <div class="jacket-display" ;>
          <img
            src="https://i.ibb.co/t8GfZnL/tibetian-red1-min.jpg"
            alt="tibetian-red whisper jacket"
          />
          <div class="product-info">
            <h4>Whisper Jacket</h4>
            <p>Tibetian Red</p>
            <p>kr 699,-</p>
            <form action="product.html">
              <button type="submit">Add To Cart</button>
            </form>
          </div>
        </div>
        */

function generateJacketHtml(jacket) {
    // returns game HTML
    const jacketDisplay = document.createElement('div');
    jacketDisplay.classList.add('jacket-display');

    //does the image go inside here?
    const jacketImage = document.createElement('img');

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const heading = document.createElement('h4');
    heading.textContent = jacket.title;

    const jacketPriceContainer = document.createElement('div');
    jacketPriceContainer.classList.add('jacketPriceContainer')

    const jacketPrice = document.createElement('div');
    jacketPrice.textContent = game.price;

    const jacketDiscountedPrice = document.createElement('div');
    jacketDiscountedPrice.textContent = jacket.discountedPrice;

    jacketPriceContainer.append(jacketPrice, jacketDiscountedPrice);

    return jacketDisplay;
    

function displayJackets(jackets) {
    console.log(jackets);
    jackets.forEach((jacket) => {
        const jacketHtml = generateJacketHtml(jacket);
    });
}

async function main() {
    const responseData = await doFetch(API_RAINYDAYS_URL);
    const jackets = responseData.data;
    displayJackets(jackets)
    
}

main();