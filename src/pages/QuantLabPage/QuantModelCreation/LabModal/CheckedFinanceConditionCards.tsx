import { Card, Grid, Paper, Popover, styled, Typography } from "@mui/material";
import { useState } from "react";

import { IFinanceCondition } from "../QuantModelCreation";
import { ChangedFinanceConditionName } from "./LabModalWithSlider";
import OptionTag from "./OptionTag";

interface CheckedItemCardsProps {
  state: IFinanceCondition;
}

export default function CheckedFinanceConditionCards({
  state,
}: CheckedItemCardsProps) {
  const checkedArr = Object.entries(state).filter(([, value]) => value.checked);

  if (!checkedArr.length) return <></>;

  return (
    <Paper
      variant="outlined"
      sx={{ m: 1, p: 1, backgroundColor: "rgba(140, 166, 218, 20%)" }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        선택한 재무상태 옵션
      </Typography>

      <Grid container>
        {checkedArr.map(([objectKey, objectValue], idx) => (
          <OptionTag key={idx} {...{ objectKey, objectValue }} />
        ))}
      </Grid>
    </Paper>
  );
}
