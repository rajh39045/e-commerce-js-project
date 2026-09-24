import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "./service/productService.js";

import {
    validateProduct
} from "../exception/validationException.js";

import {
    getErrorMessage
} from "../exception/apiException.js";


/* =========================
   DOM ELEMENTS
========================= */

const productForm =
    document.getElementById("productForm");

const productList =
    document.getElementById("productList");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortPrice =
    document.getElementById("sortPrice");

const productCount =
    document.getElementById("productCount");


/* =========================
   STATE
========================= */

let editProductId = null;

let allProducts = [];


/* =========================
   FORM ELEMENTS
========================= */

const nameInput =
    document.getElementById("name");

const priceInput =
    document.getElementById("price");

const categoryInput =
    document.getElementById("category");

const stockInput =
    document.getElementById("stock");

const ratingInput =
    document.getElementById("rating");

const imageInput =
    document.getElementById("image");

const descriptionInput =
    document.getElementById("description");


/* =========================
   FORM TITLE + BUTTON
========================= */

const formTitle =
    document.querySelector(
        ".product-form-card h2"
    );

const submitButton =
    document.querySelector(
        ".product-form-card button"
    );


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts() {

    let products = [...allProducts];


    /* SEARCH */

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    if (search !== "") {

        products =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(search)
            );
    }


    /* CATEGORY FILTER */

    const category =
        categoryFilter.value;

    if (category !== "") {

        products =
            products.filter(product =>
                product.category === category
            );
    }


    /* PRICE SORT */

    if (sortPrice.value === "low") {

        products.sort(
            (a, b) =>
                Number(a.price) -
                Number(b.price)
        );
    }


    if (sortPrice.value === "high") {

        products.sort(
            (a, b) =>
                Number(b.price) -
                Number(a.price)
        );
    }


    /* CLEAR OLD PRODUCTS */

    productList.innerHTML = "";


    /* NO PRODUCTS */

    if (products.length === 0) {

        productList.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>
                    Try changing your search
                    or filter.
                </p>
            </div>
        `;

        return;
    }


    /* CREATE PRODUCT CARDS */

    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `

            <img
                src="${
                    product.image ||
                    "https://via.placeholder.com/300"
                }"
                alt="${product.name}"
            >

            <div class="product-card-content">

                <h3>
                    ${product.name}
                </h3>

                <p class="product-price">
                    ₹${product.price}
                </p>

                <p>
                    <strong>
                        Category:
                    </strong>
                    ${product.category}
                </p>

                <p>
                    <strong>
                        Stock:
                    </strong>
                    ${product.stock}
                </p>

                <p>
                    <strong>
                        Rating:
                    </strong>
                    ⭐ ${product.rating}
                </p>

                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-actions">

                    <button
                        class="details-btn"
                        data-id="${product.id}"
                    >
                        View Details
                    </button>

                    <button
                        class="edit-btn"
                        data-id="${product.id}"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        data-id="${product.id}"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;


        productList.appendChild(card);

    });
}


/* =========================
   LOAD CATEGORIES
========================= */

function loadCategories() {

    const categories =
        [
            ...new Set(
                allProducts.map(
                    product =>
                        product.category
                )
            )
        ];


    categoryFilter.innerHTML = `
        <option value="">
            All Categories
        </option>
    `;


    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value =
            category;

        option.textContent =
            category;

        categoryFilter.appendChild(option);

    });
}


/* =========================
   LOAD PRODUCTS
========================= */

async function loadProducts() {

    try {

        allProducts =
            await getProducts();


        /* UPDATE COUNT */

        productCount.textContent =
            allProducts.length;


        /* LOAD CATEGORY */

        loadCategories();


        /* DISPLAY PRODUCTS */

        renderProducts();

    }
    catch (error) {

        console.error(
            "Error loading products:",
            error
        );


        alert(
            getErrorMessage(error)
        );
    }
}


/* =========================
   PRODUCT FORM
========================= */

productForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        /* GET FORM DATA */

        const product = {

            name:
                nameInput
                    .value
                    .trim(),

            price:
                Number(
                    priceInput.value
                ),

            category:
                categoryInput
                    .value
                    .trim(),

            stock:
                Number(
                    stockInput.value
                ),

            rating:
                Number(
                    ratingInput.value
                ),

            image:
                imageInput
                    .value
                    .trim(),

            description:
                descriptionInput
                    .value
                    .trim()
        };


        try {

            /* VALIDATE */

            validateProduct(product);


            /* UPDATE */

            if (
                editProductId !== null
            ) {

                await updateProduct(
                    editProductId,
                    product
                );


                alert(
                    "Product updated successfully!"
                );


                editProductId =
                    null;

            }

            /* CREATE */

            else {

                await createProduct(
                    product
                );


                alert(
                    "Product added successfully!"
                );
            }


            /* RESET FORM */

            productForm.reset();


            /* RESET FORM TITLE */

            formTitle.textContent =
                "Add Product";


            /* RESET BUTTON */

            submitButton.innerHTML =
                `
                    <span>+</span>
                    Add Product
                `;


            /* RELOAD PRODUCTS */

            await loadProducts();

        }
        catch (error) {

            console.error(
                "Product operation error:",
                error
            );


            alert(
                getErrorMessage(error)
            );
        }

    }
);


/* =========================
   PRODUCT ACTIONS
========================= */

productList.addEventListener(
    "click",
    async function (event) {

        const id =
            event.target.dataset.id;


        /* NO ID */

        if (!id) {
            return;
        }


        /* =========================
           VIEW DETAILS
        ========================= */

        if (
            event.target.classList.contains(
                "details-btn"
            )
        ) {

            window.location.href =
                `details.html?id=${id}`;

            return;
        }


        /* =========================
           EDIT PRODUCT
        ========================= */

        if (
            event.target.classList.contains(
                "edit-btn"
            )
        ) {

            try {

                const product =
                    await getProductById(id);


                /* FILL FORM */

                nameInput.value =
                    product.name;

                priceInput.value =
                    product.price;

                categoryInput.value =
                    product.category;

                stockInput.value =
                    product.stock;

                ratingInput.value =
                    product.rating;

                imageInput.value =
                    product.image;

                descriptionInput.value =
                    product.description;


                /* STORE ID */

                editProductId =
                    id;


                /* CHANGE FORM TITLE */

                formTitle.textContent =
                    "Update Product";


                /* CHANGE BUTTON */

                submitButton.innerHTML =
                    `
                        Update Product
                    `;


                /* SCROLL TO FORM */

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
            catch (error) {

                console.error(
                    "Error getting product:",
                    error
                );


                alert(
                    getErrorMessage(error)
                );
            }

            return;
        }


        /* =========================
           DELETE PRODUCT
        ========================= */

        if (
            event.target.classList.contains(
                "delete-btn"
            )
        ) {

            const confirmDelete =
                confirm(
                    "Are you sure you want to delete this product?"
                );


            if (!confirmDelete) {
                return;
            }


            try {

                await deleteProduct(id);


                alert(
                    "Product deleted successfully!"
                );


                await loadProducts();

            }
            catch (error) {

                console.error(
                    "Error deleting product:",
                    error
                );


                alert(
                    getErrorMessage(error)
                );
            }
        }

    }
);


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    renderProducts
);


/* =========================
   CATEGORY FILTER
========================= */

categoryFilter.addEventListener(
    "change",
    renderProducts
);


/* =========================
   PRICE SORT
========================= */

sortPrice.addEventListener(
    "change",
    renderProducts
);


/* =========================
   INITIAL LOAD
========================= */

loadProducts();