import axios from "axios";

import { endpoint } from "./endpoint";

export interface IChangeModelInfoBody {
  active: boolean;
  description: string;
  name: string;
}

export default async function changeModelInfo(
  body: IChangeModelInfoBody,
  token: string,
  quant_id: number
) {
  try {
    const res = await axios.patch(
      endpoint + "/quants/quant/" + quant_id,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (e) {
    return e;
  }
}
