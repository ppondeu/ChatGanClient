import { BASE_AVATAR, SERVER_URL } from "@/common/constant";
import { timeAgo } from "@/common/utills";
import { Message } from "@/types";
import Image from "next/image";

export interface MessageItemProps {
    message: Message;
    isMine: boolean;
}

export default function MessageItem({ message, isMine }: MessageItemProps) {
    const formattedTime = timeAgo(message.sentAt);
    const avatarUrl = message.sender?.avatar ? `${SERVER_URL}/attachments/${message.sender.avatar}` : BASE_AVATAR;
    return (
        <div className={`flex items-center ${isMine ? "justify-end" : "justify-start"} gap-4 items-start`}>
            {!isMine && (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                        src={avatarUrl}
                        alt={message.sender?.username ?? "User Avatar"}
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </div>
            )}
            <div className={`flex flex-col p-2 gap-[4px] rounded-md text-xl font-medium ${isMine ? "text-right" : "text-left"}`}>
                <p className="text-[16px] font-semibold text-gray-500">{message.sender?.username}</p>
                <p className={`p-2 rounded-lg ${isMine ? "bg-blue-500" : "bg-gray-200"}`}> {message.messageText} </p>
                <p className="text-xs text-gray-600">{formattedTime}</p>
            </div>
        </div>
    );
}
