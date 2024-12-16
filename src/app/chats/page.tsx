"use client";
import React, { useEffect, useState } from "react";
import Users from "@/components/Users";
import Chats from "@/components/Chats";
import SideBar from "@/components/SideBar";
import { MediaType } from "@/types/chat";
import { ActiveIcons } from "@/types/ActiveIcon";

function Page() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // State to track selected user, active chat, and focused icon
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string>("chat123");
  const [activeIcon, setActiveIcon] = useState<ActiveIcons>(ActiveIcons.CHAT);

  // Mock Chat Data
  const chatsData = {
    MyId: "1",
    Chats: [
      {
        messageId: "1",
        senderId: "1",
        chatId: "chat1",
        messageText: "Hello, how are you?",
        messageType: MediaType.TEXT,
        sendAt: "2024-12-14T12:00:00Z",
        isRead: true,
      },
      {
        messageId: "2",
        senderId: "2",
        chatId: "chat2",
        messageText: "I'm good, thanks! What about you?",
        messageType: MediaType.TEXT,
        sendAt: "2024-12-14T12:01:00Z",
        isRead: true,
      },
      {
        messageId: "3",
        senderId: "1",
        chatId: "chat123",
        messageText: "I'm doing great. Here's the file you requested.",
        messageType: MediaType.FILE,
        sendAt: "2024-12-14T12:02:00Z",
        isRead: false,
      },
      {
        messageId: "4",
        senderId: "2",
        chatId: "chat2",
        messageText: "Got it! Thanks!",
        messageType: MediaType.TEXT,
        sendAt: "2024-12-14T12:03:00Z",
        isRead: true,
      },
      {
        messageId: "5",
        senderId: "1",
        chatId: "chat1",
        messageText: "Check out this image from the event!",
        messageType: MediaType.IMAGE,
        sendAt: "2024-12-14T12:04:00Z",
        isRead: false,
      },
    ],
  };

  return (
    <div className="d-flex flex-row" style={{ height: "100vh", width: "100%" }}>
      {/* Sidebar */}
      <div
        className="d-flex flex-column"
        style={{
          flex: "0 0 80px",
          maxWidth: "80px",
          height: "100%",
        }}
      >
        <SideBar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </div>

      {/* Users and Chats Section (Visible Only When ActiveIcons.CHAT is Focused) */}
      {activeIcon === ActiveIcons.CHAT ? (
        <>
          {/* Users Section */}
          <div
            className="border border-danger overflow-auto"
            style={{
              flex: "1",
              maxWidth: "45vw",
            }}
          >
            <Users
              activeUserId={activeUserId}
              setActiveUserId={(id) => {
                setActiveUserId(id);
                setActiveChatId(`chat${id}`); // Dynamically update the active chat
              }}
              setActiveChatId={setActiveChatId}
            />
          </div>

          {/* Chats Section */}
          <div
            className="border border-primary overflow-auto"
            style={{
              flex: "2",
              height: "100%",
            }}
          >
            <Chats
              Chats={chatsData.Chats}
              MyId={chatsData.MyId}
              ActiveChatId={activeChatId}
            />
          </div>
        </>
      ) : (
        // Placeholder content when the Chat icon is not active
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <h3>Select the Chat icon to view and interact with chats.</h3>
        </div>
      )}
    </div>
  );
}

export default Page;
