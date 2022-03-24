import { styled } from "@mui/material/styles";
import { GridSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import QuantModelCreation from "./QuantModelCreation";
import QuantModelTable from "./QuantModelTable";
import QuantModelViewer from "./QuantModelViewer";

export function roundNum(num: number) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

const QuantLabPage = () => {
  const [modelList, setModelList] = useState<IModel[]>([]);
  // const [modelList, setModelList] = useState<IModel[]>(dummy);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]); // NOTE: 선택된 모델 id의 배열

  useEffect(() => {
    //
  });

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
          val.annual_average_return = roundNum(val.annual_average_return);
          val.cumulative_return = roundNum(val.cumulative_return);
          val.max_loss_rate = roundNum(val.max_loss_rate);
          val.winning_percentage = roundNum(val.winning_percentage);
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
    // start_date: string;
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

// const dummy = [
//   {
//     id: 1,
//     model_name: "test1",
//     cumulative_return: 2.4,
//     annual_average_return: 2.1,
//     winning_percentage: 66.66,
//     max_loss_rate: -13.01,
//     holdings_count: 12,
//     chart_data: {
//       start_date: "2020-01-01T00:00:00Z",
//       profit_rate_data: [
//         33.12, 31.23, 32.19, 36.54, 38.18, 43.12, 41.12, 38.25, 39.63,
//       ],
//       profit_kospi_data: [
//         123.4, 136.4, 140.2, 146.8, 154.1, 160.9, 157.3, 154.3, 156.6,
//       ],
//     },
//   },
//   {
//     id: 2,
//     model_name: "test2",
//     cumulative_return: 2.4,
//     annual_average_return: 2.1,
//     winning_percentage: 66.66,
//     max_loss_rate: -13.01,
//     holdings_count: 12,
//     chart_data: {
//       start_date: "2020-01-01T00:00:00Z",
//       profit_rate_data: [
//         33.12, 31.23, 32.19, 36.54, 38.18, 43.12, 41.12, 38.25, 39.63,
//       ],
//       profit_kospi_data: [
//         123.4, 136.4, 140.2, 146.8, 154.1, 160.9, 157.3, 154.3, 156.6,
//       ],
//     },
//   },
// ];

/*
 * ANCHOR: styles
 */

const MainContainer = styled("div")`
  width: 100vw;
  height: 100%;

  padding-left: 10%;
  padding-right: 10%;
`;

const StyledDiv = styled("div")`
  height: 600px;

  display: flex;
  padding: 20px 0;
  justify-content: space-between;
`;

export default QuantLabPage;
