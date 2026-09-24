export class ApiException extends Error {

    constructor(message, status = 0) {

        super(message);

        this.name = "ApiException";

        this.status = status;
    }
}


// Handle Axios/API errors

export function handleApiError(error) {

    // Server responded with an error

    if (error.response) {

        return new ApiException(
            `API Error: ${error.response.status}`,
            error.response.status
        );

    }


    // Request was sent but server didn't respond

    if (error.request) {

        return new ApiException(
            "Cannot connect to server. Please start JSON Server.",
            0
        );

    }


    // Other errors

    return new ApiException(
        error.message || "Something went wrong.",
        0
    );

}


// Get error message for UI

export function getErrorMessage(error) {

    if (error && error.message) {

        return error.message;

    }

    return "Something went wrong. Please try again.";

}