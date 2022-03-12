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

import { IChart } from "../QuantLabPage";

interface ChartProps {
  charts: IChart[];
}

export default function Chart({ charts }: ChartProps) {
  // const graphData = graphDataParse([data1, data2]); // NOTE: 테스트용 더미 데이터
  const graphData: IRechartData[] = formatToRechartData(charts);

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
  // kospi: number;
  [key: string]: string | number;
}

/*
 * ANCHOR: functions
 */

// TODO: 이러한 함수들을 useCallback 처리 하는건가?

const formatToRechartData = (charts: IChart[]): IRechartData[] => {
  if (!charts.length) return [];

  const ret: IRechartData[] = [];

  // const graphDate = new Date(charts[0].chart_data["start_date"].split("T")[0]);
  const graphDate = new Date("2016-03-31T00:00:00.000Z".split("T")[0]); // TODO: 날짜 어떻게 할건지 정해야
  graphDate.setDate(1);

  const normalizedData = charts.map((val) => {
    return {
      ...val,
      chart_data: {
        // profit_kospi_data: kospiToBalance(val),
        // profit_rate_data: profitToBalance(val),
        profit_rate_data: val.chart_data.profit_rate_data,
      },
    };
  });

  for (
    let idx = 0;
    idx < normalizedData[0].chart_data["profit_rate_data"].length;
    idx++
  ) {
    // const context: IRechartData = { name: "", kospi: 0 };
    const context: IRechartData = { name: "" };
    context.name = yearAndMonthToString(graphDate);
    // context.kospi = normalizedData[0].chart_data["profit_kospi_data"][idx];

    normalizedData.forEach((data) => {
      context[data["model_name"]] = data.chart_data.profit_rate_data[idx];
    });

    graphDate.setMonth(graphDate.getMonth() + 1);
    ret.push(context);
  }

  return ret; // {name: string, kospi: number, 모델명:..., 모델명:...,}
};

// function kospiToBalance(data: IChart) {
//   const normalizedKospiData = [];
//   const kospi: number[] = data.chart_data.profit_kospi_data;
//   const seed = 1000;

//   normalizedKospiData[0] = seed;

//   for (let index = 1; index < kospi.length; index++) {
//     const kospiPropit = (kospi[index] - kospi[index - 1]) / kospi[index - 1];
//     normalizedKospiData[index] =
//       normalizedKospiData[index - 1] +
//       normalizedKospiData[index - 1] * kospiPropit;
//   }

//   const kospiPropit =
//     (kospi[kospi.length] - kospi[kospi.length - 1]) / kospi[kospi.length - 1];

//   const tmpBalace =
//     kospi[kospi.length] + (kospi[kospi.length] * kospiPropit) / 100;

//   normalizedKospiData.push(tmpBalace);

//   return normalizedKospiData;
// }

// const profitToBalance = (data: IChart) => {
//   const normalizedProfitData = [];
//   const profit: number[] = data.chart_data.profit_rate_data;
//   const seed = 1000;

//   normalizedProfitData[0] = seed;

//   for (let index = 1; index < profit.length; index++) {
//     normalizedProfitData[index] =
//       normalizedProfitData[index - 1] +
//       (normalizedProfitData[index - 1] * profit[index - 1]) / 100;
//   }

//   // 수익률 60개 -> 실제값 61개
//   const tmpBalace =
//     normalizedProfitData[profit.length - 1] +
//     (normalizedProfitData[profit.length - 1] * profit[profit.length - 1]) / 100;

//   normalizedProfitData.push(tmpBalace);

//   return normalizedProfitData;
// };

function yearAndMonthToString(date: Date) {
  let tmp: string;

  tmp = date.getFullYear().toString();
  tmp = tmp + "/" + (date.getMonth() + 1).toString();
  return tmp;
}

const generateColor = (name: string): string => {
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
  //if (name.length === 0) return hash;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;
  return colors[hash];
};
