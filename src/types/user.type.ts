export type User = {
    id: string;
    username: string;
    email: string;
    firstname?: string;
    lastname?: string;
    avatar?: string;
    createdAt: Date;
    deletedAt: Date | null;
}
