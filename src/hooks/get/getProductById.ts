import { api } from "../../services/api";

export async function getProductById(productID: string) {
    try {
        const data = await api.get(`/getProductsByID/${productID}`);

        return data;
    } catch (error) {
        console.error(error);
    }
}
