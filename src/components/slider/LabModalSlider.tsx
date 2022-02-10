import { FormControl, FormGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import * as React from "react";

import { IChartInfo } from "../../pages/QuantLabPage/QuantLabPage";

function valuetext(value: number) {
  return `${value}°C`;
}

interface ModalChartInfoProps {
  state: IChartInfo;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function RangeSlider({ state, setState }: ModalChartInfoProps) {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormGroup
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {Object.keys(state).map((key, idx) => {
          if (state[key]) {
            return (
              <Box sx={{ width: 250, m: 1 }}>
                <Typography id="input-slider" gutterBottom>
                  {key}
                </Typography>
                <Slider
                  getAriaLabel={() => "Temperature range"}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
              </Box>
            );
          }
        })}
      </FormGroup>

      {/* <FormHelperText>Be careful</FormHelperText> */}
    </FormControl>
  );
}
