import { LoadingButton } from "@mui/lab";
import { Alert, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import createQuantModel, {
  createQuantModelBody,
} from "../../../apis/createQuantModel";
import { RootState } from "../../../stores/store";
import { IModel } from "../QuantLabPage";
import CheckedFinanceConditionCards from "./LabModal/CheckedFinanceConditionCards";
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

    const formedFinanceCondition = Object.fromEntries(
      Object.entries(financeCondition).map(([key, value]) => [
        key,
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

          ...formedFinanceCondition,

          // ...notActivitiesValue,
          // activities: {
          //   ...activitiesValue,
          // },

          // NOTE: 날짜는 어떻게?
          start_date: "2016-04-30T00:00:00.000Z",
          end_date: "2021-04-30T00:00:00.000Z",
        } as createQuantModelBody,
        token
      );
      setIsLoading(false);

      if (responseData instanceof Error) throw responseData;

      setModelList((prev) => {
        return [
          ...prev,
          // { id: +new Date(), model_name: modelName, ...responseData },
          {
            id: responseData["quant_id"],
            name: modelName,
            ...responseData,
          },
        ];
      });

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

      <MainContainer variant="outlined">
        <Typography variant="h5">실험실</Typography>

        <FirstContainer>
          <TextField
            id="model-name"
            label="모델 이름"
            variant="outlined"
            size="small"
            value={modelName}
            onChange={modelNameHandler}
            sx={{ m: 1 }}
            error={modelName === "" && firstTry === 0}
            inputRef={modelNameInputRef}
          />
          <LabModal
            btnName="사업 분야"
            state={businessArea}
            setState={setBusinessArea}
          />
          <LabModalWithSlider
            btnName="재무상태"
            state={financeCondition}
            setState={setFinanceCondetion}
          />
          <CheckedFinanceConditionCards state={financeCondition} />
        </FirstContainer>

        <SecondContainer>
          <WarningPaper variant="outlined" sx={{ m: 1, p: 1 }}>
            <Typography variant="body2">🛠 안내를 위한 문구</Typography>
            <Typography variant="body2">
              안녕하세요. 현재 이 기능은...
            </Typography>
          </WarningPaper>

          <LoadingButton
            sx={{ m: 1 }}
            loading={isLoading}
            loadingPosition="start"
            startIcon={<></>}
            variant="contained"
            onClick={onClickMakeButton}
          >
            {isLoading ? "모델 생성중..." : "모델 만들기"}
          </LoadingButton>
        </SecondContainer>
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
  pbr: ICheckboxWithSliderInfo;
  dividend_yield: ICheckboxWithSliderInfo;
  dividend_payout_ratio: ICheckboxWithSliderInfo;
  roa: ICheckboxWithSliderInfo;
  roe: ICheckboxWithSliderInfo;
  market_cap: ICheckboxWithSliderInfo;

  // NOTE: activities
  operating: ICheckboxWithSliderInfo;
  investing: ICheckboxWithSliderInfo;
  financing: ICheckboxWithSliderInfo;
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
  width: 100%;
  height: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
`;

const FirstContainer = styled("div")`
  height: 100%;

  margin-top: 10px;

  display: flex;
  flex-direction: column;

  /* background-color: yellow; */
`;

const SecondContainer = styled("div")`
  margin-top: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WarningPaper = styled(Paper)`
  font-size: smaller;
  background-color: rgba(256, 230, 120, 30%);
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
  net_revenue: sliderStateCunstructor(-67232388, 243771415000),
  net_revenue_rate: sliderStateCunstructor(-100, 79444),
  net_profit: sliderStateCunstructor(-3292997000, 44344857000),
  net_profit_rate: sliderStateCunstructor(-22400, 179900),
  de_ratio: sliderStateCunstructor(0, 84511),
  per: sliderStateCunstructor(0, 84511),
  pbr: sliderStateCunstructor(0, 255),
  dividend_yield: sliderStateCunstructor(0, 50),
  dividend_payout_ratio: sliderStateCunstructor(-7872, 11677),
  roa: sliderStateCunstructor(-534, 253),
  roe: sliderStateCunstructor(-3640, 755),
  market_cap: sliderStateCunstructor(0, 435000),

  operating: sliderStateCunstructor(-12224149000, 67031863000),
  investing: sliderStateCunstructor(-52240453000, 4329910000),
  financing: sliderStateCunstructor(-15090222000, 16196958000),
};
