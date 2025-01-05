"use client";

import { useSignalR } from "@/providers/SignalRProvider";
import { useEffect, useState } from "react";

export default function CreateRoom() {
    const [roomName, setRoomName] = useState<string>("");
    const [users, setUsers] = useState<string[]>([]);
    const { connection } = useSignalR();
    const handleCreateRoom = () => {
        connection?.invoke("JoinChat", roomName);
    }

    const handleReceiveRoom = (room: string, users: string[]) => {
        setRoomName(room);
        setUsers(users);
    }

    const handleJoinRoom = (room: string, users: string[]) => {
        setRoomName(room);
        setUsers(users);
    }

    useEffect(() => {
        if (!connection) return;
        connection?.on("ReceiveRoom", handleReceiveRoom);
        connection?.on("JoinRoom", handleJoinRoom);
        return () => {
            connection?.off("ReceiveRoom", handleReceiveRoom);
            connection?.off("JoinRoom", handleJoinRoom);
        }
    }, [connection])

    return (
        <div>
            <form onSubmit={handleCreateRoom} className="flex justify-center gap-4">
                <label>Room Name:</label>
                <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                <button type="submit">Create Room</button>
            </form>
        </div>
    );
}