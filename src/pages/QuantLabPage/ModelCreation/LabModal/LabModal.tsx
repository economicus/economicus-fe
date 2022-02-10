import { Checkbox, FormControlLabel, Slider } from "@mui/material";

import TmpForm from "../../../../components/FormControlGroup/FormControlGroup";
import ModalWithButton from "../../../../components/ModalWithButton/ModalWithButton";
import { IBusinessArea } from "../ModelCreation";

interface QuantLabModalProps {
  btnName: string;
  state: IBusinessArea;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function QuantLabModal({
  btnName,
  state,
  setState,
}: QuantLabModalProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <ModalWithButton btnName={btnName}>
      <TmpForm>
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
      </TmpForm>
    </ModalWithButton>
  );
}
