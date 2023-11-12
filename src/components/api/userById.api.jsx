import React from 'react'
import { URL_FETCH } from "../../config/Index";

export const userById= async (id) => {
    try {
        const response=await fetch(`${URL_FETCH}user/${id}`,{
            method:"GET"
        })
        return response.json()
    } catch (error) {
        console.log(error);
    }
}
