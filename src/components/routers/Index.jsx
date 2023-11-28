import React from "react";
import { Login } from "../auth/Login";
import { Chat } from "../conversation/Chat";
import { Selects } from "../demo/Select";

export const Index = () => [
  {
    path: "/",
    element: <Login />,
  },
  {
    path:"conversation",
    element:<Chat/>
  },{
    path:"select",
    element:<Selects/>
  }
];
