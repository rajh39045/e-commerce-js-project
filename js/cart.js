/* =========================================================
   CART PAGE
========================================================= */


/* =========================
   DOM ELEMENTS
========================= */

const cartItems =
    document.getElementById(
        "cartItems"
    );

const subtotalElement =
    document.getElementById(
        "subtotal"
    );

const totalElement =
    document.getElementById(
        "total"
    );

const summaryCount =
    document.getElementById(
        "summaryCount"
    );

const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


/* =========================
   GET CART
========================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem(
            "cart"
        )
    ) || [];

}


/* =========================
   SAVE CART
========================= */

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/* =========================
   CART BADGE
========================= */

function updateCartBadge() {

    const cart =
        getCart();


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


    const badge =
        document.querySelector(
            ".cart-badge"
        );


    if (badge) {

        badge.textContent =
            totalQuantity;

    }

}


/* =========================
   RENDER CART
========================= */

function renderCart() {

    const cart =
        getCart();


    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Looks like you haven't
                    added anything yet.
                </p>

                <a
                    href="products.html"
                    class="primary-btn"
                >
                    Start Shopping
                </a>

            </div>

        `;


        subtotalElement.textContent =
            "₹0";

        totalElement.textContent =
            "₹0";

        summaryCount.textContent =
            "0 items";

        checkoutBtn.disabled =
            true;

        return;
    }


    /* ENABLE CHECKOUT */

    checkoutBtn.disabled =
        false;


    cartItems.innerHTML = "";


    /* TOTALS */

    let subtotal = 0;

    let totalQuantity = 0;


    /* CREATE ITEMS */

    cart.forEach(
        (
            item,
            index
        ) => {

            const price =
                Number(item.price);

            const quantity =
                Number(item.quantity);

            const itemTotal =
                price * quantity;


            subtotal +=
                itemTotal;

            totalQuantity +=
                quantity;


            const itemElement =
                document.createElement(
                    "div"
                );


            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <div class="cart-product">

                    <img
                        src="${
                            item.image ||
                            "https://via.placeholder.com/150"
                        }"
                        alt="${item.name}"
                    >

                    <div class="cart-product-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ₹${price}
                            per item
                        </p>

                    </div>

                </div>


                <div class="cart-quantity">

                    <button
                        class="quantity-btn decrease-btn"
                        data-index="${index}"
                    >
                        −
                    </button>

                    <span>
                        ${quantity}
                    </span>

                    <button
                        class="quantity-btn increase-btn"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>


                <div class="cart-item-total">

                    <strong>
                        ₹${itemTotal}
                    </strong>

                </div>


                <button
                    class="remove-btn"
                    data-index="${index}"
                    title="Remove product"
                >
                    ×
                </button>

            `;


            cartItems.appendChild(
                itemElement
            );

        }
    );


    /* UPDATE SUMMARY */

    subtotalElement.textContent =
        `₹${subtotal}`;


    totalElement.textContent =
        `₹${subtotal}`;


    summaryCount.textContent =
        `${totalQuantity} ${
            totalQuantity === 1
                ? "item"
                : "items"
        }`;

}


/* =========================
   CART ACTIONS
========================= */

cartItems.addEventListener(
    "click",
    function (event) {

        const index =
            event.target.dataset.index;


        if (index === undefined) {

            return;

        }


        const cart =
            getCart();


        /* =====================
           DECREASE
        ===================== */

        if (
            event.target.classList.contains(
                "decrease-btn"
            )
        ) {

            if (
                cart[index].quantity > 1
            ) {

                cart[index].quantity--;

            }
            else {

                cart.splice(
                    index,
                    1
                );

            }

        }


        /* =====================
           INCREASE
        ===================== */

        if (
            event.target.classList.contains(
                "increase-btn"
            )
        ) {

            cart[index].quantity++;

        }


        /* =====================
           REMOVE
        ===================== */

        if (
            event.target.classList.contains(
                "remove-btn"
            )
        ) {

            cart.splice(
                index,
                1
            );

        }


        saveCart(cart);

        renderCart();

        updateCartBadge();

    }
);


/* =========================
   CHECKOUT
========================= */

checkoutBtn.addEventListener(
    "click",
    function () {

        const cart =
            getCart();


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        alert(
            "Checkout feature coming next!"
        );

    }
);


/* =========================
   INITIAL LOAD
========================= */

renderCart();

updateCartBadge();