export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const SERVER_PORT = process.env.NEXT_PUBLIC_SERVER_PORT;
export const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST;
export const SERVER_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;
export const API_URL = `${SERVER_URL}/api`;
export const CHAT_URL = `${SERVER_URL}/${process.env.NEXT_PUBLIC_CHAT_HUB_CHANNEL}`;

export const CHAT_THUMBNAIL_URL = "/assets/group-thumbnail.png";
export const BASE_AVATAR = "/assets/avatar.jpg";
export const BASE_IMAGE_URL = `${SERVER_URL}/attachments`;

// console.log("API_URL", API_URL);
// console.log("CHAT_URL", CHAT_URL);
// console.log("SERVER_URL", SERVER_URL);
// console.log("IS_PRODUCTION", IS_PRODUCTION);
// console.log("SERVER_PORT", SERVER_PORT);
// console.log("SERVER_HOST", SERVER_HOST);
// console.log("CHAT_THUMBNAIL_URL", CHAT_THUMBNAIL_URL);
// console.log("BASE_AVATAR", BASE_AVATAR);