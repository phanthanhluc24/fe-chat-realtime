import React, { useEffect, useState } from 'react'
import { listUserChat } from '../api/listUserChat.api'

export const Contact = ({currentId,listUser,setUserChat,onlineUser,socket,setContactUsers}) => {
        const [listChatWith,setListChatWith]=useState([])
        // const [online,setOnline]=useState()
        useEffect(()=>{
            const idPartner=listUser.users.find((id)=>id!==currentId)
            // const online=onlineUser.find((user)=>user.receivedId===idPartner)
            // setOnline(online)
            listUserChat(idPartner)
            .then((res)=>{
                setListChatWith(res)
            })
            .catch((error)=>{
                console.log(error);
            })

        },[currentId,listUser])

        // get new user chatting with current user 
        // useEffect(()=>{
        //   socket.on("new-user-chatting",(data)=>{
        //     // console.log(data);
        //     if (listChatWith && listChatWith.some(item => item._id !== data[1])) {
        //       console.log("New user ",data[1]);
        //       listUserChat(data[1])
        //     }
        //   })
        // },[currentId,listUser])
  return (
    <div>
        {listChatWith.map((item, index) => (
        <div key={index} className="blog-user">
          <div className="bg-color" onClick={()=>setUserChat(item._id)}>
            <img src="" alt="" className="user-image" />
            <h5 className="user-name">{item.user_name}</h5>
            {/* <span>{online?"online":"offline"}</span> */}
          </div>
        </div>
      ))}
    </div>
  )
}
