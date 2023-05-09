import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadData } from "../utils/localStorage";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = loadData("userInfo");

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export { ChatProvider };
