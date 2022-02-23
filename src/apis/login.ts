import axios from "axios";

import { endpoint } from "./endpoint";

export interface tmpRet {
  access_token: string;
  refresh_token: string;
}

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

    // const tmp = {
    //   title: "foo",
    //   body: "bar",
    //   userId: 1,
    // };

    // const res = await axios.post(
    //   "https://jsonplaceholder.typicode.com/posts",
    //   tmp
    // );

    console.log("!!!!!!!!!!", res.data);

    return res.data.body;
  } catch (e) {
    console.error("login:", e);
  }
}
