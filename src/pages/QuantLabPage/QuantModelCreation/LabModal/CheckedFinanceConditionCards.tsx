import { Card, Grid, Popover, Typography } from "@mui/material";
import { useState } from "react";

import { IFinanceCondition } from "../QuantModelCreation";
import { ChangedFinanceConditionName } from "./LabModalWithSlider";

interface CheckedItemCardsProps {
  state: IFinanceCondition;
}

export default function CheckedFinanceConditionCards({
  state,
}: CheckedItemCardsProps) {
  return (
    <Grid container sx={{ mt: 1 }}>
      {Object.keys(state).map((key, idx) => {
        const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

        const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
        };

        const handlePopoverClose = () => {
          setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        if (state[key].checked) {
          return (
            <div key={idx}>
              <Card
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{
                  px: 1,
                  m: 0.3,
                  fontSize: "small",
                }}
              >
                {ChangedFinanceConditionName[key].substring(
                  0,
                  ChangedFinanceConditionName[key].indexOf("(")
                )}
              </Card>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>
                  {state[key].values[0] + " ~ " + state[key].values[1]}
                </Typography>
              </Popover>
            </div>
          );
        }
      })}
    </Grid>
  );
}
