import { User } from "./user.type";

export enum MessageType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    FILE = 'FILE',
}

export type Message = {
    id: string;
    chatId: string;
    senderId: string;
    sender?: User
    messageText: string;
    sentAt: Date;
    deletedAt: Date | null;
}

export type CreateMessageRequest = {
    connectionId: string;
    messageText: string;
}