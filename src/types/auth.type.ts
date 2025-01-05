export type Token = {
    accessToken: string | null;
    refreshToken: string | null;
}

export type LoginCredentials = {
    email: string;
    password: string;
}

export type RegisterCredentials = {
    username: string;
    email: string;
    password: string;
}
