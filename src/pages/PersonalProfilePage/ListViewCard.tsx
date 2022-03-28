import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
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
  const [currentDescription, setCurrentDescription] = useState(
    modelData.description
  );
  const [newModelName, setNewModelName] = useState(modelData.name);
  const [newDescription, setNewDescription] = useState(modelData.description);
  const [editting, setEditting] = useState(false);
  const [backDrop, setBackDrop] = React.useState(false);

  const chartEl = useRef<HTMLDivElement>(null); // NOTE: 공유하기
  const token = useSelector((state: RootState) => state.session.token);

  // const modelNameHandeler = (event: React.ChangeEvent<HTMLInputElement>) => {
  const modelNameHandeler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      setCurrentModelName(newModelName);
      setCurrentDescription(newDescription);
    } catch (e) {
      alert(e);
    }
    setBackDrop(false);
    setEditting(!editting);
  };

  // NOTE: 공유하기

  const shareHandelrer = async () => {
    if (!chartEl.current) return;

    const canvas = await html2canvas(chartEl.current, {
      x: 20,
      y: -125,
      height: 500,
      scrollY: -window.scrollY,
    });

    // NOTE: 이미지 출력 테스트용
    // const image = canvas.toDataURL("image/jpeg", 0.5);
    // console.log(image);

    canvas.toBlob(async (blob) => {
      if (!window.Kakao.isInitialized()) return;

      const uploadedImage = await window.Kakao.Link.uploadImage({
        file: [blob],
      });

      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: modelData.name,
          description: modelData.description,
          imageUrl: uploadedImage.infos.original.url,
          link: {
            webUrl: uploadedImage.infos.original.url,
            mobileWebUrl: uploadedImage.infos.original.url,
          },
        },
        // social: {
        //   likeCount: 286,
        //   commentCount: 45,
        //   sharedCount: 845,
        // },
        buttons: [
          {
            title: "이코노미쿠스 바로가기",
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              webUrl: "https://developers.kakao.com",
            },
          },
        ],
      });
    });
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <StyledCard variant="outlined">
        <ModelInfo>
          {editting && (
            <>
              <EdittingContainer>
                {/* <ModelNameTextFiled */}

                <TextField
                  required
                  label="모델명"
                  defaultValue={currentModelName}
                  onChange={modelNameHandeler}
                  size="small"
                />

                <TextField
                  label="모델 설명"
                  defaultValue={currentDescription}
                  onChange={descriptionHandeler}
                  multiline
                  size="small"
                  rows={6}
                  style={{ margin: "13px 0" }}
                />

                {/* <StyledTextarea
                  id="description"
                  defaultValue={currentDescription}
                  onChange={descriptionHandeler}
                /> */}
              </EdittingContainer>

              <div style={{ display: "flex" }}>
                <Button
                  onClick={submitHandeler}
                  variant="outlined"
                  sx={{ m: 1 }}
                >
                  저장
                </Button>
                <Button
                  onClick={edittingHandeler}
                  variant="outlined"
                  sx={{ m: 1 }}
                >
                  취소
                </Button>
              </div>
            </>
          )}
          {!editting && (
            <>
              <EdittingContainer
                style={{ maxHeight: "100%", overflow: "auto" }}
              >
                <Typography variant="h5" mb={1}>
                  {currentModelName}
                </Typography>

                {currentDescription.split("\n").map((line, idx) => {
                  return <Typography key={idx}>{line}</Typography>;
                })}
              </EdittingContainer>

              <div style={{ display: "flex" }}>
                <Button
                  onClick={edittingHandeler}
                  variant="outlined"
                  sx={{ m: 1 }}
                >
                  수정
                </Button>
                <Button
                  onClick={shareHandelrer}
                  variant="outlined"
                  sx={{ m: 1 }}
                >
                  공유하기
                </Button>
              </div>
            </>
          )}
        </ModelInfo>

        <ChartContainer ref={chartEl} variant="outlined">
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
            {/* <Line dataKey="kospi" dot={false} stroke={generateColor("kospi")} /> */}
            <Line
              dataKey={modelData.name}
              dot={false}
              stroke={generateColor(modelData.name)}
            />
          </LineChart>
        </ChartContainer>
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
  /* height: 250px; */
  padding: 10px;
  margin-bottom: 10px;

  justify-content: space-between;
`;

const ModelInfo = styled("div")`
  width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EdittingContainer = styled("div")`
  height: 200px;
  display: flex;
  flex-direction: column;
  margin: 10px;
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

const ChartContainer = styled(Paper)`
  padding: 10px;
  /* margin-left: -20px; */
  /* padding-left: -15px; */
`;
