import React from 'react'
import { URL_FETCH } from "../../config/Index";
export const listUserChat = async(id) => {
  try {
    const response=await fetch(`${URL_FETCH}user/list-user-was-chat/${id}`,{
        method:"GET"
    })
    return response.json()
  } catch (error) {
    console.log(error);
  }
}
