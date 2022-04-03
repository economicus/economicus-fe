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
            endpoint + "/lab/data/" + res.data[index].id,
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

const MainContainer = styled("div")`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
`;

const LeftContainer = styled("div")`
  width: calc(20% - 10px);
  /* width: 300px; */
  min-width: 300px;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightContainer = styled("div")`
  width: calc(80% - 10px);
  min-width: 1000px;
  margin-left: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default QuantLabPage;
