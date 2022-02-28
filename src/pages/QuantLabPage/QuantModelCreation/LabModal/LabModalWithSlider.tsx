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
          if (state[key].checked) {
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
                  label={key}
                  sx={{ width: 500 }}
                />
                <Slider
                  value={[...state[key].values]}
                  onChange={handleSliderChange}
                  name={key}
                  min={state[key].min}
                  max={state[key].max}
                  marks={[
                    { value: state[key].min, label: state[key].min },
                    { value: state[key].max, label: state[key].max },
                  ]}
                  valueLabelDisplay="auto"
                  disabled={!state[key].checked}
                  sx={{ width: 400 }}
                  size="small"
                />
              </Container>
            );
          } else {
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
                  label={key}
                  sx={{ width: 500 }}
                />
              </Container>
            );
          }
        })}
      </TmpForm>
    </ModalWithButton>
  );
}

const Container = styled.div`
  display: flex;
  height: 60px;
  width: 250px;
  padding-top: 20px;
  margin-right: 50px;
  align-items: center;
`;
