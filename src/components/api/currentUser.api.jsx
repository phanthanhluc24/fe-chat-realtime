import React from 'react'
import Cookies from 'js-cookie'
import { URL_FETCH } from "../../config/Index";
export const currentUser = async() => {
   const token=Cookies.get("token")
   if (token) {
       const headers={
        Authorization:`Bearer ${token}`
       }
    const response=await fetch(`${URL_FETCH}user/currentUser`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            ...headers
        }
       })
       return response.json()
   }
 
}
