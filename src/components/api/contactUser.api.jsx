import React from 'react'
import { URL_FETCH } from "../../config/Index";
export const contactUser =async (id) => {
    try {
      const response=await fetch(`${URL_FETCH}member/${id}`,{
        method:"GET"
      })
      return response.json()
    } catch (error) {
      console.log(error);
    }
}
