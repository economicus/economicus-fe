import { GridSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../stores/store";
import QuantModelCreation from "./QuantModelCreation";
import QuantModelTable from "./QuantModelTable";
import QuantModelViewer from "./QuantModelViewer";
import { tmpModel } from "./QuantModelViewer/QuantModelViewer";

const QuantLabPage = () => {
  const [modelList, setModelList] = useState<IModel[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]); // NOTE: 선택된 모델 id의 배열. 이를 통해 그래프 렌더링 예정

  const models: tmpModel[] = modelList
    .filter((val) => selectionModel.includes(val.id))
    .map((val) => {
      const { id, model_name, chart_data } = val;
      return { id, model_name, chart_data };
    });
  // console.log("model", modelList, selectionModel, models);

  return (
    <MainContainer>
      <StyledDiv>
        <QuantModelViewer {...{ models }} />
        <QuantModelCreation {...{ setModelList }} />
      </StyledDiv>

      <QuantModelTable
        {...{ setSelectionModel, setModelList }}
        rows={modelList.map((val) => {
          const { chart_data, ...field } = val;
          chart_data; // NOTE: 미사용 워닝 해결을 위해 이렇게 해놓았는데... 괜찮을까? 다른 방법이 있나?
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
  start_date: string;
  profit_kospi_data: number[];
  profit_rate_data: number[];
}

export interface IModel {
  id: number;
  model_name: string; // NOTE: 변수명은 어떻게 할까?

  cumulative_return: number; // NOTE: 구조 추후 논의 필요
  annual_average_return: number;
  winning_percentage: number;
  max_loss_rate: number;
  holdings_count: number;

  chart_data: IChartElement;
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
