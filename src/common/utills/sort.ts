import { Chat } from "@/types";

export const sortChatsByLastMessage = (chatList: Chat[]): Chat[] => {
    return [...chatList].sort((a, b) => {
        const aLastMessageSentAtStr = a.lastMessage?.sentAt || new Date(0);
        const bLastMessageSentAtStr = b.lastMessage?.sentAt || new Date(0);
        const aLastMessageSentAt = new Date(aLastMessageSentAtStr);
        const bLastMessageSentAt = new Date(bLastMessageSentAtStr);
        return bLastMessageSentAt.getTime() - aLastMessageSentAt.getTime();
    });
};