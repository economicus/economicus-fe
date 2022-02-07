import { Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";

const NumberOfStocks = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography>보유 종목 수</Typography>
      <Slider
        aria-label="numberOfStocks"
        defaultValue={20}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={50}
        size="small"
      />
    </Box>
  );
};

export default NumberOfStocks;
