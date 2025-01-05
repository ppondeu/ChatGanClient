import { Message } from "./message.type";
import { User } from "./user.type";

export enum ChatType {
    PRIVATE = 'PRIVATE',
    GROUP = 'GROUP',
}

export type Chat = {
    id: string;
    name: string;
    creatorId: string;
    creator: User;
    image: string | null;
    messages: Message[];
    members?: User[];
    createdAt: Date;
    deletedAt: Date | null;
    lastMessage?: Message;
}

export type ChatParams = {
    chatId: string;
}

export enum ChatActivityType {
    MESSAGE = 'MESSAGE',
    NOTIFICATION = 'NOTIFICATION',
}

export type ChatHubResponse<T> = {
    // type: ChatActivityType;
    chatId: string;
    response: T;
}

export type CreateChatRoomRequest = {
    name: string;
    members?: string[];
}
