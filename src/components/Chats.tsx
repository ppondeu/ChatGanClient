"use client";
import React, { useEffect, useState } from "react";
import { Chat, ChatsProps, MediaType } from "@/types/chat";

function Chats({ Chats, MyId, ActiveChatId }: ChatsProps) {
  const [sortedChats, setSortedChats] = useState<Chat[]>([]); // State for messages
  const [inputValue, setInputValue] = useState(""); // State for input value

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Sort chats by `sendAt` timestamp
    const sorted = [...Chats].sort(
      (a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime()
    );
    setSortedChats(sorted);
  }, [Chats]);

  // Callback to handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage: Chat = {
      messageId: Math.random().toString(36).substr(2, 9), // Generate a random ID
      senderId: MyId,
      chatId: ActiveChatId,
      messageText: inputValue,
      messageType: MediaType.TEXT, // Default to TEXT type
      sendAt: new Date().toISOString(),
      isRead: false,
    };

    console.log("Sent message:", newMessage);

    // Append the new message to the chat
    setSortedChats((prevChats) => [...prevChats, newMessage]);

    // Clear the input field
    setInputValue("");
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      {/* Chat Messages Section */}
      <div className="border border-danger overflow-auto flex-grow-1 p-3">
        {sortedChats
          .filter((chat) => chat.chatId === ActiveChatId) // Filter by active chat ID
          .map((chat, index) => (
            <Message key={index} chat={chat} MyId={MyId} />
          ))}
      </div>

      {/* Input Bar Section */}
      <div className="d-flex border border-top border-secondary p-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Send on Enter
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const Message = ({ chat, MyId }: { chat: Chat; MyId: string }) => {
  const isRightAligned = MyId === chat.senderId;

  return (
    <div
      className={`d-flex ${
        isRightAligned ? "justify-content-end" : "justify-content-start"
      } mb-3`}
    >
      <div
        className={`p-2 rounded ${
          isRightAligned ? "bg-primary text-white" : "bg-light text-dark"
        }`}
        style={{ maxWidth: "70%" }}
      >
        {/* Render content based on message type */}
        {chat.messageType === MediaType.TEXT && <p className="mb-1">{chat.messageText}</p>}
        {chat.messageType === MediaType.IMAGE && (
          <img src={chat.messageText} alt="Image" style={{ maxWidth: "100%" }} />
        )}
        {chat.messageType === MediaType.FILE && (
          <a href={chat.messageText} download>
            Download File
          </a>
        )}

        {/* Timestamp */}
        <small className="text-muted">{new Date(chat.sendAt).toLocaleTimeString()}</small>
      </div>
    </div>
  );
};

export default Chats;
