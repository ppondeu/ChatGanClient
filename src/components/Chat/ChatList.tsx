import { Chat } from "@/types";
import ChatListItem from "./ChatListItem";

interface ChatListProps {
    chats: Chat[];
    onClick: (chatId: string) => void;
}
export default function ChatList({ chats, onClick }: ChatListProps) {
    return (
        <div className="flex flex-col h-screen overflow-y-auto">
            <p className="border-b-[1px]"></p>
            {chats.map((chat, index) => (
                <ChatListItem key={index} chat={chat} onClick={onClick} />
            ))}
        </div>
    )
}