import React, { useState } from "react";
import { useEffect } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequest";
import "./ChatBox.css";
import {format} from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { useRef } from "react";

const ChatBox = ({ chat, currentUser,setSendMessage,receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage,setNewMessage]=useState('');
  const [disable,setDisable]=useState(false)
  const scroll=useRef();

  useEffect(()=>{
    if(receiveMessage!==null && receiveMessage.chatId===chat._id){
      setMessages([...messages,receiveMessage])
    }
  },[receiveMessage])

  //fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        console.log(data, "is the datat");
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange=(newMessage)=>{
    setNewMessage(newMessage)
    if(newMessage==' '*1000){
      setDisable(true)
    }else{
      setDisable(false)
    }
  }

  const handleSend=async(e)=>{
    e.preventDefault();
    const message={
      senderId:currentUser,
      text:newMessage,
      chatId:chat._id,
    }

    //send message to database
    try {
      const {data}=await addMessage(message);
      setMessages([...messages,data]);
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }


    //send message to socket server
    const receiverId=chat.members.find((id)=>id!==currentUser);
    setSendMessage({...message,receiverId})
  }
  
  //Always scroll to the last message
  // useEffect(()=>{
  //   scroll?.current?.scrollIntoView({behavior:'smooth'})
  // },[messages])

  return (
    <>
      <div className="ChatBox-container">
        {chat?(<>
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                    userData?.profilePicture
                      ? process.env.REACT_APP_PUBLIC_FOLDER +
                        userData.profilePicture
                      : process.env.REACT_APP_PUBLIC_FOLDER +
                        "defaultProfile.png"
                  }
                  alt=""
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="name" style={{ fontSize: "0.8rem" }}>
                  <span>
                    {userData?.firstname} {userData?.lastname}
                  </span>
                </div>
              </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
          </div>

          {/* ChatBolx Messages */}
          <div className="chat-body">
            {messages.map((message) => (
              <>
                <div ref={scroll}
                  className={
                    message.senderId === currentUser ? "message own" : "message"
                  }
                >
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
              </>
            ))}
          </div>

          {/* Chat-sender */}
          <div className="chat-sender">
            <div>+</div>
            <InputEmoji 
            value={newMessage}
            onChange={handleChange}
            />
            {disable? <button className="button send-button" style={{padding:'1rem'}} disabled>Send</button>:<div className="send-button button" style={{padding:'1rem'}} onClick={handleSend}>Send</div>}
          </div>
        </>):(
          <span className="chatbox-empty-message">Tap on Chat to start Conversation...</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
