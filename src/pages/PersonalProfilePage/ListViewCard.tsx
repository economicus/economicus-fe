import { Button, Card, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import {
  CartesianGrid,
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

  const [modelName, setModelName] = useState(props.quant.name);
  const modelNameHandeler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModelName(event.target.value);
  };
  const [modelDescription, setModelDescription] = useState(
    props.quant.description
  );
  const modelDescriptionHandeler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setModelDescription(event.target.value);
  };

  const submitHandeler = () => {
    console.log(modelName); //test
    console.log(modelDescription); //test
    setEditting(!editting);
  };

  const [editting, setEditting] = useState(false);
  const edittingHandeler = () => {
    setEditting(!editting);
  };

  return (
    <StyledCard>
      <ModelInfo>
        {editting && (
          <>
            <EdittingContainer>
              <ModelNameTextFiled
                required
                id="name"
                defaultValue={modelName}
                variant="standard"
                onChange={modelNameHandeler}
              />
              <StyledTextarea
                id="description"
                defaultValue={modelDescription}
                onChange={modelDescriptionHandeler}
              />
            </EdittingContainer>
            <Button onClick={submitHandeler}>save</Button>
          </>
        )}
        {!editting && (
          <>
            <EdittingContainer>
              <Typography variant="h5">{modelName}</Typography>
              <Typography>{modelDescription}</Typography>
            </EdittingContainer>
            <Button onClick={edittingHandeler}>edit</Button>
            <Button>share</Button>
          </>
        )}
      </ModelInfo>
      <LineChart
        width={500}
        height={250}
        data={graphData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
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

const StyledCard = styled(Card)`
  display: flex;
  height: 250px;
  margin-bottom: 10px;
`;

const ModelInfo = styled("div")`
  width: 50%;
`;

const EdittingContainer = styled("div")`
  height: 200px;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-left: 10px;
`;

const StyledTextarea = styled("textarea")`
  resize: none;
  width: 100%;
  height: 100%;
`;

const ModelNameTextFiled = styled(TextField)`
  width: 100%;
  margin-bottom: 5px;
`;
