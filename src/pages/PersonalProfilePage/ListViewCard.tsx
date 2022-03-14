import { Card, Typography } from "@mui/material";
import { styled } from "@mui/system";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  generateColor,
  yearAndMonthToString,
} from "../QuantLabPage/QuantModelViewer/Chart";

export interface IModelData {
  quant: {
    chart: number[];
    description: string;
    name: string;
    quant_id: number;
  };
}

interface IRechartData {
  name: string;
  [key: string]: string | number;
}

const ListViewCard: React.FC<IModelData> = (props) => {
  const graphData: IRechartData[] = formatToRechartData(props);
  return (
    <StyledCard>
      <ModelInfo>
        <Typography variant="h5">{props.quant.name}</Typography>
        <Typography>{props.quant.description}</Typography>
      </ModelInfo>
      <LineChart
        width={500}
        height={200}
        data={graphData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          dataKey={props.quant.name}
          dot={false}
          stroke={generateColor(props.quant.name)}
        />
      </LineChart>
    </StyledCard>
  );
};

export default ListViewCard;

const formatToRechartData = (data: IModelData) => {
  if (!data.quant.chart) return [];
  const ret: IRechartData[] = [];
  const start_date = "2016-03-31T00:00:00.000Z"; //시작 날짜가 모두 같으면 전역변수로 빼야할듯?
  const graphDate = new Date(start_date.split("T")[0]);
  graphDate.setDate(1);

  // TODO: 데이터 정규화 과정 추가 해야함

  for (let idx = 0; idx < data.quant.chart.length; idx++) {
    const tmp: IRechartData = {
      name: yearAndMonthToString(graphDate),
      [data.quant.name]: data.quant.chart[idx],
    };
    ret.push(tmp);
  }
  return ret; // {name:..., 모델명:..., 모델명:...}
};

const ModelInfo = styled("div")`
  width: 50%;
  padding: 20px;
`;

const StyledCard = styled(Card)`
  display: flex;
  height: 200px;
  margin-bottom: 10px;
`;
