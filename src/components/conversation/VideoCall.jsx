import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
export const VideoCall = ({
  setVideo,
  socket,
  userChat,
  videoCall,
  userCall,
}) => {
  const [stream, setStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callEnded, setCallEnded] = useState(false);
  const [name,setName]=useState("")
  //useRef
  const myVideo = useRef();
  const partnerVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });

    socket.on("call-video-to-friend",(data) => {
      setReceivingCall(true);
      setName(data.name)
    });
  }, []);


    if (videoCall == true) {
        socket.emit("call-video-to-friend", {
          receivedId: userChat,
          name: userCall,
        });

  
      // peer.on("stream", (stream) => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = stream;
        }
      // });
  
      // socket.on("call-accept", (signal) => {
      //   setCallAccepted(true);
      //   // peer.signal(signal);
      // });
  
      // connectionRef.current = peer;
    }

  // VideoCall()
  const answerVideoCall = () => {
    setCallAccepted(true);
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: stream,
  //   });

  //   peer.on("signal", (data) => {
      socket.emit("answer-call-video", {receivedId: userChat });
    };

  //   peer.on("stream", (stream) => {
  //     partnerVideo.current.srcObject = stream;
  //   });

  //   peer.signal(callerSignal);

  //   connectionRef.current = peer;
  // };

  // const leaveVideoCall = () => {
  //   setCallEnded(true);
  //   connectionRef.current.destroy();
  // };

  // const handleTurnOff = () => {
  //   setVideo(false);
  //   connectionRef.current.destroy();
  // };

  return (
    <>
      <div>VideoCall</div>
      {stream && (
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          style={{ width: "300px" }}
        ></video>
      )}
      {/* <button onClick={handleTurnOff}>Cancel</button> */}

      {name!==null && (
        <>
          <p>{name} calling ...</p> 

          <button onClick={answerVideoCall}>Answer</button>

        </>
      )}

      {callAccepted===true && (
        <video
          playsInline
          muted
          ref={partnerVideo}
          autoPlay
          style={{ width: "300px" }}
        ></video>
      )}


    </>
  );
};
