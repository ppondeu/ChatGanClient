"use client";

import { useState } from "react";

interface MessageInputProps {
    onSendMessage: (message: string) => void;
}
export default function MessageInput({ onSendMessage }: MessageInputProps) {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim() === "") return;
        onSendMessage(message);
        setMessage("");
    }
    return (
        <div className="flex items-center rounded-xl">
            <input type="text" className="flex-1 p-2" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="button" onClick={handleSendMessage} className="text-center p-2 hover:cursor-pointer hover:bg-blue-500 text-xl font-semibold">Send</button>
        </div>
    );
}