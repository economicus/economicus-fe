import { styled } from "@mui/material/styles";
import { GridSelectionModel } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { endpoint } from "../../apis/endpoint";
import { RootState } from "../../stores/store";
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

  const token = useSelector((state: RootState) => state.session.token);
  useEffect(() => {
    async function getExModels() {
      try {
        const res = await axios.get(endpoint + "/lab/list", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const modelData: IModel[] = [];
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          const tmpCharts = await axios.get(
            endpoint + "/lab/data/" + res.data[0].id,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          element.chart_data = tmpCharts.data.chart;
          modelData.push(element);
        }
        setModelList(modelData);
        return res;
      } catch (e) {
        return e;
      }
    }
    getExModels();
  }, []);

  const charts: IChart[] = modelList
    .filter((val) => selectionModel.includes(val.id))
    .map((val) => {
      const { id, name, chart_data } = val;
      return { id, name, chart_data };
    });

  return (
    <MainContainer>
      <LeftContainer>
        <QuantModelCreation {...{ setModelList }} />
      </LeftContainer>

      <RightContainer>
        <QuantModelViewer {...{ charts }} />
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
      </RightContainer>
    </MainContainer>
  );
};

/*
 * ANCHOR: models
 */

export interface IChart {
  id: number;
  name: string;
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
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
`;

const LeftContainer = styled("div")`
  /* width: calc(20% - 10px); */
  width: 300px;
  min-width: 300px;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightContainer = styled("div")`
  /* width: calc(80% - 10px); */
  width: 1000px;
  margin-left: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default QuantLabPage;
