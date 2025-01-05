import { API_URL } from "@/common/constant";
import { fetcherCSR } from "@/lib/api";
import { APIResponse, RegisterCredentials, User } from "@/types";

export async function register(data: RegisterCredentials): Promise<APIResponse<User>> {
    return fetcherCSR<User>(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

}