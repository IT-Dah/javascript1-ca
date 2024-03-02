export function addToCart(jacket) {

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

export function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    console.log('Cart has been cleared');
}

export function removeFromCart(jacket) {
    console.log('Decrement og remove product')
}