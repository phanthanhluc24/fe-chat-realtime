import React, { useEffect, useRef, useState } from "react";
import "../../scss/conversation.scss";
import { References } from "./References";
import { referenceUser } from "../api/reference.api";
import { currentUser } from "../api/currentUser.api";
import { userById } from "../api/userById.api";
import { io } from "socket.io-client";
import { chatWith } from "../api/chatWith.api";
import { Contact } from "./Contact";
import { contactUser } from "../api/contactUser.api";
import { Conversation } from "./Conversation";
import { VideoCall } from "./VideoCall";
import Peer from "simple-peer";

const socket = io("http://localhost:5000");
export const Chat = () => {
  const [referencesUser, setReferencesUser] = useState([]);
  const [currentLogin, setCurrentLogin] = useState({ _id: "", user_name: "" });
  // get all user not yet chatting
  useEffect(() => {
    referenceUser()
      .then((res) => {
        setReferencesUser(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // get current user log in
  useEffect(() => {
    currentUser()
      .then((res) => {
        setCurrentLogin(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [userChat, setUserChat] = useState(false);
  const [chatWithUser, setChatWithUser] = useState({ user_name: "" });
  // get user want to chat
  useEffect(() => {
    if (userChat !== false) {
      userById(userChat)
        .then((res) => {
          setChatWithUser(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userChat]);

  // new message from user login chat
  const [newMessage, setNewMessage] = useState("");
  // new message update from user login chat
  const [updateMessage, setUpdateMessage] = useState([]);
  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = {
      senderId: currentLogin._id,
      receivedId: userChat,
      message: newMessage,
    };
    if (newMessage !== "") {
      chatWith(message)
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error);
        });
      // send new conversation to server socket.io
      socket.emit("send-new-conversation", message);
      // update new conversation for rendering client
      setUpdateMessage(message);
    }

    setNewMessage("");
  };

  // list user was chat
  const [contactUsers, setContactUsers] = useState([]);
  useEffect(() => {
    contactUser(currentLogin._id)
      .then((res) => {
        setContactUsers(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentLogin._id]);
  // emit chat with new user with socket.io
  const [online,setOnline]=useState([])
  useEffect(() => {
    const message = {
      receivedId: userChat,
    };
    if (userChat !== false) {
      socket.emit("chat-with-new-user", message.receivedId);
    }
    socket.on("get-users", (users) => {
      setOnline(users);
    });
  }, [userChat]);

  // video to call with another one

  const [video, setVideo] = useState(false);
  const handleVideoCall = () => {
    setVideo(true);
    // const peer = new Peer({
    //         initiator: true,
    //         trickle: false,
    //         stream: stream,
    //       });
    //       peer.on("signal", (data) => {
    //         socket.emit("call-video-to-friend", {
    //           receivedId: userChat,
    //           signalData: data,
    //           name: userCall,
    //         });
    //       });
  };
  return (
    <div className="container">
      <div className="grid-columns">
        <div className="column-contacts">
          <div className="title-contact">
            <h3>Contact</h3>
          </div>
          {contactUsers.map((item, index) => (
            <div key={index}>
              <Contact
                currentId={currentLogin._id}
                listUser={item}
                setUserChat={setUserChat}
                onlineUser={online}
                socket={socket}
              />
            </div>
          ))}
        </div>
        <div className="column-chatBox">
          {userChat === false ? (
            <></>
          ) : (
            <>
              {video === false ? (
                <>
                  <div className="chat-box-header">
                    <h3 className="name-user">{chatWithUser.user_name}</h3>
                    <div className="icon-call-video">
                      <div className="icon-call">
                        <ion-icon
                          name="call"
                          size="large"
                          className="icon"
                        ></ion-icon>
                      </div>
                      <div
                        className="icon-videocam"
                        onClick={() => handleVideoCall()}
                      >
                        <ion-icon
                          name="videocam"
                          size="large"
                          className="icon"
                        ></ion-icon>
                      </div>
                    </div>
                  </div>
                  <hr style={{ marginTop: 5}} />
                    <Conversation
                      idCurrentUser={currentLogin._id}
                      idPartner={userChat}
                      updateMessage={updateMessage}
                    />
                  <div className="frame-chat">
                    <div className="plus">+</div>
                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="input-form"
                      autoFocus
                    ></input>
                    <div className="send-button" onClick={handleSendMessage}>
                      Send
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <VideoCall
                    setVideo={setVideo}
                    videoCall={video}
                    socket={socket}
                    handleVideoCall={handleVideoCall}
                    userChat={userChat}
                    userCall={currentLogin.user_name}
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className="column-references">
          <div className="title-references">
            <h3>References</h3>
          </div>
          <References
            references={referencesUser}
            currentId={currentLogin._id}
            setUserChat={setUserChat}
          />
        </div>
      </div>
    </div>
  );
};
