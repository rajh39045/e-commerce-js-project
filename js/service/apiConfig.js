import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm";


export const API_BASE_URL =
    "http://localhost:3000";


export const api = axios.create({

    baseURL: API_BASE_URL,

    headers: {
        "Content-Type": "application/json"
    }

});