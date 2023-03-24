import { api } from "../../services/api";
import { ItemsTYPE } from "../../types/itensType";

export async function postSoapData(order: string) {
    try {
        const data = await api.post(`insertOrders`, {
            order: "7333",
            checker: "RODHOLHPO",
            separator: "ROLNANDINHO",
            date: "10/03/2032",
            initialTime: "1111111",
            endTime: "11111",
        });

        return data as unknown as ItemsTYPE;
    } catch (error) {
        console.error(error);
    }
}
