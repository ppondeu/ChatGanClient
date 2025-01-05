import { API_URL } from "@/common/constant";
import { fetcherCSR, fetcherSSR } from "@/lib/api";
import { APIResponse, Chat } from "@/types";
import { revalidatePath } from "next/cache";

export async function createChatRoom(formData: FormData): Promise<APIResponse<Chat>> {
    return fetcherCSR<Chat>(`${API_URL}/chats`, {
        method: 'POST',
        body: formData,
    });
}

export async function createChatRoomSSR(formData: FormData): Promise<APIResponse<Chat>> {
    const response = await fetcherSSR<Chat>(`${API_URL}/chats`, {
        method: 'POST',
        body: formData,
    });

    revalidatePath("/direct/inbox");
    return response;
}