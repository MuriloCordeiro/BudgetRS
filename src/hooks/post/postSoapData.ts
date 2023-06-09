import { api } from "../../services/api";
import { OrderPostObj } from "../../types/orderPostObj";

export async function postSoapData(postOrderObj: OrderPostObj) {
    try {
        const data = await api.post(`insertOrders`, {
            companyId: "1",
            branchId: "4",
            orderId: postOrderObj?.orderId,
            checker: postOrderObj?.checker,
            separator: postOrderObj?.separator,
            date: postOrderObj?.date,
            initialTime: postOrderObj?.initialTime,
            endTime: postOrderObj?.endTime,
            allChecked: postOrderObj?.allChecked,
        });

        return data as any;
    } catch (error) {
        console.error(error);
    }
}
