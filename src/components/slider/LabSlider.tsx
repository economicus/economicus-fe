import { Input, Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface SliderProps {
  name: string;
  max: number;
  value: number | string;
  setValue: (newValue: number | string) => void;
}

const LabSlider: React.FC<SliderProps> = (props) => {
  const handleChange = (event: Event, newValue: number | number[]): void => {
    props.setValue(newValue as number);
  };
  const handleBlur = () => {
    if (props.value < 0) {
      props.setValue(0);
    } else if (props.value > props.max) {
      props.setValue(props.max);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value === "" ? "" : Number(event.target.value));
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Typography>{props.name}</Typography>
      <Slider
        aria-label={props.name}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={props.max}
        size="small"
        value={typeof props.value === "number" ? props.value : 0}
        onChange={handleChange}
      />
      <Input
        value={props.value}
        size="small"
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          step: 1,
          min: 0,
          max: props.max,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
      />
    </Box>
  );
};

export default LabSlider;
