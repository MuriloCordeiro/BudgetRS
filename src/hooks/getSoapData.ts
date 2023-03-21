import { api } from "../services/api";

export async function getSoapData() {
    try {
        const data = await api.get("validate");

        return data;
    } catch (error) {
        console.error(error);
    }
}
