"use client";
import React from "react";
import { UsersType } from "@/types/User";

// Single User Component
export const User = ({
  user,
  lastAction,
  isFocused,
  onClick,
}: {
  user: UsersType;
  lastAction: string;
  isFocused: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`d-flex p-2 align-items-center custom-hover ${
        isFocused ? "bg-primary text-white" : "bg-white"
      }`}
      style={{ cursor: "pointer", transition: "background-color 0.3s ease" }}
      onClick={onClick}
    >
      <img
        src={user.avatar}
        className="rounded-circle mx-3"
        alt="User Avatar"
        style={{ width: "50px", height: "50px" }}
      />
      <div>
        <div className="fw-bold">{user.username}</div>
        <div className="text-muted">{lastAction}</div>
      </div>
    </div>
  );
};

// Users Component
const Users = ({
  activeUserId,
  setActiveUserId,
  setActiveChatId,
}: {
  activeUserId: string | null;
  setActiveUserId: (id: string) => void;
  setActiveChatId: (chatId: string) => void;
}) => {
  const usersData: UsersType[] = [
    {
      id: "1",
      email: "johndoe@example.com",
      username: "John Doe",
      firstName: "John",
      lastName: "Doe",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      email: "janesmith@example.com",
      username: "Jane Smith",
      firstName: "Jane",
      lastName: "Smith",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: "3",
      email: "chrisevans@example.com",
      username: "Chris Evans",
      firstName: "Chris",
      lastName: "Evans",
      avatar: "https://via.placeholder.com/50",
    },
  ];

  const handleUserClick = (id: string, chatId: string) => {
    setActiveUserId(id); // Update active user ID
    setActiveChatId(chatId); // Update active chat ID
  };

  return (
    <div
      className="border border-danger overflow-auto py-5 px-2"
      style={{ height: "100vh", maxWidth: "45vw" }}
    >
      {usersData.map((user) => (
        <User
          key={user.id}
          user={user}
          lastAction={`Last action for ${user.username}`} // Pass custom last action
          isFocused={activeUserId === user.id} // Check if this user is active
          onClick={() => handleUserClick(user.id, `chat${user.id}`)} // Simulate chatId as `chat{id}`
        />
      ))}
    </div>
  );
};

export default Users;
