"use client";

import { Message as IMessage } from "@/types";
import MessageItem from "./MessageItem";
import { useUser } from "@/providers";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export interface MessageProps {
    messages?: IMessage[];
}

export default function Message({ messages }: MessageProps) {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (messages) {
            setLoading(false);
        }
    }, [messages])
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[83vh]">
                <div className="flex flex-col items-center gap-2">
                    <p>Loading messages...</p>
                    <div className="flex justify-center items-center">
                        <CircularProgress />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 p-4 bg-gray-100 h-[83vh] overflow-y-auto">
            {messages && messages?.map((message, index) => (
                <MessageItem key={index} message={message} isMine={message.sender?.id === user?.id} />
            ))}
        </div>
    );
}
