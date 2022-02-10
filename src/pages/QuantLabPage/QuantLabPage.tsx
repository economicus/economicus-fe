import { Card } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import styled from "styled-components";

import Example from "../../components/graph";
import ComparativeStockSelect from "../../components/selecter/ComparativeStockSelect";
import TermSelect from "../../components/selecter/TermSelect";
import ModelCreation from "./ModelCreation";
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
  /* argin: 5px; */
  display: flex;
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
  const [modelList, setModelList] = useState<IModel[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]); // NOTE: 선택된 모델 id의 배열. 이를 통해 그래프 렌더링 예정

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

        <ModelCreation setModelList={setModelList} />

        {/* <ModelContainer>
          <Container sx={{ px: "5%" }}>
            <h3>Quant Lab</h3>
            <LabSlider
              name={"리밸런싱 주기"}
              min={1}
              max={12}
              value={rebalancingTerm}
              setValue={setRebalancingTerm}
            />
            <LabSlider
              name={"보유 종목 수"}
              min={1}
              max={12}
              value={numberOfHoldings}
              setValue={setNumberOfHoldings}
            />
          </Container>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              p: 3,
            }}
          >
            <ModalFinanceConditions
              state={financeCondetion}
              setState={setFinanceCondetion}
            />
            <Button variant="contained" sx={{ m: 1 }}>
              주식성향
            </Button>
            <ModalChartInfo state={chartInfo} setState={setChartInfo} />

            <QuantLabModal
              btnName="사업분야"
              state={businessArea}
              setState={setBusinessArea}
            >
              <Typography>test</Typography>
            </QuantLabModal>
          </Box>

          <Button onClick={onClickMakeButton}>tmp make model</Button>
        </ModelContainer> */}
      </MakeModelContainer>
      <ShowQuantModelYieldContainer>
        <QuantModelTable
          rows={modelList.map((val) => {
            const { 임시그래프내용, ...field } = val;
            임시그래프내용; // NOTE: 미사용 워닝 해결을 위해 이렇게 해놓았는데... 괜찮을까? 다른 방법이 있나?
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
