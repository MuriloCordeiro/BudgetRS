import { api } from "../../services/api";
// import { ItemsTYPE } from "../../types/itensType";

export async function getTodayInvoices() {
  try {
    const data = await api.get(`/getInvoices`);

    return data;
  } catch (error) {
    console.error(error);
  }
}
