import { Button, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridRowsProp, GridSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import styled from "styled-components";

import makeQuantModel from "../../apis/makeQuantModel";
import CheckBoxs from "../../components/CheckBoxs";
import Example from "../../components/graph";
import ModalBusinessAreas from "../../components/modals/BusinessAreasModal";
import ModalChartInfo from "../../components/modals/ChartInfoModal";
import ModalFinanceConditions from "../../components/modals/FinanceConditonsModal";
import ComparativeStockSelect from "../../components/selecter/ComparativeStockSelect";
import TermSelect from "../../components/selecter/TermSelect";
import NumberOfStocks from "../../components/slider/NumberOfStocksSlider";
import RebalancingTermSlider from "../../components/slider/RebalancingTermSlider";
import QuantModelTable from "./QuantModelTable";

const MainContainer = styled.div`
  border: 3px solid pink;
  margin: 5px;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 30px;
`;

const GraphContainer = styled(Card)`
  border: 3px solid blue;
  margin: 5px;
  width: 50%;
`;

const GraphSlectContainer = styled.div`
  border: 3px solid orange;
  margin: 5px;
  display: flex;
`;

const Graph = styled.div`
  border: 3px solid green;
  margin: 5px;
  height: 300px;
  padding: 5px;
`;

const MakeModelContainer = styled.div`
  border: 3px solid black;
  argin: 5px;
  display: flex;
`;

const ModelContainer = styled(Card)`
  border: 3px solid red;
  margin: 5px;
  width: 50%;
`;

const ShowQuantModelYieldContainer = styled(Card)`
  height: 100%;

  border: 3px solid yellow;
  margin: 5px;
  margin-top: 10px;
`;

// const StyledButton = styled(B)

// CheckBoxs <-

export interface IBusinessArea {
  [key: string]: boolean;
}

export interface IChartInfo {
  [key: string]: boolean;
}
export interface IFinance {
  [key: string]: boolean;
}

interface ITmp {
  ts: number;
  data: number;
}

export interface IModel {
  id: number;
  모델: string; // NOTE: 변수명이 한글인 것이 마음에 안든다... 뭔가 enum 같은 것을 사용하고 싶다.
  누적수익률: number; // TODO: 숫자일까? 여기 구조와 변수 타입도 논의 필요
  연평균수익: number;
  승률: number;
  최대손실률: number;
  편입종목수: number;
  임시그래프내용: ITmp[];

  // TODO: 그래프에 대한 정보를 같이 받을텐데, 이 타입에 대해...
}

const QuantLabPage = () => {
  const [businessArea, setBusinessArea] = useState({
    에너지: true,
    소재: true,
    산업재: true,
    경기관련소비재: true,
    필수소비재: true,
    건강관리: true,
    금융: true,
    IT: true,
    커뮤니케이션서비스: true,
    유틸리티: true,
  });
  const [financeCondetion, setFinanceCondetion] = useState({
    PER: true,
    PBR: false,
    PSR: false,
    PCR: false,
    시가배당률: false,
    배당성향: false,
    "매출액 증가율": false,
    "순이익 증가율": false,
    ROE: false,
    ROA: false,
    부채비율: false,
  });
  const [chartInfo, setChartInfo] = useState({
    시가총액: true,
    "주가수익률(1개월)": false,
    "주가수익률(3개월)": false,
    "주가수익률(6개월)": false,
    "주가수익률(12개월)": false,
    "이동평균선(5일)": false,
    "이동평균선(20일)": false,
    "이동평균선(60일)": false,
    "이동평균선(120일)": false,
  });

  const [chartInfo, setChartInfo] = useState({});
  // const [modelTableRows, setModelTableRows] = useState<GridRowsProp>([]);
  const [modelList, setModelList] = useState<IModel[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]); // NOTE: 선택된 모델 id의 배열. 이를 통해 그래프 렌더링 예정

  const onClickMakeButton = async () => {
    const responseData = await makeQuantModel();
    // setModelTableRows((prev) => [...prev, data]);
    setModelList((prev) => [...prev, { id: +new Date(), ...responseData }]);
  };

  return (
    <MainContainer>
      <MakeModelContainer>
        <GraphContainer>
          <GraphSlectContainer>
            <ComparativeStockSelect />
            <TermSelect />
          </GraphSlectContainer>
          <Graph>
            <Example></Example>
          </Graph>
        </GraphContainer>

        <ModelContainer>
          <Container sx={{ px: "5%" }}>
            <h3>Quant Lab</h3>
            <RebalancingTermSlider />
            <NumberOfStocks />
          </Container>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              p: 3,
            }}
          >
            {/* 클릭시 modal 창 열리게 변경*/}
            {/* <Button variant="contained" sx={{ m: 1 }}>
              사업분야
            </Button> */}
            <ModalFinanceConditions
              state={financeCondetion}
              setState={setFinanceCondetion}
            />
            <Button variant="contained" sx={{ m: 1 }}>
              주식성향
            </Button>
            <ModalChartInfo state={chartInfo} setState={setChartInfo} />
            <ModalBusinessAreas
              state={businessArea}
              setState={setBusinessArea}
            />
          </Box>

          <Button onClick={onClickMakeButton}>tmp make model</Button>
        </ModelContainer>
      </MakeModelContainer>
      <ShowQuantModelYieldContainer>
        <QuantModelTable
          rows={modelList.map((val) => {
            const { 임시그래프내용, ...field } = val;
            return field;
          })}
          setSelectionModel={setSelectionModel}

          // models={modelList}
        />
      </ShowQuantModelYieldContainer>
    </MainContainer>
  );
};

export default QuantLabPage;
