import { Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

import makeQuantModel from "../../../apis/makeQuantModel";
import { IModel } from "../QuantLabPage";
import LabModal from "./LabModal/LabModal";
import LabModalWithSlider from "./LabModal/LabModalWithSlider";
import LabSlider from "./LabSlider/LabSlider";

interface ModelCreationProps {
  setModelList: React.Dispatch<React.SetStateAction<IModel[]>>;
}

export default function ModelCreation({ setModelList }: ModelCreationProps) {
  // NOTE: SlidersContainer states
  const [rebalancingTerm, setRebalancingTerm] = useState<number | string>(1);
  const [numberOfHoldings, setNumberOfHoldings] = useState<number | string>(1);

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
    <MainContainer>
      <Typography variant="h5">Quant Lab</Typography>

      <SlidersContainer>
        <LabSlider
          name="리밸런싱 주기"
          min={1}
          max={12}
          value={rebalancingTerm}
          setValue={setRebalancingTerm}
        />
        <LabSlider
          name="보유 종목 수"
          min={1}
          max={12}
          value={numberOfHoldings}
          setValue={setNumberOfHoldings}
        />
      </SlidersContainer>

      <ButtonsContainer>
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
      </ButtonsContainer>

      <Button onClick={onClickMakeButton}>tmp make model</Button>
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
  /* border: 3px solid red; */
  width: 50%;
  margin: 5px;
  padding: 20px;
`;

const SlidersContainer = styled.div`
  margin-top: 20px;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 20px;
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
