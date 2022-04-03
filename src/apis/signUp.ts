import axios from "axios";

import { endpoint } from "./endpoint";

export default async function signUp(
  email: string,
  password: string,
  nickname: string
) {
  try {
    const body = {
      email: email,
      nickname: nickname,
      password: password,
    };
    const json = JSON.stringify(body);
    // signUpPage에서 가져온 값들을 이용해서 JSON에 담아 백엔드에 보낼 준비를 한다.

    const res = await axios
      .post(endpoint + "/register", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        const res = response.status.toString();
        return res;
      })
      .catch(function (error) {
        const res = JSON.parse(error.request.response).message.toString();
        return res;
      });
    // res 안에 201 혹은 에러메세지를 담아서 상위 페이지에 전송한다.
    return res;
  } catch (e) {
    return e as string;
  }
}
