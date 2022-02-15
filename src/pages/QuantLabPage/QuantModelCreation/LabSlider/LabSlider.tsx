import { Grid, Slider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface SliderProps {
  name: string;
  min: number;
  max: number;
  value: number | string;
  setValue: (newValue: number | string) => void;
}

const LabSlider: React.FC<SliderProps> = (props) => {
  const handleChange = (event: Event, newValue: number | number[]): void => {
    props.setValue(newValue as number);
  };
  const handleValue = () => {
    if (props.value < 0) {
      props.setValue(0);
    } else if (props.value > props.max) {
      props.setValue(props.max);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value === "" ? "" : Number(event.target.value));
  };
  const marks = [
    {
      value: props.min,
      label: props.min,
    },
    {
      value: props.max,
      label: props.max,
    },
  ];

  return (
    <Box sx={{ width: "95%", mx: "10px" }}>
      <Typography>{props.name}</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            aria-label={props.name}
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={props.min}
            max={props.max}
            size="small"
            value={typeof props.value === "number" ? props.value : 0}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={{ width: "80px" }}>
          <TextField
            value={props.value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleValue}
            inputProps={{
              step: 1,
              min: props.min,
              max: props.max,
              "aria-labelledby": "input-slider",
              style: { textAlign: "center" },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LabSlider;
