"use client"

import { CHAT_THUMBNAIL_URL } from "@/common/constant";
import { getImageUrl } from "@/common/utills/get-image-url";
import { Chat } from "@/types";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ChatHeaderProps {
    chat?: Chat;
}
export default function ChatHeader({ chat }: ChatHeaderProps) {
    const [loading, setLoading] = useState(false);
    const chatImage = getImageUrl(chat?.image!) ?? CHAT_THUMBNAIL_URL;
    useEffect(() => {
        if (chat) {
            setLoading(false);
        }
    }, [chat])
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[83vh]">
                <div className="flex flex-col items-center gap-2">
                    <p>Loading chat...</p>
                    <div className="flex justify-center items-center">
                        <CircularProgress />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="flex items-center gap-4 p-4 border-b-[1px]">
            <div className="flex items-center w-14 h-14 bg-white rounded-full">
                <Image
                    src={chatImage}
                    alt={chat?.name ?? "Chat Thumbnail"}
                    width={300}
                    height={300}
                    className="rounded-full object-cover w-full h-full"
                />
            </div>
            <div>
                <h3 className="text-lg font-semibold">{chat?.name}</h3>
                <p className="text-sm text-gray-500">{chat?.members?.length} {chat?.members?.length === 1 ? "member" : "members"}</p>
            </div>
        </section>
    )
}