import { api } from "../../services/api";

export async function getTodayInvoices() {
    try {
        const data = await api.get(`/getInvoices`);

        return data;
    } catch (error) {
        console.error(error);
    }
}
