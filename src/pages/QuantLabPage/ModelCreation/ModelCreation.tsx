import {
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

import makeQuantModel from "../../../apis/makeQuantModel";
import LabSlider from "../../../components/slider/LabSlider";
import { IModel } from "../QuantLabPage";
import QuantLabModal from "./QuantLabModal/QuantLabModal";

const StyledContainer = styled(Card)`
  border: 3px solid red;
  margin: 5px;
  width: 50%;
`;

interface ModelCreationProps {
  setModelList: React.Dispatch<React.SetStateAction<IModel[]>>;
}

export interface CheckboxWithSliderInfo {
  checked: boolean;
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
}

const sliderStateCunstructor = (
  min: number,
  max: number
): CheckboxWithSliderInfo => {
  return {
    checked: true,
    min: min,
    max: max,
    minValue: min,
    maxValue: max,
  };
};

const initialBusinessArea = {
  에너지: true,
  소재: true,
  산업재: true,
  경기관련소비재: true,
  필수소비재: true,
  건강관리: true,
  금융: true,
  IT: true,
  커뮤니케이션서비스: true,
  유틸리티: true,
};

const initialFinanceCondetion = {
  PER: sliderStateCunstructor(1, 10),
  PBR: sliderStateCunstructor(3, 7),

  // PER: true,
  // PBR: false,
  // PSR: false,
  // PCR: false,
  // 시가배당률: false,
  // 배당성향: false,
  // "매출액 증가율": false,
  // "순이익 증가율": false,
  // ROE: false,
  // ROA: false,
  // 부채비율: false,
};

// const initialChartInfo = {
//   시가총액: true,
//   "주가수익률(1개월)": false,
//   "주가수익률(3개월)": false,
//   "주가수익률(6개월)": false,
//   "주가수익률(12개월)": false,
//   "이동평균선(5일)": false,
//   "이동평균선(20일)": false,
//   "이동평균선(60일)": false,
//   "이동평균선(120일)": false,
// };

export default function ModelCreation({ setModelList }: ModelCreationProps) {
  const [rebalancingTerm, setRebalancingTerm] = useState<number | string>(1);
  const [numberOfHoldings, setNumberOfHoldings] = useState<number | string>(1);

  const [businessArea, setBusinessArea] = useState(initialBusinessArea);
  const [financeCondetion, setFinanceCondetion] = useState<{
    [key: string]: any;
    PER: CheckboxWithSliderInfo;
    PBR: CheckboxWithSliderInfo;
  }>(initialFinanceCondetion);
  // const [chartInfo, setChartInfo] = useState(initialChartInfo);

  const onClickMakeButton = async () => {
    const responseData = await makeQuantModel();
    // setModelTableRows((prev) => [...prev, data]);
    setModelList((prev) => [...prev, { id: +new Date(), ...responseData }]);
  };

  return (
    <StyledContainer>
      <Container sx={{ px: "5%" }}>
        <h3>Quant Lab</h3>
        <LabSlider
          name={"리밸런싱 주기"}
          min={1}
          max={12}
          value={rebalancingTerm}
          setValue={setRebalancingTerm}
        />
        <LabSlider
          name={"보유 종목 수"}
          min={1}
          max={12}
          value={numberOfHoldings}
          setValue={setNumberOfHoldings}
        />
      </Container>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          p: 3,
        }}
      >
        <QuantLabModal
          btnName="사업분야"
          state={businessArea}
          setState={setBusinessArea}
        >
          <Typography>test</Typography>
        </QuantLabModal>

        {/* <QuantLabModal
          btnName="차트정보"
          state={chartInfo}
          setState={setChartInfo}
        >
          <Typography>test</Typography>
        </QuantLabModal> */}

        <QuantLabModal
          btnName="재무상태"
          state={financeCondetion}
          setState={setFinanceCondetion}
        >
          {/* <Typography>test</Typography> */}

          {Object.keys(financeCondetion).map((key, idx) => {
            console.log("hi", key, idx, financeCondetion[key]);

            // return (
            //   <FormControlLabel
            //     key={idx}
            //     control={
            //       <Checkbox
            //         checked={state[key]}
            //         onChange={handleChange}
            //         name={key}
            //       />
            //     }
            //     label={key}
            //   />
            // );
          })}
        </QuantLabModal>
      </Box>

      <Button onClick={onClickMakeButton}>tmp make model</Button>
    </StyledContainer>
  );
}
/*
{Object.keys(state).map((key, idx) => {
  return (
    <FormControlLabel
      key={idx}
      control={
        <Checkbox
          checked={state[key]}
          onChange={handleChange}
          name={key}
        />
      }
      label={key}
    />
  );
})}
*/
