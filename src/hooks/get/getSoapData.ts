import { api } from "../../services/api";
import { ItemsTYPE } from "../../types/itensType";

export async function getSoapData(order: string) {
  try {
    const data = await api.get(`getOrders/${order}`);

    return data as unknown as ItemsTYPE;
  } catch (error) {
    console.error(error);
  }
}
