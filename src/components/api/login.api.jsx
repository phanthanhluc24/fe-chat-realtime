import React from 'react'
import { URL_FETCH } from "../../config/Index";
export const userLogin =async (data) => {
    try {
        const response = await fetch(`${URL_FETCH}user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        return await response.json();
      } catch (error) {
        console.log(error);
      }
};
