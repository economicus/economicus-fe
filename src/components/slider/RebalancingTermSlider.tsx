import { Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";

const RebalancingTermSlider = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography>리밸런싱 주기</Typography>
      <Slider
        aria-label="rebalancingTerm"
        defaultValue={1}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={12}
        size="small"
      />
    </Box>
  );
};

export default RebalancingTermSlider;
