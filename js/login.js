import {
    loginUser
} from "./service/userService.js";

import {
    getErrorMessage
} from "../exception/apiException.js";

import {
    ValidationException
} from "../exception/validationException.js";


/* =========================
   LOGIN FORM
========================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


/* =========================
   LOGIN
========================= */

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        /* =========================
           GET INPUT VALUES
        ========================= */

        const email =
            document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();


        const password =
            document
                .getElementById("password")
                .value;


        try {

            /* =========================
               VALIDATION
            ========================= */

            if (email === "") {

                throw new ValidationException(
                    "Email is required."
                );

            }


            if (password === "") {

                throw new ValidationException(
                    "Password is required."
                );

            }


            /* =========================
               LOGIN
            ========================= */

            const user =
                await loginUser(
                    email,
                    password
                );


            /* =========================
               CHECK USER
            ========================= */

            if (!user) {

                throw new ValidationException(
                    "Invalid email or password."
                );

            }


            /* =========================
               SAVE LOGGED-IN USER
            ========================= */

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                })
            );


            /* =========================
               SUCCESS
            ========================= */

            alert(
                `Welcome, ${user.name}!`
            );


            /* =========================
               REDIRECT
            ========================= */

            window.location.href =
                "products.html";

        }
        catch (error) {

            console.error(
                "Login error:",
                error
            );


            alert(
                getErrorMessage(error)
            );

        }

    }
);