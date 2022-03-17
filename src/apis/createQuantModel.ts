import axios from "axios";

import { endpoint } from "./endpoint";

interface MinAndMax {
  min: number;
  max: number;
}

interface IActivities {
  [key: string]: MinAndMax;
} // NOTE: 추후 request 형식 바뀌면 삭제 예정

export interface createQuantModelBody {
  name: string;

  main_sectors: string[];

  net_revenue: MinAndMax;
  net_revenue_rate: MinAndMax;
  net_profit: MinAndMax;
  net_profit_rate: MinAndMax;
  de_ratio: MinAndMax;
  per: MinAndMax;
  psr: MinAndMax;
  pbr: MinAndMax;
  pcr: MinAndMax;
  dividend_yield: MinAndMax;
  dividend_payout_ratio: MinAndMax;
  roa: MinAndMax;
  roe: MinAndMax;
  market_cap: MinAndMax;

  activities: IActivities;

  start_date: string;
  end_date: string;
}

export default async function createQuantModel(
  body: createQuantModelBody,
  token: string
) {
  //   console.log("test", body);

  try {
    const res = await axios.post(endpoint + "/quants/quant", body, {
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
