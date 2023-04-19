import { api } from "../../services/api";
import { dispatchOrderTypes } from "../../types/dispatchOrderTypes";
import { ItemsTYPE } from "../../types/itensType";
import { OrderPostObj } from "../../types/orderPostObj";

export async function postDispatchOrder(
  orderId: string,
  date: string,
  initialTime: string
) {
  try {
    const data = await api.post(`dispatchOrder`, {
      companyId: "1",
      branchId: "4",
      orderId: orderId,
      date: date,
      initialTime: initialTime,
      dispatched: "true",
    });

    return data.data;
  } catch (error) {
    console.error(error);
  }
}
