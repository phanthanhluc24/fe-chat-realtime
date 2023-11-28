import React, { useEffect, useState } from "react";

export const References = ({ references, currentId,setUserChat }) => {
  const referencesUser = references.filter((item) => item._id !== currentId);
  return (
    <>
      {referencesUser.map((item, index) => (
        <div key={index} className="blog-user">
          <div className="bg-color" onClick={()=>setUserChat(item._id)}>
            <img src="" alt="" className="user-image" />
            <h5 className="user-name">{item.user_name}</h5>
          </div>
        </div>
      ))}
    </>
  );
};
