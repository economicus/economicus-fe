import { Checkbox, FormControlLabel, Slider } from "@mui/material";
import { useState } from "react";
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
  const [selecAll, setSelectAll] = useState(true);
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
    console.log(newValue);

    const castedNewValue = newValue as number[];
    const [minValue, maxValue] = castedNewValue;
    const target = event.target as SliderTarget;

    // if (event.target.name as string) return;

    setState({
      ...state,
      [target.name]: {
        ...state[target.name],
        minValue,
        maxValue,
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
                label={key}
              />
              <Slider
                // getAriaLabel={() => "Temperature range"}
                value={[state[key].minValue, state[key].maxValue]}
                onChange={handleSliderChange}
                name={key}
                valueLabelDisplay="auto"
                // getAriaValueText={valuetext}
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
  width: 200px;
`;
