import {
  Checkbox,
  FormControlLabel,
  Paper,
  Slider,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

import FormControlGroup from "../../../../components/FormControlGroup";
import ModalWithButton from "../../../../components/ModalWithButton";
import { IFinanceCondition } from "../QuantModelCreation";

interface QuantLabModalProps {
  btnName: string;
  state: IFinanceCondition;
  setState: React.Dispatch<React.SetStateAction<IFinanceCondition>>;
}
export interface IChangedFinanceConditionName {
  [key: string]: string;
}

export const ChangedFinanceConditionName: IChangedFinanceConditionName = {
  net_revenue: "매출액(억 원)",
  net_revenue_rate: "매출액 증가율(%)",
  net_profit: "순이익(억 원)",
  net_profit_rate: "순이익 증가율(%)",
  de_ratio: "부채 비율(%)",
  per: "PER(배)",
  pbr: "PBR(배)",
  dividend_yield: "현금배당수익률(%)",
  dividend_payout_ratio: "현금배당성향(%)",
  roa: "ROA(%)",
  roe: "ROE(%)",
  market_cap: "시가총액(억 원)",

  operating: "영업현금흐름(억 원)",
  investing: "투자현금흐름(억 원)",
  financing: "재무현금흐름(억 원)",
};

export default function LabModalWithSlider({
  btnName,
  state,
  setState,
}: QuantLabModalProps) {
  const [selecAll, setSelectAll] = useState(false);
  const selectAllHandleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectAll(event.target.checked);
    Object.keys(state).forEach((key) => {
      state[key].checked = event.target.checked;
      setState({
        ...state,
        [key]: {
          ...state[key],
          checked: event.target.checked,
        },
      });
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: {
        ...state[event.target.name],
        checked: event.target.checked,
      },
    });
  };

  interface SliderTarget extends HTMLElement {
    name: string;
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const target = event.target as SliderTarget;

    setState({
      ...state,
      [target.name]: {
        ...state[target.name],
        values: newValue as number[],
      },
    });
  };

  const handleInputchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetId =
      Number(event.target.id.substring(4)) % 2 ? "or over" : "or under";
    let newValues;
    if (targetId === "or over") {
      const tmp =
        Number(event.target.value) <= state[event.target.name].min
          ? state[event.target.name].min
          : event.target.value;
      newValues = [Number(tmp), Number(state[event.target.name].values[1])];
    } else {
      const tmp =
        Number(event.target.value) >= state[event.target.name].max
          ? state[event.target.name].max
          : event.target.value;
      newValues = [Number(state[event.target.name].values[0]), Number(tmp)];
    }
    setState({
      ...state,
      [event.target.name]: {
        ...state[event.target.name],
        values: newValues as number[],
      },
    });
  };

  return (
    <>
      <ModalWithButton btnName={btnName} state={state}>
        <FormControlLabel
          control={
            <Checkbox checked={selecAll} onChange={selectAllHandleChange} />
          }
          label="전체 선택"
        />

        <FormControlGroupContainer variant="outlined">
          <FormControlGroup>
            {Object.keys(state).map((key, idx) => {
              return (
                <Container key={idx}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state[key].checked}
                        onChange={handleCheckboxChange}
                        name={key}
                      />
                    }
                    label={ChangedFinanceConditionName[key]}
                    sx={{ width: 300 }}
                  />
                  {true && (
                    <>
                      <CustomizedSlider
                        value={[...state[key].values]}
                        onChange={handleSliderChange}
                        name={key}
                        min={state[key].min}
                        max={state[key].max}
                        marks={[
                          {
                            value: state[key].min,
                            label: state[key].values[0],
                          },
                          {
                            value: state[key].max,
                            label: state[key].values[1],
                          },
                        ]}
                        disabled={!state[key].checked}
                        sx={{ width: 250, mr: 2 }}
                        size="small"
                      />
                      <TextField
                        disabled={!state[key].checked}
                        type="Number"
                        value={state[key].values[0]}
                        label="or over"
                        name={key}
                        onChange={handleInputchange}
                        size="small"
                        sx={{ mx: 1 }}
                      />
                      <TextField
                        disabled={!state[key].checked}
                        type="Number"
                        value={state[key].values[1]}
                        label="or under"
                        name={key}
                        onChange={handleInputchange}
                        size="small"
                      />
                    </>
                  )}
                </Container>
              );
            })}
          </FormControlGroup>
        </FormControlGroupContainer>
      </ModalWithButton>
    </>
  );
}

const Container = styled("div")`
  display: flex;
  height: 60px;
  width: 600px;
  padding-top: 20px;
  margin-right: 50px;
  align-items: center;
`;

const CustomizedSlider = styled(Slider)`
  & .MuiSlider-valueLabelOpen {
    margin-top: 45px;
    background: none;
  }
  & .MuiSlider-valueLabelLabel {
    color: #000000;
  }
`;

const FormControlGroupContainer = styled(Paper)`
  margin: 20px 0;
  /* background-color: rgba(140, 166, 218, 20%); */
  background-color: white;
`;
