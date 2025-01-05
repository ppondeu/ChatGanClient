import { API_URL } from "@/common/constant";
import { fetcherCSR } from "@/lib/api";
import { APIResponse, CreateMessageRequest, Message } from "@/types";

export async function createMessage(chatId: string, formData: CreateMessageRequest): Promise<APIResponse<Message>> {
    return fetcherCSR(`${API_URL}/chats/${chatId}/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
}