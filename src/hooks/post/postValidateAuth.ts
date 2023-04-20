import { api } from "../../services/api";
import { ItemsTYPE } from "../../types/itensType";
import { OrderPostObj } from "../../types/orderPostObj";

export async function ValidateAuth(email: string, password: string) {
  try {
    const data = await api.post(`getAuth`, {
      email: email,
      password: password,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}
