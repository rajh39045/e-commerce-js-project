import {
    getProductById
} from "./service/productService.js";

import {
    getErrorMessage
} from "../exception/apiException.js";


/* =========================
   DOM ELEMENT
========================= */

const productDetails =
    document.getElementById(
        "productDetails"
    );


/* =========================
   GET PRODUCT ID
========================= */

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const productId =
    urlParams.get("id");


/* =========================
   LOAD PRODUCT
========================= */

async function loadProduct() {

    try {

        if (!productId) {

            throw new Error(
                "Product ID is missing."
            );

        }


        const product =
            await getProductById(
                productId
            );


        renderProduct(product);

    }
    catch (error) {

        console.error(
            "Error loading product:",
            error
        );


        productDetails.innerHTML = `

            <div class="details-error">

                <div class="error-icon">
                    ⚠
                </div>

                <h2>
                    Product Not Found
                </h2>

                <p>
                    ${getErrorMessage(error)}
                </p>

                <a
                    href="products.html"
                    class="primary-btn"
                >
                    Back to Products
                </a>

            </div>

        `;
    }
}


/* =========================
   RENDER PRODUCT
========================= */

function renderProduct(product) {

    productDetails.innerHTML = `

        <div class="details-image-section">

            <div class="details-image-wrapper">

                <img
                    src="${
                        product.image ||
                        "https://via.placeholder.com/600"
                    }"
                    alt="${product.name}"
                    class="details-image"
                >

            </div>

        </div>


        <div class="details-content">

            <span class="details-category">
                ${product.category}
            </span>


            <h1>
                ${product.name}
            </h1>


            <div class="details-rating">

                <span class="stars">
                    ⭐ ${product.rating}
                </span>

                <span>
                    Customer Rating
                </span>

            </div>


            <div class="details-price">
                ₹${product.price}
            </div>


            <div class="details-stock">

                ${
                    Number(product.stock) > 0
                    ? `
                        <span class="stock-dot"></span>
                        In Stock
                        (${product.stock} available)
                    `
                    : `
                        <span class="stock-dot out"></span>
                        Out of Stock
                    `
                }

            </div>


            <div class="details-divider"></div>


            <h3>
                Description
            </h3>


            <p class="details-description">
                ${
                    product.description ||
                    "No description available."
                }
            </p>


            ${
                Number(product.stock) > 0
                ? `

                    <div class="quantity-section">

                        <label>
                            Quantity
                        </label>

                        <div class="quantity-control">

                            <button
                                id="decreaseQty"
                                type="button"
                            >
                                −
                            </button>

                            <span id="quantity">
                                1
                            </span>

                            <button
                                id="increaseQty"
                                type="button"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        id="addToCartBtn"
                        class="add-cart-btn"
                    >
                        🛒 Add to Cart
                    </button>

                `
                : `

                    <button
                        class="add-cart-btn disabled-btn"
                        disabled
                    >
                        Out of Stock
                    </button>

                `
            }

        </div>

    `;


    setupQuantity(product);

}


/* =========================
   QUANTITY
========================= */

function setupQuantity(product) {

    const decreaseBtn =
        document.getElementById(
            "decreaseQty"
        );

    const increaseBtn =
        document.getElementById(
            "increaseQty"
        );

    const quantityElement =
        document.getElementById(
            "quantity"
        );


    if (
        !decreaseBtn ||
        !increaseBtn ||
        !quantityElement
    ) {

        return;

    }


    let quantity = 1;


    /* DECREASE */

    decreaseBtn.addEventListener(
        "click",
        function () {

            if (quantity > 1) {

                quantity--;

                quantityElement.textContent =
                    quantity;

            }

        }
    );


    /* INCREASE */

    increaseBtn.addEventListener(
        "click",
        function () {

            if (
                quantity <
                Number(product.stock)
            ) {

                quantity++;

                quantityElement.textContent =
                    quantity;

            }

        }
    );


    /* ADD TO CART */

    const addToCartBtn =
        document.getElementById(
            "addToCartBtn"
        );


    addToCartBtn.addEventListener(
        "click",
        function () {

            addToCart(
                product,
                quantity
            );

        }
    );

}


/* =========================
   ADD TO CART
========================= */

function addToCart(
    product,
    quantity
) {

    let cart =
        JSON.parse(
            localStorage.getItem(
                "cart"
            )
        ) || [];


    const existingProduct =
        cart.find(
            item =>
                String(item.id) ===
                String(product.id)
        );


    if (existingProduct) {

        existingProduct.quantity +=
            quantity;

    }
    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(
                product.price
            ),

            image: product.image,

            quantity: quantity

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartBadge();


    alert(
        "Product added to cart!"
    );

}


/* =========================
   CART BADGE
========================= */

function updateCartBadge() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "cart"
            )
        ) || [];


    const totalQuantity =
        cart.reduce(
            (
                total,
                item
            ) =>
                total +
                Number(item.quantity),
            0
        );


    const cartBadge =
        document.querySelector(
            ".cart-badge"
        );


    if (cartBadge) {

        cartBadge.textContent =
            totalQuantity;

    }

}


/* =========================
   INITIAL LOAD
========================= */

loadProduct();

updateCartBadge();