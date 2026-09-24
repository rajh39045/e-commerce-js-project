import { api } from "./apiConfig.js";

import {
    handleApiError
} from "../../exception/apiException.js";


// ========================================
// GET ALL PRODUCTS
// ========================================

export async function getProducts() {

    try {

        const response =
            await api.get("/products");

        return response.data;

    }

    catch (error) {

        throw handleApiError(error);

    }

}


// ========================================
// GET PRODUCT BY ID
// ========================================

export async function getProductById(id) {

    try {

        const response =
            await api.get(`/products/${id}`);

        return response.data;

    }

    catch (error) {

        throw handleApiError(error);

    }

}


// ========================================
// CREATE PRODUCT
// ========================================

export async function createProduct(product) {

    try {
        let flag = false;
        const data = await api.get("/products");
        console.log(data);
        for(let item of  data.data){
            if(item.name===(product.name)) {
                flag = true;
                alert("Already exist product ")
            }
            
        }
        if(!flag){
            const response =
            await api.post(
                "/products",
                product
            );


        return response.data;
        }
        

    }

    catch (error) {

        throw handleApiError(error);

    }

}


// ========================================
// UPDATE PRODUCT
// ========================================

export async function updateProduct(
    id,
    product
) {

    try {

        const response =
            await api.put(
                `/products/${id}`,
                product
            );

        return response.data;

    }

    catch (error) {

        throw handleApiError(error);

    }

}


// ========================================
// DELETE PRODUCT
// ========================================

export async function deleteProduct(id) {

    try {

        const response =
            await api.delete(
                `/products/${id}`
            );

        return response.data;

    }

    catch (error) {

        throw handleApiError(error);

    }

}