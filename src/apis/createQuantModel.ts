import axios from "axios";

import { endpoint } from "./endpoint";

const sleep = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

interface MinAndMax {
  min: number;
  max: number;
}

interface IActivities {
  // operating: MinAndMax;
  // investing: MinAndMax;
  // financing: MinAndMax;
  [key: string]: MinAndMax;
}

export interface createQuantModelBody {
  name: string;

  main_sector: string[];

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

  // activities: {
  //   operating: MinAndMax;
  //   investing: MinAndMax;
  //   financing: MinAndMax;
  // };

  activities: IActivities;

  start_date: string;
  end_date: string;
}

export default async function createQuantModel(
  body: createQuantModelBody,
  token: string
) {
  // NOTE: useEffect 등의 테스트를 위해, setTimeout을 활용해 만든 임시 api 함수입니다.

  // await setTimeout(() => console.log("data fetched!"), 3000);
  // await sleep(1000);
  console.log("create api test", body, token);

  try {
    const res = await axios.post(endpoint + "/quants/quant", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    return e; // TODO: 추후 에러 처리 필요
  }
}
