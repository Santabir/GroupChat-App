import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
// 1. Import useParams from react-router-dom
import { useParams } from "react-router-dom"; 

import "../styles/Chat.css";

export const Chat = () => {
  // 2. Extract roomName from the URL instead of receiving 'room' as a prop
  const { roomName } = useParams(); 
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    // 3. Use 'roomName' from the URL in your query
    const queryMessages = query(
      messagesRef,
      where("room", "==", roomName), 
      orderBy("createdAt")
    );
    
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, [roomName]); // 4. Add roomName as a dependency

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: roomName, // 5. Use roomName here as well
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        {/* 6. Display the roomName from the URL */}
        <h1>Welcome to: {roomName?.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="message-content">
              <span className="user">{message.user}:  </span>
              <span className="text">{message.text}</span>
            </div>
            <span className="timestamp">
              {message.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};