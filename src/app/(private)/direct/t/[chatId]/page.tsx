"use client";

import { useParams } from "next/navigation";
import { useSignalR } from "@/providers";
import { ChatParams, CreateMessageRequest, Message as IMessage } from "@/types";
import { createMessage } from "@/services";
import { useUser } from "@/providers";
import { ChatHeader, Message, MessageInput } from "@/components";

export default function Page() {
    const { chatId } = useParams<ChatParams>();
    const { selectedChat, connection, chats: chatMap } = useSignalR();
    const { user } = useUser();

    const handleSendMessage = async (message: string) => {
        const newMessage: IMessage = {
            id: Math.random().toString(),
            messageText: message,
            sender: user,
            senderId: user?.id!,
            sentAt: new Date(),
            chatId: selectedChat?.id!,
            deletedAt: null,
        }
        const newMsg: CreateMessageRequest = {
            connectionId: connection?.connectionId!,
            messageText: message,
        }
        await createMessage(chatId, newMsg);
    }
    return (
        <div className="flex flex-col flex-[0.67] bg-[#f7f7f3] border-l-2 p-2">
            <ChatHeader chat={chatMap?.get(chatId)!} />
            <Message messages={chatMap?.get(chatId)?.messages!} />
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    )
}
