import { GridSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../stores/store";
import QuantModelCreation from "./QuantModelCreation";
import QuantModelTable from "./QuantModelTable";
import QuantModelViewer from "./QuantModelViewer";

const QuantLabPage = () => {
  const [modelList, setModelList] = useState<IModel[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]); // NOTE: 선택된 모델 id의 배열. 이를 통해 그래프 렌더링 예정

  console.log(modelList);

  return (
    <MainContainer>
      <StyledDiv>
        <QuantModelViewer {...{ selectionModel }} />
        <QuantModelCreation {...{ setModelList }} />
      </StyledDiv>

      <QuantModelTable
        {...{ setSelectionModel, setModelList }}
        rows={modelList.map((val) => {
          const { 임시그래프내용, ...field } = val;
          임시그래프내용; // NOTE: 미사용 워닝 해결을 위해 이렇게 해놓았는데... 괜찮을까? 다른 방법이 있나?
          return field;
        })}
      />
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
  width: 100vw;
  height: 100%;

  padding-left: 10%;
  padding-right: 10%;
`;

const StyledDiv = styled.div`
  height: 600px;

  display: flex;
  padding: 20px 0;
  justify-content: space-between;
`;

export default QuantLabPage;
