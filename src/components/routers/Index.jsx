import React from "react";
import { Login } from "../auth/Login";
import { Chat } from "../conversation/Chat";

export const Index = () => [
  {
    path: "/",
    element: <Login />,
  },
  {
    path:"conversation",
    element:<Chat/>
  }
];
