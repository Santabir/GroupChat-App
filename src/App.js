import React, { useState, useEffect } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";
// 1. Import Router components
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  // 1. If not authenticated, show Auth. 
  // We don't need 'isInChat' here anymore!
  if (!isAuth) {
    return (
      <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth}>
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <Router>
      <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth}>
        <Routes>
          {/* Default path shows Room Selection */}
          <Route path="/" element={<RoomSelection />} />
          
          {/* Join-room path also shows Room Selection */}
          <Route path="/join-room" element={<RoomSelection />} />
          
          {/* Chat path shows Chat */}
          <Route path="/chat/:roomName" element={<Chat />} />
        </Routes>
      </AppWrapper>
    </Router>
  );
}

// 2. Separate Component for Room Selection Logic
function RoomSelection() {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleEnterChat = () => {
    if (room === "") return alert("Enter a room name");
    // We don't even need to set a 'room' cookie anymore! 
    // The URL /chat/Version2 holds all the info we need.
    navigate(`/chat/${room}`);
  };

  return (
    <div className="room">
      <label> Type room name: </label>
      <input onChange={(e) => setRoom(e.target.value)} />
      <button onClick={handleEnterChat}> Enter Chat </button>
    </div>
  );
}

export default ChatApp;