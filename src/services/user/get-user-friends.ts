import { API_URL } from "@/common/constant";
import { fetcherSSR } from "@/lib/api";
import { APIResponse, User } from "@/types";

export async function getUserFriendsSSR(): Promise<APIResponse<User[]>> {
    return fetcherSSR<User[]>(`${API_URL}/users/friends`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
}