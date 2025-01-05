"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChatList from "./ChatList";
import { useSignalR, useUser } from "@/providers";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CreateChatRoomModal from "../Modal/CreateChatRoomModal";
import { sortChatsByLastMessage } from "@/common/utills/sort";
import { createChatRoom } from "@/services";

interface InboxProps {
    className?: string;
}

export default function Inbox({ className }: InboxProps) {
    const { chats, connection } = useSignalR();
    const { push } = useRouter();
    const { user } = useUser();
    const [modalOpen, setModalOpen] = useState(false);
    const chatList = sortChatsByLastMessage(Array.from(chats!.values()) ?? []);
    const handleChatClick = (chatId: string) => {
        push(`/direct/t/${chatId}`);
    }

    const handleOpenModal = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const onCreateRoom = async (formData: FormData) => {
        formData.forEach((value, key) => {
            console.log(key, value);
        });
        if (!connection) {
            console.log('No connection');
            return;
        }
        try {
            formData.append("connectionId", connection?.connectionId!);
            const { statusCode, data, message } = await createChatRoom(formData);
            if (statusCode !== 201) {
                console.log('Error');
                return;
            }
            console.log(message)
            console.log(data);

            // window.location.href = `/direct/t/${data?.id}`;
            // push(`/direct/t/${data?.id}`);

        } catch (err) {
            console.log('Error');
            console.log(err);
        }
    }

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex items-center justify-between p-4">
                <h3 className="font-bold text-3xl">{user?.username}</h3>
                <button onClick={handleOpenModal} className="p-2 rounded-full bg-slate-200 hover:bg-blue-500">
                    <GroupAddIcon className="text-black" />
                </button>
            </div>
            <h2 className="font-bold text-xl p-4">Inbox</h2>
            <ChatList chats={chatList} onClick={handleChatClick} />
            <CreateChatRoomModal isOpen={modalOpen} onClose={handleCloseModal} onCreateRoom={onCreateRoom} currentUser={user!} />
        </div>
    )
}
