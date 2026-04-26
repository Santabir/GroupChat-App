import React, { useState, useEffect } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  
  // 1. Initialize from cookies so it persists after refresh
  const [isInChat, setIsInChat] = useState(cookies.get("room") ? true : false);
  const [room, setRoom] = useState(cookies.get("room") || "");

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room name: </label>
          <input onChange={(e) => setRoom(e.target.value)} />
          <button
            onClick={() => {
              // 2. Save the room name to a cookie when entering
              if (room === "") return alert("Enter a room name");
              cookies.set("room", room);
              setIsInChat(true);
            }}
          >
            Enter Chat
          </button>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </AppWrapper>
  );
}

export default ChatApp;