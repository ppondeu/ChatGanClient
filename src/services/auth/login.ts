import { API_URL } from "@/common/constant";
import { fetcherCSR } from "@/lib/api";
import { APIResponse, LoginCredentials, User } from "@/types";

export async function login(data: LoginCredentials): Promise<APIResponse<User>> {
    return fetcherCSR<User>(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
}