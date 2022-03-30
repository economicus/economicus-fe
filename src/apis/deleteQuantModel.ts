import axios from "axios";

import { endpoint } from "./endpoint";

export default async function deleteQuantModel(id: number, token: string) {
  try {
    const res = await axios.delete(endpoint + "/quants/quant/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    return e;
  }
}
