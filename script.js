// Product data stored as JavaScript objects
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        icon: "🎧",
        description: "Comfortable wireless headphones for music and calls."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        icon: "⌚",
        description: "Track your daily activity with a stylish smart watch."
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 1299,
        icon: "🔊",
        description: "Portable speaker with clear and powerful sound."
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 899,
        icon: "🎒",
        description: "Spacious backpack designed for laptops and accessories."
    },
    {
        id: 5,
        name: "Wireless Mouse",
        price: 699,
        icon: "🖱️",
        description: "Smooth and reliable wireless mouse for everyday use."
    },
    {
        id: 6,
        name: "Mechanical Keyboard",
        price: 1999,
        icon: "⌨️",
        description: "Responsive keyboard designed for work and gaming."
    }
];

let cart = [];

// Get HTML elements
const productContainer = document.getElementById("productContainer");
const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCartButton = document.getElementById("closeCartButton");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const overlay = document.getElementById("overlay");

const checkoutModal = document.getElementById("checkoutModal");
const closeModalButton = document.getElementById("closeModalButton");
const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const confirmOrderButton = document.getElementById("confirmOrderButton");


// Dynamically display products
function displayProducts() {
    productContainer.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-icon">${product.icon}</div>

            <h3>${product.name}</h3>

            <p class="product-description">
                ${product.description}
            </p>

            <div class="product-bottom">
                <span class="product-price">₹${product.price}</span>

                <button
                    class="add-cart-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>
            </div>
        `;

        productContainer.appendChild(card);
    });
}


// Add product to cart
function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const product = products.find(product => product.id === productId);

        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}


// Update cart
function updateCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            `<p class="empty-cart">Your cart is empty.</p>`;
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement("div");

            itemElement.className = "cart-item";

            itemElement.innerHTML = `
                <div class="cart-item-top">
                    <strong>${item.name}</strong>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>
                </div>

                <p>
                    ₹${item.price} × ${item.quantity}
                    = ₹${item.price * item.quantity}
                </p>
            `;

            cartItems.appendChild(itemElement);
        });
    }

    // Calculate total number of items
    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Calculate total price
    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
}


// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    updateCart();
}


// Open cart
cartButton.addEventListener("click", () => {
    cartPanel.classList.add("open");
    overlay.classList.add("show");
});


// Close cart
closeCartButton.addEventListener("click", closeCart);


// Overlay click
overlay.addEventListener("click", () => {
    closeCart();
    closeCheckoutModal();
});


function closeCart() {
    cartPanel.classList.remove("open");

    if (!checkoutModal.classList.contains("show")) {
        overlay.classList.remove("show");
    }
}


// Checkout button
checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add a product first.");
        return;
    }

    showCheckoutPreview();
});


// Checkout preview modal
function showCheckoutPreview() {
    checkoutItems.innerHTML = "";

    cart.forEach(item => {
        const checkoutItem = document.createElement("div");

        checkoutItem.className = "checkout-item";

        checkoutItem.innerHTML = `
            <span>${item.name} × ${item.quantity}</span>
            <strong>₹${item.price * item.quantity}</strong>
        `;

        checkoutItems.appendChild(checkoutItem);
    });

    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    checkoutTotal.textContent = totalPrice;

    cartPanel.classList.remove("open");
    checkoutModal.classList.add("show");
    overlay.classList.add("show");
}


// Close checkout modal
closeModalButton.addEventListener("click", closeCheckoutModal);

function closeCheckoutModal() {
    checkoutModal.classList.remove("show");
    overlay.classList.remove("show");
}


// Confirm order
confirmOrderButton.addEventListener("click", () => {
    alert("Order confirmed! Thank you for shopping with ShopEase.");

    cart = [];

    updateCart();
    closeCheckoutModal();
});


// Display products when page loads
displayProducts();
updateCart();