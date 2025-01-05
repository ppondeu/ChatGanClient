import { BASE_IMAGE_URL } from "../constant";

export function getImageUrl(image: string): string | undefined {
    return image ? `${BASE_IMAGE_URL}/${image}` : undefined;
}