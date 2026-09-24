/* =========================================================
   AUTHENTICATION UTILITIES
========================================================= */


/* =========================
   GET LOGGED-IN USER
========================= */

export function getLoggedInUser() {

    const user =
        localStorage.getItem(
            "loggedInUser"
        );


    if (!user) {
        return null;
    }


    try {

        return JSON.parse(user);

    }
    catch (error) {

        console.error(
            "Invalid logged-in user data:",
            error
        );

        localStorage.removeItem(
            "loggedInUser"
        );

        return null;

    }

}


/* =========================
   CHECK LOGIN
========================= */

export function isLoggedIn() {

    return getLoggedInUser() !== null;

}


/* =========================
   LOGOUT
========================= */

export function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "login.html";

}


/* =========================
   UPDATE NAVBAR
========================= */

export function updateNavbar() {

    const user =
        getLoggedInUser();


    const navLinks =
        document.querySelector(
            ".nav-links"
        );


    if (!navLinks) {
        return;
    }


    /* =========================
       UPDATE LOGIN
    ========================= */

    const loginLink =
        navLinks.querySelector(
            'a[href="login.html"]'
        );


    if (!user) {

        return;

    }


    /* =========================
       REMOVE LOGIN LINK
    ========================= */

    if (loginLink) {

        loginLink.remove();

    }


    /* =========================
       CHECK EXISTING USER MENU
    ========================= */

    const existingUser =
        document.getElementById(
            "userMenu"
        );


    if (existingUser) {

        return;

    }


    /* =========================
       USER NAME
    ========================= */

    const userLink =
        document.createElement(
            "span"
        );


    userLink.id =
        "userMenu";

    userLink.className =
        "user-menu";

    userLink.innerHTML = `
        👤 ${user.name}
    `;


    /* =========================
       LOGOUT BUTTON
    ========================= */

    const logoutButton =
        document.createElement(
            "button"
        );


    logoutButton.id =
        "logoutBtn";

    logoutButton.className =
        "logout-btn";

    logoutButton.textContent =
        "Logout";


    logoutButton.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {
                return;
            }


            logout();

        }
    );


    navLinks.appendChild(
        userLink
    );

    navLinks.appendChild(
        logoutButton
    );

}


/* =========================
   UPDATE CART BADGE
========================= */

export function updateCartBadge() {

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


    const badge =
        document.querySelector(
            ".cart-badge"
        );


    if (badge) {

        badge.textContent =
            totalQuantity;

    }

}