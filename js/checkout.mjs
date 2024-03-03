import { addToCart, clearCart, getCart, getTotalNumberOfItemsInCart, removeFromCart } from './cart.mjs';
import { formatCurrency } from './formatCurrency.mjs';

const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
    clearCart();
    displayCartItems();
});

function generateHtmlForJacket(jacket) {
    const jacketDisplay = document.createElement('div');
    
    const jacketTitle = document.createElement('h3');
    jacketTitle.textContent = jacket.title;

    const jacketImage = document.createElement('img');
    jacketImage.src = jacket.image.url;
    jacketImage.alt = jacket.title;
    jacketImage.classList.add('jacket-image');
  
    const jacketQuantity = document.createElement('div');
    jacketQuantity.textContent = 'Quantity: ' + jacket.quantity;
  
    const jacketPrice = document.createElement ('div');
    jacketPrice.textContent = 'Price: ' + jacket.price;
  
    const jacketPriceTotal = document.createElement ('div');
    jacketPriceTotal.textContent = 'Total: ' + formatCurrency(jacket.price * jacket.quantity);

    const quantityAdjustmentContainer = document.createElement('div');

    const incrementButton = document.createElement('button');
    incrementButton.textContent = "+";
    incrementButton.addEventListener('click', () => {
        console.log('Increment the total');
        addToCart(jacket);
        renderCheckoutPage();
    })

    const decrementButton = document.createElement('button');
    decrementButton.textContent = "-";
    decrementButton.addEventListener('click', () => {
        removeFromCart(jacket);
        renderCheckoutPage();
    })

    quantityAdjustmentContainer.append(incrementButton, decrementButton);
  
    jacketDisplay.append(jacketTitle, jacketImage, jacketQuantity, jacketPrice, jacketPriceTotal, quantityAdjustmentContainer);

    return jacketDisplay;
  }


  
function displayCartItems () {

    const displayContainer = document.getElementById('cart-items-display');
    displayContainer.textContent = '';
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    cart.forEach(function (currentItem) {

        const itemHtml = generateHtmlForJacket(currentItem);
        displayContainer.appendChild(itemHtml);
    });
}

function displayCartCounter() {
    const cartCounterContainer = document.getElementById('cart-counter');
    console.log(cartCounterContainer);
    const totalNumberOfItems = getTotalNumberOfItemsInCart();
    cartCounterContainer.textContent = totalNumberOfItems;
}

function renderCheckoutPage () {
    displayCartCounter();
    displayCartItems();
}

function main() {
    renderCheckoutPage();
}

main();