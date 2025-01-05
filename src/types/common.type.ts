export type APIResponse<T> = {
    statusCode: number;
    message: string;
    errors?: string[];
    data?: T;
}

export type ActionResponse<T> = {
    success: boolean;
    response: APIResponse<T>;
}