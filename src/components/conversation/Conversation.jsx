import React, { useEffect, useRef, useState } from 'react'
import { compareGetChatRoom } from '../api/compareGetChatRoom.api'
import { getConversationWith } from '../api/getConversationWith.api'
import {format} from "timeago.js"
import {io} from "socket.io-client"
const socket=io("http://localhost:5000")
export const Conversation = ({idCurrentUser,idPartner,updateMessage}) => {
  const [roomId,setRoomId]=useState({_id:""})
  // get roomId from sender and received
  useEffect(()=>{
    compareGetChatRoom(idCurrentUser,idPartner)
    .then((res)=>{
      setRoomId(res)
    })
    .catch((error)=>{
      console.error(error)
    })
  },[idCurrentUser,idPartner])

  //get message from chatId between sender and received
  const [messageConversation,setMessageConversation]=useState([])
  useEffect(()=>{
    const idToUse = roomId?._id ?? "768678678jkl576";
    getConversationWith(idToUse)
    .then((res)=>{
      setMessageConversation(res)
    })
    .catch((error)=>{
      console.error(error)
    })
  },[roomId])
  // received message from server
  useEffect(()=>{
    try {
      socket.on("received-message-from-server",(data)=>{
        console.log(data)
        setMessageConversation((preState)=>[...preState,data])
      })  
    } catch (error) {
      console.error(error)
    }
    return ()=>{
      socket.off("received-message-from-server")
    }
  },[])

  // Scroll auto message
  const messagesEndRef =useRef(null)

  useEffect(()=>{
    if (messagesEndRef .current) {
      messagesEndRef .current.scrollIntoView({behavior:"smooth"})
    }
  },[messageConversation])

  return (
    <div className='conversation-div'>
      {messageConversation.map((item,index)=>(
        <div ref={index==messageConversation.length-1?messagesEndRef:null} className={`${item.senderId===idCurrentUser?"conversation-right":"conversation-left"}`} key={index}>
            <div className={`${item.senderId===idCurrentUser?"bg-conversation-right":"bg-conversation-left"}`}>
              <span>{item.message}</span>
              <p className='format-time'>{format(new Date(item.createdAt))}</p>
            </div>
        </div>
      ))}
    </div>
  )
}
