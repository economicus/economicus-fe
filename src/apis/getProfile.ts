import axios from "axios";

import { endpoint } from "./endpoint";

export default async function getProfile(token: string, user_id: number) {
  try {
    const res = await axios.get(endpoint + "/users/profile/" + { user_id }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    //return JSON.parse(dummy); //test
    return e;
  }
}

const dummy = JSON.stringify({
  quant: [
    {
      chart: [
        8.31201046811529, 15.13554790878776, -1.336521221573761,
        -1.42408166715555, 10.420784591586559, 8.305691643668455,
        17.68356243256443, 9.407034979656027, -4.15162926200139,
        5.542443496088845, 6.654446258518339,
      ],
      description: "model description1",
      name: "model name1",
      quant_id: 1,
    },
    {
      chart: [33.12, 31.23, 32.19, 36.54, 38.18, 43.12, 41.12, 38.25, 39.63],
      description: "model description2",
      name: "model name2",
      quant_id: 2,
    },
    {
      chart: [123.4, 136.4, 140.2, 146.8, 154.1, 160.9, 157.3, 154.3, 156.6],
      description: "model description3",
      name: "model name3",
      quant_id: 3,
    },
    {
      chart: [111, 112, 123, 146.8, 154.1, 160.9, 157.3, 154.3, 156.6],
      description: "model description4",
      name: "model name4",
      quant_id: 4,
    },
  ],
  user: {
    email: "string",
    profile: {
      email: "string",
      intro_message: "string",
      location: {
        city: "string",
        country: "string",
      },
      nickname: "mher",
      phone: "string",
      profile_image: "string",
      user_id: 0,
      user_url: "string",
    },
  },
});
