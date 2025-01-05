"use client"

import { useStore } from "@/providers";
import { User } from "@/types";
import { useState } from "react";

// Mock user data for searching
const mockUsers: User[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    username: "user1",
    email: "user1@example.com",
    firstname: "John",
    lastname: "Doe",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user1.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    username: "user2",
    email: "user2@example.com",
    firstname: "Jane",
    lastname: "Smith",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user2.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174002",
    username: "user3",
    email: "user3@example.com",
    firstname: "Bob",
    lastname: "Johnson",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user3.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174003",
    username: "user4",
    email: "user4@example.com",
    firstname: "Alice",
    lastname: "Williams",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user4.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174004",
    username: "user5",
    email: "user5@example.com",
    firstname: "Charlie",
    lastname: "Brown",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user5.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174005",
    username: "user6",
    email: "user6@example.com",
    firstname: "Eve",
    lastname: "Davis",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user6.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174006",
    username: "user7",
    email: "user7@example.com",
    firstname: "Grace",
    lastname: "Miller",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user7.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174007",
    username: "user8",
    email: "user8@example.com",
    firstname: "Hank",
    lastname: "Moore",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user8.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174008",
    username: "user9",
    email: "user9@example.com",
    firstname: "Ivy",
    lastname: "Taylor",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user9.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174009",
    username: "user10",
    email: "user10@example.com",
    firstname: "Jack",
    lastname: "Anderson",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user10.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174010",
    username: "user11",
    email: "user11@example.com",
    firstname: "Kathy",
    lastname: "Thomas",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user11.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174011",
    username: "user12",
    email: "user12@example.com",
    firstname: "Leo",
    lastname: "Jackson",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user12.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174012",
    username: "user13",
    email: "user13@example.com",
    firstname: "Mona",
    lastname: "White",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user13.png",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174013",
    username: "user14",
    email: "user14@example.com",
    firstname: "Nina",
    lastname: "Harris",
    createdAt: new Date("2025-01-05T07:11:55.520Z"),
    deletedAt: null,
    avatar: "https://example.com/avatars/user14.png",
  },
];

interface CreateChatRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (formData: FormData) => void;
  currentUser: User;
}

const CreateChatRoomModal: React.FC<CreateChatRoomModalProps> = ({
  isOpen,
  onClose,
  onCreateRoom,
  currentUser,
}) => {
  const [roomName, setRoomName] = useState<string>("");
  const [roomImage, setRoomImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("No image selected");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const { userFrends } = useStore();
  const filteredUsers = userFrends.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setRoomImage(file);
      setImagePreview(`Selected image: ${file.name}`);
    } else {
      setRoomImage(null);
      setImagePreview("No image selected");
    }
  };

  const handleAddMember = (userId: string) => {
    if (!selectedMembers.includes(userId)) {
      setSelectedMembers((prev) => [...prev, userId]);
    }
  };

  const handleRemoveMember = (userId: string) => {
    if (userId !== currentUser.id) {
      setSelectedMembers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleCreateRoom = () => {
    if (roomName.trim() === "") {
      alert("Please enter a room name");
      return;
    }
    const formData = new FormData();
    formData.append("name", roomName);
    if (roomImage) {
      formData.append("image", roomImage);
    }
    selectedMembers.forEach((userId) => {
      console.log(userId);
      formData.append("otherMemberIds[]", userId);
    });

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    onCreateRoom(formData);
    onClose();
  };

  const handleCustomFileButtonClick = () => {
    document.getElementById("roomImageInput")?.click();
  };

  const handleCloseModal = () => {
    setRoomName("");
    setRoomImage(null);
    setImagePreview("No image selected");
    setSearchQuery("");
    setSelectedMembers([currentUser.id]);
    onClose();
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? "" : "hidden"
        }`}
    >
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">New Chat</h2>

        {/* Chat Room Name */}
        <div className="mt-4">
          <label
            htmlFor="roomName"
            className="block text-sm font-medium text-gray-700"
          >
            Room Name
          </label>
          <input
            id="roomName"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter room name"
          />
        </div>

        {/* Chat Room Image */}
        <div className="mt-4">
          <label
            htmlFor="roomImage"
            className="block text-sm font-medium text-gray-700"
          >
            Room Image (optional)
          </label>

          {/* Hidden file input */}
          <input
            id="roomImageInput"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Custom File Button */}
          <button
            onClick={handleCustomFileButtonClick}
            className="mt-2 w-full py-2 px-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Choose Image
          </button>

          {/* Image Preview */}
          <div className="mt-2 text-sm text-gray-500 flex items-center">
            <span>{imagePreview}</span>
            {roomImage && (
              <button
                onClick={() => {
                  setRoomImage(null);
                  setImagePreview("No image selected");
                }}
                className="ml-2 text-red-500 text-lg"
              >
                ✖
              </button>
            )}
          </div>
        </div>

        {/* Add Members - Search Users */}
        <div className="mt-4">
          <label
            htmlFor="addMembers"
            className="block text-sm font-medium text-gray-700"
          >
            Add Members
          </label>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Display selected members */}
        <div className="mt-4">
          <label
            htmlFor="members"
            className="block text-sm font-medium text-gray-700"
          >
            Selected Members
          </label>
          <div className="mt-2 max-h-20 overflow-y-auto flex flex-wrap gap-2">
            <div
              key={currentUser.id}
              className="flex items-center gap-2 bg-gray-200 p-1 text-xs rounded-full"
            >
              <span>{currentUser?.username}</span>
            </div>
            {selectedMembers.map((userId) => {
              const user = userFrends.find((u) => u.id === userId);
              return (
                <div
                  key={userId}
                  className="flex items-center gap-2 bg-gray-200 p-1 text-xs rounded-full"
                >
                  <span>{user?.username}</span>
                  {userId !== currentUser.id && (
                    <button
                      onClick={() => handleRemoveMember(userId)}
                      className="text-red-500 text-xs"
                    >
                      ✖
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Find User - Scrollable User List */}
        <div className="mt-2 max-h-36 min-h-36 overflow-y-auto">
          {(filteredUsers.length > 0) ? (
            filteredUsers.map((user) => {
              // Skip rendering the current user
              if (user.id === currentUser.id) {
                return null;
              }

              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 border-b"
                >
                  <span>{user.username}</span>
                  <button
                    onClick={() => handleAddMember(user.id)}
                    disabled={selectedMembers.includes(user.id)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                  >
                    {selectedMembers.includes(user.id) ? "Selected" : "Add"}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500">No users found</p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateRoom}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatRoomModal;
