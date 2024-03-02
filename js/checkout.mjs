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
    jacketPriceTotal.textContent = 'Total: ' + jacket.price * jacket.quantity;
  
    jacketDisplay.append(jacketTitle, jacketImage, jacketQuantity, jacketPrice, jacketPriceTotal);

    return jacketDisplay;
  }


function displayCartItems () {

    const displayContainer = document.getElementById('cart-items-display');
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    cart.forEach(function (currentItem) {

        const itemHtml = generateHtmlForJacket(currentItem);

        displayContainer.appendChild(itemHtml);
    });
}


function main() {
    displayCartItems();
}


main();