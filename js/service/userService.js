import { api } from "./apiConfig.js";

import {
    handleApiError
} from "../../exception/apiException.js";


/* =========================
   GET ALL USERS
========================= */

export async function getUsers() {

    try {

        const response =
            await api.get("/users");

        return response.data;

    }
    catch (error) {

        throw handleApiError(error);

    }

}


/* =========================
   GET USER BY ID
========================= */

export async function getUserById(id) {

    try {

        const response =
            await api.get(`/users/${id}`);

        return response.data;

    }
    catch (error) {

        throw handleApiError(error);

    }

}


/* =========================
   CREATE USER
========================= */

export async function createUser(user) {

    try {

        const response =
            await api.post(
                "/users",
                user
            );

        return response.data;

    }
    catch (error) {

        throw handleApiError(error);

    }

}


/* =========================
   LOGIN USER
========================= */

export async function loginUser(
    email,
    password
) {

    try {

        const response =
            await api.get("/users");

        const users =
            response.data;


        const user =
            users.find(
                item => {

                    const storedEmail =
                        String(
                            item.email
                        )
                            .trim()
                            .toLowerCase();


                    const enteredEmail =
                        String(
                            email
                        )
                            .trim()
                            .toLowerCase();


                    const storedPassword =
                        String(
                            item.password
                        );


                    const enteredPassword =
                        String(
                            password
                        );


                    return (
                        storedEmail ===
                        enteredEmail
                        &&
                        storedPassword ===
                        enteredPassword
                    );

                }
            );


        return user || null;

    }
    catch (error) {

        throw handleApiError(error);

    }

}