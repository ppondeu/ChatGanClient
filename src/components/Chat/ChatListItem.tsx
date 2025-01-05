import Image from "next/image";
import { Chat } from "@/types";
import { CHAT_THUMBNAIL_URL } from "@/common/constant/constant";
import { timeAgo } from "@/common/utills/convert-time-to-proper-string";
import { getImageUrl } from "@/common/utills/get-image-url";

export interface ChatListItemProps {
    chat: Chat;
    onClick: (chatId: string) => void;
}

export default function ChatListItem({ chat, onClick }: ChatListItemProps) {
    const chatImage = getImageUrl(chat?.image!) ?? CHAT_THUMBNAIL_URL;
    return (
        <div onClick={() => onClick(chat.id)} className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 border-b-[1px] p-4">
            <div className="flex items-center w-12 h-12 bg-white rounded-full">
                <Image
                    src={chatImage}
                    alt={chat?.name ?? "Chat Thumbnail"}
                    width={300}
                    height={300}
                    className="rounded-full object-cover w-full h-full"
                />
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="font-semibold text-lg">{chat.name}</h3>
                <p>
                    {chat.lastMessage
                        ? `${chat.lastMessage.sender?.username || ''}: ${chat.lastMessage.messageText || ''} · ${timeAgo(chat.lastMessage.sentAt)}`
                        : 'No messages yet'
                    }
                </p>
            </div>
        </div >
    );
}
