import {
    createUser,
    getUsers
} from "./service/userService.js";

import {
    validateUser
} from "../exception/validationException.js";

import {
    getErrorMessage
} from "../exception/apiException.js";


const registerForm =
    document.getElementById(
        "registerForm"
    );


registerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


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


        const user = {

            name,
            email,
            password,

            role: "customer"

        };


        try {

            /* VALIDATE */

            validateUser(user);


            /* CHECK EXISTING USERS */

            const users =
                await getUsers();


            const existingUser =
                users.find(
                    existing =>
                        existing.email
                            .toLowerCase() ===
                        email
                );


            if (existingUser) {

                throw new Error(
                    "An account with this email already exists."
                );

            }


            /* CREATE USER */

            await createUser(user);


            alert(
                "Account created successfully!"
            );


            /* REDIRECT */

            window.location.href =
                "login.html";

        }
        catch (error) {

            console.error(
                "Registration error:",
                error
            );


            alert(
                getErrorMessage(error)
            );

        }

    }
);