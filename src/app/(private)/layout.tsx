import { SignalRProvider, StoreProvider } from "@/providers";
import { getChatsSSR } from "@/services";
import { getUserFriendsSSR } from "@/services/user/get-user-friends";
import { Chat } from "@/types";

type LayoutProps = {
    children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
    const chats = await getChatsSSR();
    const chatsMap = new Map<string, Chat>();
    if (chats.data) {
        chats.data.forEach((chat) => {
            chatsMap.set(chat.id, chat);
        });
    }

    const getFriends = async () => {
        const { data: friends } = await getUserFriendsSSR();
        return friends || [];
    }

    const friends = await getFriends();

    return (
        <>
            <StoreProvider initialUserFriends={friends}>
                <SignalRProvider initialChats={chatsMap}>
                    {children}
                </SignalRProvider>
            </StoreProvider>
        </>
    );
}