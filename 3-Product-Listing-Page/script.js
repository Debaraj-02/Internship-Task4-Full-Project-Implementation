// Product Data

const products = [

{
    id: 1,
    name: "HP Victus",
    category: "Laptop",
    price: 64999,
    rating: 4.7,
    image: "images/laptop.jpg",
    badge: "-20%",
    stock: true
},

{
    id: 2,
    name: "MacBook Air",
    category: "Laptop",
    price: 94999,
    rating: 4.9,
    image: "images/macbook.jpg",
    badge: "NEW",
    stock: true
},

{
    id: 3,
    name: "Samsung Galaxy S25",
    category: "Mobile",
    price: 79999,
    rating: 4.8,
    image: "images/samsung.jpg",
    badge: "HOT",
    stock: true
},

{
    id: 4,
    name: "iPhone 17",
    category: "Mobile",
    price: 89999,
    rating: 4.9,
    image: "images/iphone.jpg",
    badge: "NEW",
    stock: true
},

{
    id: 5,
    name: "Sony Headphones",
    category: "Accessories",
    price: 9999,
    rating: 4.6,
    image: "images/headphones.jpg",
    badge: "-15%",
    stock: true
},

{
    id: 6,
    name: "Logitech Mouse",
    category: "Accessories",
    price: 1999,
    rating: 4.5,
    image: "images/mouse.jpg",
    badge: "SALE",
    stock: true
},

{
    id: 7,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 3999,
    rating: 4.7,
    image: "images/keyboard.jpg",
    badge: "HOT",
    stock: true
},

{
    id: 8,
    name: "JBL Speaker",
    category: "Accessories",
    price: 4999,
    rating: 4.4,
    image: "images/speaker.jpg",
    badge: "-10%",
    stock: true
},

{
    id: 9,
    name: "Apple Watch",
    category: "Wearables",
    price: 29999,
    rating: 4.8,
    image: "images/watch.jpg",
    badge: "NEW",
    stock: true
},

{
    id: 10,
    name: "Noise Smartwatch",
    category: "Wearables",
    price: 3999,
    rating: 4.3,
    image: "images/noise.jpg",
    badge: "HOT",
    stock: true
},

{
    id: 11,
    name: "Canon EOS",
    category: "Camera",
    price: 55999,
    rating: 4.7,
    image: "images/camera.jpg",
    badge: "NEW",
    stock: false
},

{
    id: 12,
    name: "PlayStation Controller",
    category: "Gaming",
    price: 5499,
    rating: 4.8,
    image: "images/controller.jpg",
    badge: "HOT",
    stock: true
}

];

// ==============================
// DOM Elements
// ==============================

const container = document.getElementById("productContainer");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");

const sortProducts = document.getElementById("sortProducts");

const productCount = document.getElementById("productCount");

const cartCount = document.getElementById("cartCount");

// ==============================
// Variables
// ==============================

let cart = 0;

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

// ==============================
// Star Rating Function
// ==============================

function stars(rating) {

    let output = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= Math.round(rating)) {

            output +=
            '<i class="fa-solid fa-star"></i>';

        } else {

            output +=
            '<i class="fa-regular fa-star"></i>';

        }

    }

    return output;

}

// ==============================
// Display Products
// ==============================

function renderProducts(productList) {

    container.innerHTML = "";

    productCount.textContent = productList.length;

    productList.forEach(product => {

        const favorite =
        wishlist.includes(product.id);

        container.innerHTML += `

        <div class="product-card">

            <span class="badge">
                ${product.badge}
            </span>

            <div
            class="wishlist"
            data-id="${product.id}">

                <i class="${
                    favorite
                    ? "fa-solid"
                    : "fa-regular"
                } fa-heart"></i>

            </div>

            <img
            src="${product.image}"
            alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">

                    ${product.category}

                </p>

                <p class="price">

                    ₹${product.price.toLocaleString()}

                </p>

                <div class="rating">

                    ${stars(product.rating)}

                    (${product.rating})

                </div>

                <p class="stock
                ${
                    product.stock
                    ? "in-stock"
                    : "out-stock"
                }">

                ${
                    product.stock
                    ? "In Stock"
                    : "Out of Stock"
                }

                </p>

                <div class="card-buttons">

                    <button
                    class="cart-btn"
                    data-cart="${product.id}">

                        Add to Cart

                    </button>

                    <button
                    class="buy-btn">

                        Buy Now

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    bindEvents();
// ==============================
// Wishlist & Cart Events
// ==============================

function bindEvents() {

    // Wishlist

    document.querySelectorAll(".wishlist").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            if (wishlist.includes(id)) {

                wishlist = wishlist.filter(item => item !== id);

            } else {

                wishlist.push(id);

            }

            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );

            applyFilters();

        });

    });

    // Add To Cart

    document.querySelectorAll(".cart-btn").forEach(button => {

        button.addEventListener("click", () => {

            cart++;

            cartCount.textContent = cart;

            button.innerHTML = "Added ✓";

            button.disabled = true;

            button.style.background = "#16a34a";

        });

    });

}

// ==============================
// Search, Filter & Sort
// ==============================

function applyFilters() {

    let filteredProducts = [...products];

    // Search

    const searchText =
        searchInput.value.toLowerCase();

    if (searchText !== "") {

        filteredProducts = filteredProducts.filter(product =>

            product.name
            .toLowerCase()
            .includes(searchText)

            ||

            product.category
            .toLowerCase()
            .includes(searchText)

        );

    }

    // Category Filter

    if (categoryFilter.value !== "all") {

        filteredProducts =
        filteredProducts.filter(product =>

            product.category ===
            categoryFilter.value

        );

    }

    // Sorting

    switch (sortProducts.value) {

        case "low-high":

            filteredProducts.sort(

                (a, b) => a.price - b.price

            );

            break;

        case "high-low":

            filteredProducts.sort(

                (a, b) => b.price - a.price

            );

            break;

        case "rating":

            filteredProducts.sort(

                (a, b) => b.rating - a.rating

            );

            break;

        case "az":

            filteredProducts.sort(

                (a, b) =>

                a.name.localeCompare(b.name)

            );

            break;

        case "za":

            filteredProducts.sort(

                (a, b) =>

                b.name.localeCompare(a.name)

            );

            break;

        default:

            break;

    }

    renderProducts(filteredProducts);

}

// ==============================
// Event Listeners
// ==============================

searchInput.addEventListener(

    "input",

    applyFilters

);

categoryFilter.addEventListener(

    "change",

    applyFilters

);

sortProducts.addEventListener(

    "change",

    applyFilters

);

// ==============================
// Initial Load
// ==============================

renderProducts(products);
}
