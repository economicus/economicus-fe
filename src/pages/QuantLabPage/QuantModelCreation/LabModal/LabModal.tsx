import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

import FormControlGroup from "../../../../components/FormControlGroup";
import ModalWithButton from "../../../../components/ModalWithButton";
import { IBusinessArea } from "../QuantModelCreation";

interface QuantLabModalProps {
  btnName: string;
  state: IBusinessArea;
  setState: React.Dispatch<React.SetStateAction<IBusinessArea>>; // NOTE: 추후 추가되면 IBusinessArea | xxx 이런 식으로? 그냥 any가 낫나?
}

export default function QuantLabModal({
  btnName,
  state,
  setState,
}: QuantLabModalProps) {
  // Select all checkBox 상태
  const [selecAll, setSelectAll] = useState(true);
  const selectAllHandleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectAll(event.target.checked);
    const newState = state;
    Object.keys(newState).forEach((key) => {
      newState[key] = event.target.checked;
    });
    setState(newState);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
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
      <FormControlGroup>
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
      </FormControlGroup>
    </ModalWithButton>
  );
}
