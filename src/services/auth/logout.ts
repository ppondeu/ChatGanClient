import { API_URL } from "@/common/constant";
import { fetcherCSR } from "@/lib/api";

export async function logout() {
    return fetcherCSR<undefined>(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
}