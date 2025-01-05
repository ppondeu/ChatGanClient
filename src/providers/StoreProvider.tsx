"use client"

import { User } from "@/types";
import { createContext, useContext, useState } from "react";

interface IStoreContext {
    userFrends: User[];
    setUserFriends: (userFriends: User[]) => void;
}
const StoreContext = createContext<IStoreContext | undefined>(undefined);

interface StoreProviderProps {
    children: React.ReactNode;
    initialUserFriends: User[];
}
export const StoreProvider = ({ children, initialUserFriends }: StoreProviderProps) => {
    const [userFrends, setUserFriends] = useState<User[]>(initialUserFriends);
    return (
        <StoreContext.Provider value={{ userFrends, setUserFriends }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}