let cart = JSON.parse(localStorage.getItem('cart')) || [];
let likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

function toggleLike(heartIcon, product) {
    heartIcon.classList.toggle('liked');
    const isLiked = likedItems.some(item => item.id === product.id);
    if (isLiked) {
        likedItems = likedItems.filter(item => item.id !== product.id);
    } else {
        likedItems.push(product);
    }
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    updateLikedModal();
}
function addToCart(event, product) {
    event.preventDefault(); 
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
    updateCartModal();
}
function updateCartSummary() {
    const cartIcon = document.querySelector('.fa-cart-shopping');
    cartIcon.textContent = ` (${cart.length})`;
}
function updateLikedModal() {
    const likedModalContent = document.querySelector('#liked-modal-content');
    likedModalContent.innerHTML = ''; 
    if (likedItems.length === 0) {
        likedModalContent.innerHTML = '<p>No liked items.</p>';
        return;
    }
    likedItems.forEach((item, index) => {
        likedModalContent.innerHTML += `
            <div class="modal-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <p>$${item.price}</p>
                    <button onclick="removeFromLiked(${index})">Remove</button>
                </div>
            </div>
        `;
    });
}
function updateCartModal() {
    const cartModalContent = document.querySelector('#cart-modal-content');
    cartModalContent.innerHTML = ''; 

    if (cart.length === 0) {
        cartModalContent.innerHTML = '<p>No items in the cart.</p>';
        return;
    }
    cart.forEach((item, index) => {
        cartModalContent.innerHTML += `
            <div class="modal-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <p>$${item.price}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });
}
function removeFromLiked(index) {
    likedItems.splice(index, 1);
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    updateLikedModal(); 
}
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
    updateCartModal();
}
document.querySelector('.fa-heart').addEventListener('click', () => {
    document.querySelector('#liked-modal').style.display = 'flex';
    updateLikedModal(); 
});
document.querySelector('.fa-cart-shopping').addEventListener('click', () => {
    document.querySelector('#cart-modal').style.display = 'flex';
    updateCartModal(); 
});
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', (e) => {
        e.target.closest('.modal').style.display = 'none';
    });
});
document.querySelectorAll('.card').forEach(card => {
    const likeButton = card.querySelector('.fa-heart');
    const addToCartButton = card.querySelector('.btn');
    const productImage = card.querySelector('img').src;
    const productName = card.querySelector('h2').textContent;
    const productPrice = parseFloat(card.querySelector('h3').textContent.replace('$', ''));
    likeButton.addEventListener('click', () => {
        toggleLike(likeButton, {
            id: card.dataset.id,
            name: productName,
            price: productPrice,
            image: productImage
        });
    });
    addToCartButton.addEventListener('click', (event) => {
        addToCart(event, {
            id: card.dataset.id,
            name: productName,
            price: productPrice,
            image: productImage
        });
    });
    if (likedItems.some(item => item.id === card.dataset.id)) {
        likeButton.classList.add('liked');
    }
});
document.head.append(style);
updateCartSummary();
updateLikedModal();
updateCartModal();