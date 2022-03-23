import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import changeModelInfo, {
  IChangeModelInfoBody,
} from "../../apis/changeModelInfo";
import { RootState } from "../../stores/store";
import {
  generateColor,
  yearAndMonthToString,
} from "../QuantLabPage/QuantModelViewer/Chart";

interface IListViewCardProps {
  modelData: IModelData;
  kospiData: number[];
}

export interface IModelData {
  chart: number[];
  description: string;
  name: string;
  quant_id: number;
}

interface IRechartData {
  name: string;
  kospi: number;
  [key: string]: string | number;
}

const ListViewCard = ({ modelData, kospiData }: IListViewCardProps) => {
  const graphData: IRechartData[] = formatToRechartData(modelData, kospiData);

  const [currentModelName, setCurrentModelName] = useState(modelData.name);
  const [currentDescription, setCurrentDescription] = useState(modelData.name);
  const [newModelName, setNewModelName] = useState(modelData.name);
  const [newDescription, setNewDescription] = useState(modelData.description);
  const [editting, setEditting] = useState(false);
  const [backDrop, setBackDrop] = React.useState(false);

  const token = useSelector((state: RootState) => state.session.token);

  const modelNameHandeler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewModelName(event.target.value);
  };
  const descriptionHandeler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewDescription(event.target.value);
  };
  const edittingHandeler = () => {
    setEditting(!editting);
  };

  const submitHandeler = async () => {
    setBackDrop(true);
    try {
      const responseData = await changeModelInfo(
        {
          active: true,
          description: newDescription,
          name: newModelName,
        } as IChangeModelInfoBody,
        token,
        modelData.quant_id
      );
      if (responseData instanceof Error) throw responseData;
      else {
        setCurrentModelName(newModelName);
        setCurrentDescription(newDescription);
      }
    } catch (e) {
      alert(e);
    }
    setBackDrop(false);
    setEditting(!editting);
  };

  // TODO: 공유하기 기능 추가해야함

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <StyledCard>
        <ModelInfo>
          {editting && (
            <>
              <EdittingContainer>
                <ModelNameTextFiled
                  required
                  id="name"
                  defaultValue={modelData.name}
                  variant="standard"
                  onChange={modelNameHandeler}
                />
                <StyledTextarea
                  id="description"
                  defaultValue={modelData.description}
                  onChange={descriptionHandeler}
                />
              </EdittingContainer>
              <Button onClick={submitHandeler}>save</Button>
              <Button onClick={edittingHandeler}>cancel</Button>
            </>
          )}
          {!editting && (
            <>
              <EdittingContainer>
                <Typography variant="h5">{currentModelName}</Typography>
                {currentDescription.split("\n").map((line) => {
                  return <Typography key={line}>{line}</Typography>;
                })}
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
          <Line dataKey="kospi" dot={false} stroke={generateColor("kospi")} />
          <Line
            dataKey={modelData.name}
            dot={false}
            stroke={generateColor(modelData.name)}
          />
        </LineChart>
      </StyledCard>
    </>
  );
};

export default ListViewCard;

const formatToRechartData = (modelData: IModelData, kospiData: number[]) => {
  if (!modelData.chart) return [];
  const ret: IRechartData[] = [];
  const start_date = "2016-03-31T00:00:00.000Z"; //시작 날짜가 모두 같으면 전역변수로 빼야할듯?
  const graphDate = new Date(start_date.split("T")[0]);
  graphDate.setDate(1);

  const diffLength = kospiData.length - modelData.chart.length;
  const referenceValueKospi = kospiData[diffLength - 1];

  // TODO: 원금 1000부터 시작하는 과정 추가해야함

  for (let idx = 0; idx < modelData.chart.length; idx++) {
    const tmp: IRechartData = {
      name: yearAndMonthToString(graphDate),
      kospi: (kospiData[idx + diffLength - 1] / referenceValueKospi - 1) * 100,
      [modelData.name]: modelData.chart[idx],
    };
    graphDate.setMonth(graphDate.getMonth() + 1);
    ret.push(tmp);
  }
  return ret; // [{name:date, kospi:value, 모델명:value,}, ...]
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
