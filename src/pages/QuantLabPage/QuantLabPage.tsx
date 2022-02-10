import { Card } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import styled from "styled-components";

import ChartViewer from "./ChartViewer";
import ModelCreation from "./ModelCreation";
import QuantModelTable from "./QuantModelTable";

const QuantLabPage = () => {
  const [modelList, setModelList] = useState<IModel[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]); // NOTE: 선택된 모델 id의 배열. 이를 통해 그래프 렌더링 예정

  return (
    <MainContainer>
      <HighContainer>
        <ChartViewer {...{ selectionModel }} />
        <ModelCreation {...{ setModelList }} />
      </HighContainer>

      <LowContainer>
        <QuantModelTable
          {...{ setSelectionModel }}
          rows={modelList.map((val) => {
            const { 임시그래프내용, ...field } = val;
            임시그래프내용; // NOTE: 미사용 워닝 해결을 위해 이렇게 해놓았는데... 괜찮을까? 다른 방법이 있나?
            return field;
          })}
        />
      </LowContainer>
    </MainContainer>
  );
};

/*
 * ANCHOR: models
 */

interface IChartElement {
  ts: number;
  data: number;
}

export interface IModel {
  id: number;
  모델: string; // NOTE: 변수명은 어떻게 할까?
  누적수익률: number; // NOTE: 구조 추후 논의 필요
  연평균수익: number;
  승률: number;
  최대손실률: number;
  편입종목수: number;
  임시그래프내용: IChartElement[];
}

/*
 * ANCHOR: styles
 */

const MainContainer = styled.div`
  border: 3px solid pink;
  margin: 5px;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 30px;
`;

const HighContainer = styled.div`
  border: 3px solid black;
  /* argin: 5px; */
  display: flex;
`;

// TODO: 적절한 네이밍
const LowContainer = styled(Card)`
  height: 100%;

  border: 3px solid yellow;
  margin: 5px;
  margin-top: 10px;
`;

export default QuantLabPage;
