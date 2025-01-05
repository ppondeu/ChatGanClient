"use client"

import { User } from "@/types";
import { createContext, useContext, useState } from "react";

interface IUserContext {
    user?: User;
    setUser: (user?: User) => void;
}
const UserContext = createContext<IUserContext | undefined>(undefined);

interface UserProviderProps {
    children: React.ReactNode;
    intialUser?: User;
}
export const UserProvider = ({ children, intialUser }: UserProviderProps) => {
    const [user, setUser] = useState<User | undefined>(intialUser);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}