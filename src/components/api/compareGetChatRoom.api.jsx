import React from 'react'
import { URL_FETCH } from "../../config/Index";
export const compareGetChatRoom= async(senderId,receivedId) => {
    try {
        const response=await fetch(`${URL_FETCH}member/${senderId}/${receivedId}`,{
            method:"GET"
        })
        return response.json()
    } catch (error) {
        console.log(error);
    }
}
