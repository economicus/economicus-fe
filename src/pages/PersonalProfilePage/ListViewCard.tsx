import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import axios, { Axios } from "axios";
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
  const token = useSelector((state: RootState) => state.session.token);

  const [currentModelName, setCurrentModelName] = useState(props.quant.name);
  const [currentDescription, setCurrentDescription] = useState(
    props.quant.name
  );
  const [newModelName, setNewModelName] = useState(props.quant.name);
  const [newDescription, setNewDescription] = useState(props.quant.description);
  const [editting, setEditting] = useState(false);
  const [backDrop, setBackDrop] = React.useState(false);

  const chartEl = useRef<HTMLDivElement>(null); // NOTE: 공유하기

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
        props.quant.quant_id
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
  // const uploadImgur = (image: string) => {
  //   const apiBase = "https://api.imgur.com/3/image";

  //   console.log("key>?", process.env.REACT_APP_IMGUR_CLIENT_ID);
  //   console.log(image);

  //   axios
  //     .post(
  //       apiBase,
  //       {
  //         image,
  //         type: "URL",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data.data.link);
  //     })
  //     .catch((e) => {
  //       console.log("error?", e, e.response, e.config, e.message, e.time);
  //     });
  // };

  const getKakaoFriend = () => {
    // const base = `https://kauth.kakao.com/oauth/authorize?client_id=${
    //   process.env.REACT_APP_KAKAO_REST_API_KEY
    // }&redirect_uri=${"https://economicus.pages.dev/"}&response_type=code`;
    // axios.get(base);
    // window.Kakao.
  };

  const exportAsImage = async () => {
    if (!chartEl.current) return;
    const canvas = await html2canvas(chartEl.current);
    // const image = canvas.toDataURL("image/jpeg");
    const image = canvas.toDataURL();

    console.log(window.Kakao.isInitialized());

    window.Kakao.Auth.authorize();

    // const fakeLink = window.document.createElement("a");
    // fakeLink.download = "test";
    // fakeLink.href = image;
    // document.body.appendChild(fakeLink);
    // fakeLink.click();
    // fakeLink.remove();
  };

  const shareHandelrer = () => {
    exportAsImage();
  };

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
                  defaultValue={props.quant.name}
                  variant="standard"
                  onChange={modelNameHandeler}
                />
                <StyledTextarea
                  id="description"
                  defaultValue={props.quant.description}
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
                {currentDescription.split("\n").map((line, idx) => {
                  return <Typography key={idx}>{line}</Typography>;
                })}
              </EdittingContainer>
              <Button onClick={edittingHandeler}>edit</Button>
              <Button onClick={shareHandelrer}>share</Button>
            </>
          )}
        </ModelInfo>

        <div ref={chartEl}>
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
        </div>
      </StyledCard>
    </>
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
  // TODO: 날짜 증가 함수 추가 해야함

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
