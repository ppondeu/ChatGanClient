"use client"

import { API_URL } from "@/common/constant/constant";
import { APIResponse } from "@/types";

export async function fetcherCSR<T>(url: string, options?: RequestInit): Promise<APIResponse<T>> {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: 'include',
        });

        if (response.status === 401) {
            const refreshResponse = await fetch(`${API_URL}/auth/refresh-token`, {
                ...options,
                method: 'POST',
                credentials: 'include',
            });

            if (refreshResponse.ok) {
                await refreshResponse.json() as APIResponse<{ accessToken: string, refreshToken: string }>;

                const newResponse = await fetch(url, {
                    ...options,
                    credentials: 'include',
                });

                return await newResponse.json() as APIResponse<T>;
            }
        }

        return await response.json() as APIResponse<T>;
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            return {
                statusCode: 400,
                message: 'An error occurred',
                errors: [err.message],
            }
        }

        return {
            statusCode: 400,
            message: 'An error occurred',
            errors: ['An error occurred'],
        }
    }
}