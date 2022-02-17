import { Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

import makeQuantModel from "../../../apis/makeQuantModel";
import { IModel } from "../QuantLabPage";
import LabModal from "./LabModal/LabModal";
import LabModalWithSlider from "./LabModal/LabModalWithSlider";

interface ModelCreationProps {
  setModelList: React.Dispatch<React.SetStateAction<IModel[]>>;
}

export default function ModelCreation({ setModelList }: ModelCreationProps) {
  // NOTE: ButtonsContainer states
  const [businessArea, setBusinessArea] =
    useState<IBusinessArea>(initialBusinessArea);
  const [financeCondition, setFinanceCondetion] = useState<IFinanceCondition>(
    initialFinanceCondetion
  );
  // const [chartInfo, setChartInfo] = useState<IChartInfo>(initialChartInfo);

  // NOTE: handlers
  const onClickMakeButton = async () => {
    const responseData = await makeQuantModel();
    setModelList((prev) => [...prev, { id: +new Date(), ...responseData }]);
  };

  return (
    <MainContainer variant="outlined">
      <Typography variant="h5">Quant Lab</Typography>

      <ButtonsContainer>
        <ConditionButtonsContainer>
          <LabModal
            btnName="사업분야"
            state={businessArea}
            setState={setBusinessArea}
          />
          <LabModalWithSlider
            btnName="재무상태"
            state={financeCondition}
            setState={setFinanceCondetion}
          />
          {/* <LabModalWithSlider
          btnName="차트정보"
          state={chartInfo}
          setState={setChartInfo}
        /> */}
        </ConditionButtonsContainer>

        <Button sx={{ m: 1 }} variant="outlined" onClick={onClickMakeButton}>
          make model
        </Button>
      </ButtonsContainer>
    </MainContainer>
  );
}

/*
 * ANCHOR: models
 */

export interface IBusinessArea {
  [key: string]: boolean;

  에너지: boolean;
  소재: boolean;
  산업재: boolean;
  경기관련소비재: boolean;
  필수소비재: boolean;
  건강관리: boolean;
  금융: boolean;
  IT: boolean;
  커뮤니케이션서비스: boolean;
  유틸리티: boolean;
}

export interface IFinanceCondition {
  [key: string]: ICheckboxWithSliderInfo;

  PER: ICheckboxWithSliderInfo;
  PBR: ICheckboxWithSliderInfo;
}

// export interface IChartInfo {

// }

export interface ICheckboxWithSliderInfo {
  checked: boolean;
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
}

/*
 * ANCHOR: styles
 */

const MainContainer = styled(Paper)`
  /* width: 100%; */
  width: 20%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
`;

const ConditionButtonsContainer = styled.div`
  /* display: grid; */
  /* grid-template-columns: repeat(2, 1fr); */
  /* margin-top: 20px; */

  display: flex;
  flex-direction: column;
`;

// const MakeModelButtonContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
// `;

const ButtonsContainer = styled.div`
  height: 100%;
  margin-top: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

/*
 * ANCHOR: constants
 */

// NOTE: 여기에 함수를 선언하는 것이 적절한가? useMemo 등을 이때 쓰는건가?

const sliderStateCunstructor = (
  min: number,
  max: number
): ICheckboxWithSliderInfo => {
  return {
    checked: true,
    min: min,
    max: max,
    minValue: min,
    maxValue: max,
  };
};

const initialBusinessArea: IBusinessArea = {
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
