import React from 'react'
import { URL_FETCH } from "../../config/Index";
export const getConversationWith=async (id) => {
    try {
        const response=await fetch(`${URL_FETCH}message/get-conversation-with/${id}`,{
            method:"GET"
        })
        return response.json()
    } catch (error) {
        console.error(error)
    }
}
