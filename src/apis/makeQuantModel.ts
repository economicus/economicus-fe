const sleep = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

export default async function makeQuantModel() {
  // NOTE: useEffect 등의 테스트를 위해, setTimeout을 활용해 만든 임시 api 함수입니다.

  // await setTimeout(() => console.log("data fetched!"), 3000);
  await sleep(2000);

  return [
    {
      id: 1,
      모델: "모델명",
      누적수익률: "128.2%",
      연평균수익: "16%",
      승률: "55%",
      최대손실률: "-29%",
      편입종목수: "22개",
    },
    {
      id: 2,
      모델: "모델명",
      누적수익률: "128.2%",
      연평균수익: "16%",
      승률: "55%",
      최대손실률: "-29%",
      편입종목수: "22개",
    },
  ];
}
