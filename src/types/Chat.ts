export enum MediaType  {
    FILE = "file",
    TEXT = "text",
    IMAGE = "image",
    VIDEO = "video"
}
export type Chat = {
    messageId:string;
    senderId:string;
    chatId:string;
    messageText:string;
    messageType:MediaType;
    sendAt:string;
    isRead:boolean;
}

export interface ChatsProps {
    MyId:string;
    ActiveChatId:string;
    Chats:Chat[];
}