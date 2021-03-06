import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { endpoint } from "../../../apis/endpoint";
import { RootState } from "../../../stores/store";
import { IChart, roundNum } from "../QuantLabPage";

interface ChartProps {
  charts: IChart[];
}

export default function Chart({ charts }: ChartProps) {
  const [graphData, setGraphData] = useState<IRechartData[]>([]);
  const [kospiData, setKospiData] = useState<number[]>([]);

  const token = useSelector((state: RootState) => state.session.token);
  useEffect(() => {
    async function getKospi() {
      try {
        const res = await axios.get(endpoint + "/lab/data/kospi", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setKospiData(res.data);
        return res;
      } catch (e) {
        return e;
      }
    }
    getKospi();

    setGraphData(formatToRechartData(charts, kospiData));
  }, [charts]);

  if (!graphData.length) return <span>선택된 모델이 없습니다.</span>;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        height={300}
        data={graphData}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {graphData.length &&
          Object.keys(graphData[0])
            .filter((val) => val !== "name")
            .map((val, idx) => {
              return (
                <Line
                  dataKey={val}
                  stroke={generateColor(val)}
                  activeDot={{ r: 8 }}
                  dot={false}
                  key={idx}
                  unit="%"
                />
              );
            })}
      </LineChart>
    </ResponsiveContainer>
  );
}

/*
 * ANCHOR: interfaces
 */

interface IRechartData {
  name: string;
  kospi: string | number;
  [key: string]: string | number;
}

/*
 * ANCHOR: functions
 */

const formatToRechartData = (
  charts: IChart[],
  kospiData: number[]
): IRechartData[] => {
  if (!charts.length) return [];
  const ret: IRechartData[] = [];

  const graphDate = new Date("2016-03-31T00:00:00.000Z".split("T")[0]);
  graphDate.setDate(1);

  const normalizedData = charts.map((val) => {
    return {
      ...val,
      chart_data: {
        profit_kospi_data: kospiData,
        profit_rate_data: val.chart_data.profit_rate_data,
      },
    };
  });

  const diffLength =
    normalizedData[0].chart_data.profit_kospi_data.length -
    normalizedData[0].chart_data.profit_rate_data.length;

  const referenceValueKospi =
    normalizedData[0].chart_data["profit_kospi_data"][diffLength - 1];

  for (
    let idx = 0;
    idx < normalizedData[0].chart_data["profit_rate_data"].length;
    idx++
  ) {
    const context: IRechartData = { name: "", kospi: 0 };
    context.name = yearAndMonthToString(graphDate);
    context.kospi = roundNum(
      (normalizedData[0].chart_data["profit_kospi_data"][idx + diffLength - 1] /
        referenceValueKospi -
        1) *
        100
    );
    normalizedData.forEach((data) => {
      context[data["name"]] = roundNum(data.chart_data.profit_rate_data[idx]);
    });

    graphDate.setMonth(graphDate.getMonth() + 1);
    ret.push(context);
  }
  return ret; // {name: string, kospi: number, 모델명:..., 모델명:...,}
};

export function yearAndMonthToString(date: Date) {
  let tmp: string;

  tmp = date.getFullYear().toString();
  tmp = tmp + "/" + (date.getMonth() + 1).toString();
  return tmp;
}

export const generateColor = (name: string): string => {
  const colors = [
    "#e51c23",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#5677fc",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#259b24",
    "#8bc34a",
    "#afb42b",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;
  return colors[hash];
};
