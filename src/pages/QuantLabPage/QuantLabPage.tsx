import { GridSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import styled from "styled-components";

import QuantModelCreation from "./QuantModelCreation";
import QuantModelTable from "./QuantModelTable";
import QuantModelViewer from "./QuantModelViewer";

const QuantLabPage = () => {
  const [modelList, setModelList] = useState<IModel[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]); // NOTE: 선택된 모델 id의 배열

  const charts: IChart[] = modelList
    .filter((val) => selectionModel.includes(val.id))
    .map((val) => {
      const { id, model_name, chart_data } = val;
      return { id, model_name, chart_data };
    });

  return (
    <MainContainer>
      <StyledDiv>
        <QuantModelViewer {...{ charts }} />
        <QuantModelCreation {...{ setModelList }} />
      </StyledDiv>

      <QuantModelTable
        {...{ setSelectionModel, setModelList }}
        rows={modelList.map((val) => {
          const { chart_data, ...field } = val;
          chart_data; // NOTE: 미사용 워닝 해결을 위해
          return field;
        })}
      />
    </MainContainer>
  );
};

/*
 * ANCHOR: models
 */

export interface IChart {
  id: number;
  model_name: string;
  chart_data: {
    start_date: string;
    profit_kospi_data: number[];
    profit_rate_data: number[];
  };
}

export interface IModel extends IChart {
  cumulative_return: number;
  annual_average_return: number;
  winning_percentage: number;
  max_loss_rate: number;
  holdings_count: number;
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
