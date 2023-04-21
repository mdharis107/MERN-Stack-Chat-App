import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const  data  = await axios.get("http://localhost:8080/api/chat");
    // console.log(data);
    setChats(data.data);
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {chats.map((ele) => (
        <div key={ele._id} >
          <h3>{ele.chatName}</h3>
        </div>
      ))}
    </div>
  );
};

export default ChatPage;
