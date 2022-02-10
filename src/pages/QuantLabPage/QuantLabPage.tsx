import { Button, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import styled from "styled-components";

import makeQuantModel from "../../apis/makeQuantModel";
import CheckBoxs from "../../components/CheckBoxs";
import Example from "../../components/graph";
import ModalBusinessAreas from "../../components/modals/BusinessAreas";
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

interface ITmp {
  ts: number;
  data: number;
}

interface IModelList {
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
    game: true,
    enter: false,
    enter2: false,
    enter3: false,
  });
  const [chartInfo, setChartInfo] = useState({});
  // const [modelTableRows, setModelTableRows] = useState<GridRowsProp>([]);
  const [modelList, setModelList] = useState<IModelList[]>([]);

  const onClickMakeButton = async () => {
    const responseData = await makeQuantModel();
    // setModelTableRows((prev) => [...prev, data]);
    setModelList((prev) => [...prev, { ...responseData, id: +new Date() }]);
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
            <Button variant="contained" sx={{ m: 1 }}>
              재무상태
            </Button>
            <Button variant="contained" sx={{ m: 1 }}>
              주식성향
            </Button>
            <Button variant="contained" sx={{ m: 1 }}>
              차트정보
            </Button>
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
        />
      </ShowQuantModelYieldContainer>
    </MainContainer>
  );
};

export default QuantLabPage;
