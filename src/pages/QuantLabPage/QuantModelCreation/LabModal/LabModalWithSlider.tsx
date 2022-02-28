import { Checkbox, FormControlLabel, Slider } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

import TmpForm from "../../../../components/FormControlGroup/FormControlGroup";
import ModalWithButton from "../../../../components/ModalWithButton/ModalWithButton";
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
  net_revenue: "매출액(?원)",
  net_revenue_rate: "매출액 증가율(%)",
  net_profit: "순이익(?원)",
  net_profit_rate: "순이익 증가율(%)",
  de_ratio: "부채 비율(%)",
  per: "PER",
  psr: "PSR",
  pbr: "PBR",
  pcr: "PCR",
  dividend_yield: "현금배당수익률(?)",
  dividend_payout_ratio: "현금배당성향(?)",
  roa: "ROA",
  roe: "ROE",
  market_cap: "시가총액(?원)",
  activities_operating: "영업현금흐름(?)",
  activities_investing: "투자현금흐름(?)",
  activities_financing: "재무현금흐름(?)",
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
    const newState = state;
    Object.keys(newState).forEach((key) => {
      newState[key].checked = event.target.checked;
    });
    setState(newState);
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
        // checked: event.target.checked,
      },
    });
  };

  return (
    <ModalWithButton btnName={btnName}>
      <FormControlLabel
        control={
          <Checkbox checked={selecAll} onChange={selectAllHandleChange} />
        }
        label="Select all"
      />
      <TmpForm>
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
                sx={{ width: 500 }}
              />
              <CustomizedSlider
                value={[...state[key].values]}
                onChange={handleSliderChange}
                name={key}
                min={state[key].min}
                max={state[key].max}
                valueLabelDisplay="on"
                disabled={!state[key].checked}
                sx={{ width: 400 }}
                size="small"
              />
            </Container>
          );
        })}
      </TmpForm>
    </ModalWithButton>
  );
}

const Container = styled.div`
  display: flex;
  width: 250px;
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
