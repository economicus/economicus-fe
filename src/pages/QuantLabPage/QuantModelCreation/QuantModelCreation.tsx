import { LoadingButton } from "@mui/lab";
import { Alert, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import createQuantModel, {
  createQuantModelBody,
} from "../../../apis/createQuantModel";
import { RootState } from "../../../stores/store";
import { IModel } from "../QuantLabPage";
import LabModal from "./LabModal/LabModal";
import LabModalWithSlider from "./LabModal/LabModalWithSlider";

interface ModelCreationProps {
  setModelList: React.Dispatch<React.SetStateAction<IModel[]>>;
}

export default function ModelCreation({ setModelList }: ModelCreationProps) {
  const token = useSelector((state: RootState) => state.session.token);

  const [error, setError] = useState<string>("");

  // NOTE: ModelName state
  const [[modelName, firstTry], setModelName] = useState(["", 1]);
  const modelNameInputRef = useRef<HTMLDivElement>(null);

  // NOTE: ButtonsContainer states
  const [businessArea, setBusinessArea] =
    useState<IBusinessArea>(initialBusinessArea);
  const [financeCondition, setFinanceCondetion] = useState<IFinanceCondition>(
    initialFinanceCondetion
  );

  // NOTE: LodingButton states
  const [isLoading, setIsLoading] = useState(false);

  // NOTE: handlers
  const onClickMakeButton = async () => {
    if (modelName.length === 0) {
      modelNameInputRef.current?.focus();
      setModelName(["", 0]);
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

    if (!token) {
      setError("로그인이 필요한 기능입니다.");
      return;
    }

    setIsLoading(true);

    try {
      const responseData = await createQuantModel(
        {
          name: modelName,
          main_sectors: Object.entries(businessArea)
            .filter(([, value]) => value === true)
            .map(([key]) => key),
          ...notActivitiesValue,
          activities: {
            ...activitiesValue,
          },
          start_date: "2016-04-30T00:00:00.000Z",
          end_date: "2021-04-30T00:00:00.000Z",
        } as createQuantModelBody,
        token
      );
      setIsLoading(false);

      if (responseData instanceof Error) throw responseData;

      setModelList((prev) => [
        ...prev,
        { id: +new Date(), model_name: modelName, ...responseData },
      ]);
      setModelName(["", 1]);
    } catch (e) {
      setError((e as AxiosError).response?.data.message);
    }
  };
  const modelNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModelName([event.target.value, 1]);
  };

  return (
    <>
      <MainContainer variant="outlined">
        {error && (
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => {
              setError("");
            }}
          >
            <Alert severity="error">{error}</Alert>
          </Snackbar>
        )}

        <Typography variant="h5">Quant Lab</Typography>
        <TextField
          id="model-name"
          label="모델명"
          variant="outlined"
          size="small"
          value={modelName}
          onChange={modelNameHandler}
          sx={{ mx: 1, mt: 1 }}
          error={modelName === "" && firstTry === 0}
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
          </ConditionButtonsContainer>

          <LoadingButton
            sx={{ m: 1 }}
            loading={isLoading}
            loadingPosition="start"
            variant="outlined"
            onClick={onClickMakeButton}
          >
            {isLoading ? "모델 생성중..." : "make model"}
          </LoadingButton>
        </ButtonsContainer>
      </MainContainer>
    </>
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
}

export interface ICheckboxWithSliderInfo {
  checked: boolean;
  min: number;
  max: number;
  values: number[];
}

/*
 * ANCHOR: styles
 */

const MainContainer = styled(Paper)`
  width: 20%;
  padding: 20px;

  display: flex;
  flex-direction: column;
`;

const ConditionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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
