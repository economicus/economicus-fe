import axios from "axios";

import { endpoint } from "./endpoint";

export default async function login(email: string, password: string) {
  try {
    const body = {
      email,
      password,
    };

    const res = await axios.post(endpoint + "/login", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // NOTE: status 등은 어떻게 처리?

    return res.data;
  } catch (e) {
    return e;
  }
}
