import { API_URL } from "@/common/constant/constant";
import { fetcherCSR } from "@/lib/api";
import { APIResponse, Chat } from "@/types";

export async function getChat(chatId: string): Promise<APIResponse<Chat>> {
    return fetcherCSR<Chat>(
        `${API_URL}/chats/${chatId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

