import React from 'react'
import { URL_FETCH } from "../../config/Index";
export const chatWith =async (message) => {
    try {
        const response=await fetch(`${URL_FETCH}message/chat-with`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(message)
        })
        return response.json()
    } catch (error) {
        console.log(error);
    }
}
