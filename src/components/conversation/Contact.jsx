import React, { useEffect, useState } from 'react'
import { listUserChat } from '../api/listUserChat.api'

export const Contact = ({currentId,listUser,setUserChat}) => {
        const [listChatWith,setListChatWith]=useState([])
        useEffect(()=>{
            const idPartner=listUser.users.find((id)=>id!==currentId)
            listUserChat(idPartner)
            .then((res)=>{
                setListChatWith(res)
            })
            .catch((error)=>{
                console.log(error);
            })

        },[currentId,listUser])
  return (
    <div>
        {listChatWith.map((item, index) => (
        <div key={index} className="blog-user">
          <div className="bg-color" onClick={()=>setUserChat(item._id)}>
            <img src="" alt="" className="user-image" />
            <h5 className="user-name">{item.user_name}</h5>
          </div>
        </div>
      ))}
    </div>
  )
}
