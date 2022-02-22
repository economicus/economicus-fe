import { PureComponent } from "react";
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

interface ITmpData {
  model_name: string; // 임시

  cumulative_return: number;
  annual_average_return: number;
  winning_percentage: number;
  max_loss_rate: number;
  holdings_count: number;
  chart: {
    start_date: string;
    profit_rate_data: number[];
    profit_kospi_data: number[];
  };
}

const data1 = {
  model_name: "임시1",

  cumulative_return: 15.951946962191434,
  annual_average_return: -2.2114148369615254,
  winning_percentage: 45.45454545454545,
  max_loss_rate: -26.46400223928732,
  holdings_count: 7,
  chart: {
    start_date: "2016-12-31T00:00:000Z",
    profit_rate_data: [
      8.31201047,
      15.13554791,
      -1.33652122,
      -1.42408167,
      10.42078459,
      8.30569164,
      17.68356243,
      9.40703498,
      -4.15162926,
      5.5424435,
      6.65444626,
      -2.5551126,
      2.78251544,
      1.60430797,
      -5.50608302,
      4.48940976,
      7.67556972,
      -0.69061304,
      -11.60413821,
      -10.07694755,
      -1.09885958,
      -6.63640131,
      -13.46021816,
      -2.12960605,
      -4.23366001,
      10.07353571,
      18.49689674,
      18.5670751,
      13.89091815,
      4.9969956,
      11.09737718,
      -12.10075998,
      -17.47819168,
      4.87301065,
      4.26413851,
      5.50743434,
      18.65356589,
      7.21420746,
      -14.73127902,
      -30.04228324,
      -4.46315521,
      37.87215713,
      0.85856734,
      18.55902666,
      38.72594903,
      12.15658747,
      2.2436161,
      16.32811733,
      40.27751017,
      26.23856053,
      8.93437578,
      4.3564198,
      5.82803493,
      9.88648391,
      5.35332658,
      -1.61771229,
      -5.17819001,
      -13.0716656,
      -6.41441741,
      15.95194696, // 수익률 (%)
    ],
    profit_kospi_data: [
      2839.01,
      2970.68,
      3068.82,
      3199.27,
      3202.32,
      3296.68,
      3203.92,
      3147.86,
      3061.42,
      3012.95,
      2976.21,
      2873.47,
      2591.34,
      2267.15,
      2327.89,
      2326.17,
      2249.37,
      2108.33,
      2029.6,
      1947.56,
      1754.64,
      1987.01,
      2119.01,
      2197.67,
      2087.96,
      2083.48,
      2063.05,
      1967.79,
      2024.55,
      2130.62,
      2041.74,
      2203.59,
      2140.67,
      2195.44,
      2204.85,
      2041.04,
      2096.86,
      2029.69,
      2343.07,
      2322.88,
      2295.26,
      2326.13,
      2423.01,
      2515.38,
      2445.85,
      2427.36,
      2566.46,
      2467.49,
      2476.37,
      2523.43,
      2394.47,
      2363.19,
      2402.71,
      2391.79,
      2347.38,
      2205.44,
      2160.23,
      2091.64,
      2067.57,
      2026.46, // 지수 (number)
    ],
  },
};

const data2 = {
  model_name: "임시2",

  cumulative_return: 15.951946962191434,
  annual_average_return: -2.2114148369615254,
  winning_percentage: 45.45454545454545,
  max_loss_rate: -26.46400223928732,
  holdings_count: 7,
  chart: {
    start_date: "2016-12-31T00:00:000Z",
    profit_rate_data: [
      10.31201047, 10.13554791, -1.33652122, -1.42408167, 10.42078459,
      8.30569164, 17.68356243, 9.40703498, -4.15162926, 5.5424435, 6.65444626,
      -2.5551126, 2.78251544, 1.60430797, -5.50608302, 4.48940976, 7.67556972,
      -0.69061304, -11.60413821, -10.07694755, -1.09885958, -6.63640131,
      -13.46021816, -2.12960605, -4.23366001, 10.07353571, 18.49689674,
      18.5670751, 13.89091815, 4.9969956, 11.09737718, -12.10075998,
      -17.47819168, 4.87301065, 4.26413851, 5.50743434, 18.65356589, 7.21420746,
      -14.73127902, -30.04228324, -4.46315521, 37.87215713, 0.85856734,
      18.55902666, 38.72594903, 12.15658747, 2.2436161, 16.32811733,
      40.27751017, 26.23856053, 8.93437578, 4.3564198, 5.82803493, 9.88648391,
      5.35332658, -1.61771229, -5.17819001, -13.0716656, -6.41441741,
      15.95194696,
    ],
    profit_kospi_data: [
      2839.01, 2970.68, 3068.82, 3199.27, 3202.32, 3296.68, 3203.92, 3147.86,
      3061.42, 3012.95, 2976.21, 2873.47, 2591.34, 2267.15, 2327.89, 2326.17,
      2249.37, 2108.33, 2029.6, 1947.56, 1754.64, 1987.01, 2119.01, 2197.67,
      2087.96, 2083.48, 2063.05, 1967.79, 2024.55, 2130.62, 2041.74, 2203.59,
      2140.67, 2195.44, 2204.85, 2041.04, 2096.86, 2029.69, 2343.07, 2322.88,
      2295.26, 2326.13, 2423.01, 2515.38, 2445.85, 2427.36, 2566.46, 2467.49,
      2476.37, 2523.43, 2394.47, 2363.19, 2402.71, 2391.79, 2347.38, 2205.44,
      2160.23, 2091.64, 2067.57, 2026.46,
    ],
  },
};

interface IDataFormat {
  name: string;
  kospi: number;
  [key: string]: string | number; // 모델 추가?
}

function kospiToBalance(data: ITmpData) {
  const kospi: number[] = data.chart.profit_kospi_data;
  const val: number[] = [1000];

  for (let index = 0; index < kospi.length - 1; index++) {
    const kospiPropit = kospi[index + 1] / kospi[index];
    val.push(val[index] * kospiPropit);
  }
  return val;
}

function propitToBalance(data: ITmpData) {
  const propit: number[] = data.chart.profit_rate_data;
  const val: number[] = [1000];

  for (let index = 0; index < propit.length; index++) {
    val.push(val[index] * propit[index]);
  }
  return val;
}

function yearAndMonthToString(date: Date) {
  let tmp: string;

  tmp = date.getFullYear().toString();
  tmp = tmp + "/" + (date.getMonth() + 1).toString();
  return tmp;
}

// const graphDataParse = (
//   start_date: string,
//   profit_rate_data: number[],
//   profit_kospi_data: number[]
// ) => {
//   const graphDate = new Date(start_date.split("T")[0]);

//   graphDate.setDate(1);
//   const data: IDataFormat[] = [];
//   for (let index = 0; index < profit_kospi_data.length; index++) {
//     const tmpData: IDataFormat = {
//       name: yearAndMonthToString(graphDate),
//       kospi: profit_kospi_data[index],
//       // modalProfit: profit_rate_data[index],
//       ["model" + index]: profit_rate_data[index],
//     };
//     console.log(tmpData);
//     // console.log(graphDate.toDateString());
//     graphDate.setMonth(graphDate.getMonth() + 1);
//     data.push(tmpData);
//   }

//   return data;
// };

// const graphData = graphDataParse(
//   data1.chart.start_date,
//   data1.chart.profit_rate_data,
//   data1.chart.profit_kospi_data
// );

const graphDataParse = (tmpData: ITmpData[]) => {
  const tmp: IDataFormat[] = [];

  const graphDate = new Date(tmpData[0].chart["start_date"].split("T")[0]);
  graphDate.setDate(1);

  for (let idx = 0; idx < tmpData[0].chart["start_date"].length; idx++) {
    const context: IDataFormat = { name: "", kospi: 0 };
    context.name = yearAndMonthToString(graphDate);
    context.kospi = tmpData[0].chart["profit_kospi_data"][idx];

    tmpData.forEach((data) => {
      context[data["model_name"]] = data.chart.profit_rate_data[idx];
    });

    graphDate.setMonth(graphDate.getMonth() + 1);
    tmp.push(context);
  }

  return tmp; // {name: string, kospi: number, 모델명:..., 모델명:...,}
};

const graphData = graphDataParse([data1, data2]);

// const data = [
//   {
//     name: "1990",
//     kospi: 600,
//모델1: 100,
//     모델2: 300
//   },
//   {
//     name: "1995",
//     kospi: 500,
//   },
//   {
//     name: "2000",
//     kospi: 900,
//   },
//   {
//     name: "2005",
//     kospi: 1400,
//   },
//   {
//     name: "2010",
//     kospi: 1600,
//   },
//   {
//     name: "2015",
//     kospi: 1900,
//   },
//   {
//     name: "2020",
//     kospi: 3000,
//   },
// ];

const generateColor = (name: string): string => {
  return "#8884d8";
};

// console.log(graphData, Object.keys(graphData));
export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          // width={500}
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
          {Object.keys(graphData[0])
            .filter((val) => val !== "name")
            .map((val, idx) => {
              console.log(val);
              return (
                <Line
                  type="monotone"
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
}
