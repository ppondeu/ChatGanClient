import { API_URL } from "@/common/constant/constant";
import { fetcherCSR, fetcherSSR } from "@/lib/api";
import { APIResponse, Chat } from "@/types";

export async function getChats(): Promise<APIResponse<Chat[]>> {
    return fetcherCSR<Chat[]>(
        `${API_URL}/chats`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

export async function getChatsSSR(): Promise<APIResponse<Chat[]>> {
    return fetcherSSR<Chat[]>(
        `${API_URL}/chats`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}