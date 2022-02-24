import { Button, Paper, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import styled from "styled-components";

import createQuantModel, {
  createQuantModelParam,
} from "../../../apis/createQuantModel";
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
  // NOTE: ModelName state
  const [modelName, setModelName] = useState<string>("");
  const modelNameInputRef = useRef<HTMLDivElement>(null);

  // const [chartInfo, setChartInfo] = useState<IChartInfo>(initialChartInfo);

  // NOTE: handlers
  const onClickMakeButton = async () => {
    if (modelName.length === 0) {
      modelNameInputRef.current?.focus();
      return;
    }

    const notActivitiesValue = Object.fromEntries(
      Object.entries(financeCondition)
        .filter(([key]) => !key.startsWith("activities_"))
        .map(([key, value]) => [
          key,
          { min: value.values[0], max: value.values[1] },
        ])
    );

    const activitiesValue = Object.fromEntries(
      Object.entries(financeCondition)
        .filter(([key]) => key.startsWith("activities_"))
        .map(([key, value]) => [
          key.split("_")[1],
          { min: value.values[0], max: value.values[1] },
        ])
    );

    // console.log(activities);

    const responseData = await createQuantModel({
      name: modelName,
      main_sector: Object.entries(businessArea)
        .filter(([, value]) => value === true)
        .map(([key]) => key),
      ...notActivitiesValue,
      activities: {
        ...activitiesValue,
      },
    } as createQuantModelParam);

    setModelList((prev) => [...prev, { id: +new Date(), ...responseData }]);
  };
  const modelNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModelName(event.target.value);
  };

  return (
    <MainContainer variant="outlined">
      <Typography variant="h5">Quant Lab</Typography>
      <TextField
        id="model-name"
        label="모델명"
        variant="outlined"
        size="small"
        value={modelName}
        onChange={modelNameHandler}
        sx={{ mx: 1, mt: 1 }}
        inputRef={modelNameInputRef}
      />

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

  net_revenue: ICheckboxWithSliderInfo;
  net_revenue_rate: ICheckboxWithSliderInfo;
  net_profit: ICheckboxWithSliderInfo;
  net_profit_rate: ICheckboxWithSliderInfo;
  de_ratio: ICheckboxWithSliderInfo;
  per: ICheckboxWithSliderInfo;
  psr: ICheckboxWithSliderInfo;
  pbr: ICheckboxWithSliderInfo;
  pcr: ICheckboxWithSliderInfo;
  dividend_yield: ICheckboxWithSliderInfo;
  dividend_payout_ratio: ICheckboxWithSliderInfo;
  roa: ICheckboxWithSliderInfo;
  roe: ICheckboxWithSliderInfo;
  market_cap: ICheckboxWithSliderInfo;
  activities_operating: ICheckboxWithSliderInfo;
  activities_investing: ICheckboxWithSliderInfo;
  activities_financing: ICheckboxWithSliderInfo;

  // acti: ICheckboxWithSliderInfo;
  // ROA: ICheckboxWithSliderInfo;
  // 부채비율: ICheckboxWithSliderInfo;
} // TODO: chart info에 들어갈 항목들이 뭘까? 그리고 한글로는 뭐라고 나타내야 하나?(몰라서 api 변수명 그대로 함)

// export interface IChartInfo {

// }

export interface ICheckboxWithSliderInfo {
  checked: boolean;
  min: number;
  max: number;
  // minValue: number;
  // maxValue: number;
  values: number[];
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
    checked: false,
    min: min,
    max: max,
    // minValue: min,
    // maxValue: max,
    values: [min, max],
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
  net_revenue: sliderStateCunstructor(-100, 100),
  net_revenue_rate: sliderStateCunstructor(-100, 100),
  net_profit: sliderStateCunstructor(-100, 100),
  net_profit_rate: sliderStateCunstructor(-100, 100),
  de_ratio: sliderStateCunstructor(-100, 100),
  per: sliderStateCunstructor(-100, 100),
  psr: sliderStateCunstructor(-100, 100),
  pbr: sliderStateCunstructor(-100, 100),
  pcr: sliderStateCunstructor(-100, 100),
  dividend_yield: sliderStateCunstructor(-100, 100),
  dividend_payout_ratio: sliderStateCunstructor(-100, 100),
  roa: sliderStateCunstructor(-100, 100),
  roe: sliderStateCunstructor(-100, 100),
  market_cap: sliderStateCunstructor(-100, 100),
  activities_operating: sliderStateCunstructor(-100, 100),
  activities_investing: sliderStateCunstructor(-100, 100),
  activities_financing: sliderStateCunstructor(-100, 100),
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
