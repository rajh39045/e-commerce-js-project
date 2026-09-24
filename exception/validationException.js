export class ValidationException
    extends Error {

    constructor(message) {

        super(message);

        this.name =
            "ValidationException";

    }

}


/* =========================
   PRODUCT VALIDATION
========================= */

export function validateProduct(
    product
) {

    if (
        typeof product.name !==
        "string"
    ) {

        throw new ValidationException(
            "Product name must be a string."
        );

    }


    if (
        product.name.trim() === ""
    ) {

        throw new ValidationException(
            "Product name is required."
        );

    }


    if (
        !product.name.match(
            /[a-zA-Z]/
        )
    ) {

        throw new ValidationException(
            "Product name must contain at least one letter."
        );

    }


    if (
        typeof product.price !==
        "number" ||
        Number.isNaN(product.price)
    ) {

        throw new ValidationException(
            "Price must be a number."
        );

    }


    if (product.price < 0) {

        throw new ValidationException(
            "Price cannot be negative."
        );

    }


    if (
        typeof product.category !==
        "string"
    ) {

        throw new ValidationException(
            "Category must be a string."
        );

    }


    if (
        product.category.trim() === ""
    ) {

        throw new ValidationException(
            "Category is required."
        );

    }


    if (
        typeof product.stock !==
        "number" ||
        Number.isNaN(product.stock)
    ) {

        throw new ValidationException(
            "Stock must be a number."
        );

    }


    if (product.stock < 0) {

        throw new ValidationException(
            "Stock cannot be negative."
        );

    }


    if (
        typeof product.rating !==
        "number" ||
        Number.isNaN(product.rating)
    ) {

        throw new ValidationException(
            "Rating must be a number."
        );

    }


    if (
        product.rating < 0 ||
        product.rating > 5
    ) {

        throw new ValidationException(
            "Rating must be between 0 and 5."
        );

    }

}


/* =========================
   USER VALIDATION
========================= */

export function validateUser(
    user
) {

    if (
        typeof user.name !==
        "string" ||
        user.name.trim() === ""
    ) {

        throw new ValidationException(
            "Name is required."
        );

    }


    if (
        !user.name.match(
            /[a-zA-Z]/
        )
    ) {

        throw new ValidationException(
            "Name must contain at least one letter."
        );

    }


    if (
        typeof user.email !==
        "string" ||
        user.email.trim() === ""
    ) {

        throw new ValidationException(
            "Email is required."
        );

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailPattern.test(
            user.email
        )
    ) {

        throw new ValidationException(
            "Please enter a valid email."
        );

    }


    if (
        typeof user.password !==
        "string" ||
        user.password.length < 6
    ) {

        throw new ValidationException(
            "Password must contain at least 6 characters."
        );

    }

}