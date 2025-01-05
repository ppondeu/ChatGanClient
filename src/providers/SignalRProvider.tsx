"use client"

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Chat, ChatHubResponse, Message } from "@/types";
import { CHAT_URL } from "@/common/constant";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface SignalRContextType {
    connection: signalR.HubConnection | undefined;
    selectedChat: Chat | undefined;
    setSelectedChat: Dispatch<SetStateAction<Chat | undefined>>;
    chats: Map<string, Chat> | undefined;
    setChats: Dispatch<SetStateAction<Map<string, Chat> | undefined>>;
}

const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

interface SignalRProviderProps {
    children: React.ReactNode;
    initialChats?: Map<string, Chat>;
}

export const SignalRProvider = ({ children, initialChats }: SignalRProviderProps) => {
    const [connection, setConnection] = useState<signalR.HubConnection | undefined>(undefined);
    const [selectedChat, setSelectedChat] = useState<Chat | undefined>(undefined);
    const [chats, setChats] = useState<Map<string, Chat> | undefined>(initialChats);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const startConnection = async () => {
            try {
                const conn = new signalR.HubConnectionBuilder()
                    .withUrl(CHAT_URL, {
                        withCredentials: true,
                    })
                    .withAutomaticReconnect()
                    .build();

                await conn.start();
                console.log("Connected to SignalR");
                console.log("id: ", conn.connectionId);
                setConnection(conn);
                setLoading(false);

                conn.on("ReceiveMessage", ({ chatId, response }: ChatHubResponse<Message>) => {
                    console.log("ReceiveMessage", chatId, response);
                    addMessage(chatId, response);
                });

                conn.on("ReceiveJoinLeaveChat", ({ chatId, response }: ChatHubResponse<string>) => {
                    console.log("ReceiveJoinLeaveChat", chatId, response);
                });

                conn.on("ReceiveInfo", ({ chatId, response }: ChatHubResponse<string>) => {
                    console.log("ReceiveChat", chatId, response);
                });
            } catch (err) {
                console.error("Connection failed:", err);
            }
        };

        startConnection();

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    const addMessage = (chatId: string, message: Message) => {
        setChats((prevChats) => {
            if (!prevChats) return prevChats;
            const updatedChats = new Map(prevChats);

            if (updatedChats.has(chatId)) {
                const chat = updatedChats.get(chatId);
                if (chat) {
                    const isNewMessage = !chat.messages.some((msg) => msg.id === message.id);

                    if (isNewMessage) {
                        chat.messages.push(message);
                        chat.lastMessage = message;
                        updatedChats.set(chatId, chat);
                    }
                }
            }
            return updatedChats;
        });
    };


    const addChat = (chatId: string, chat: Chat) => {
        setChats((prevChats) => {
            if (!prevChats) return prevChats;
            const updatedChats = new Map(prevChats);
            updatedChats.set(chatId, chat);
            return updatedChats;
        });
    };

    return (
        <SignalRContext.Provider value={{ connection, selectedChat, setSelectedChat, chats, setChats }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                children
            )}
        </SignalRContext.Provider>
    );
};

export const useSignalR = () => {
    const context = useContext(SignalRContext);
    if (!context) {
        throw new Error("useSignalR must be used within a SignalRProvider");
    }
    return context;
};
