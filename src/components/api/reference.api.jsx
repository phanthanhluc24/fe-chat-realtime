import React from "react";
import { URL_FETCH } from "../../config/Index";

export const referenceUser =async () => {
  try {
    const response=await fetch(`${URL_FETCH}user/references`,{
        method:"GET"
    })
    return response.json()
  } catch (error) {
    console.log(error);
  }
};
