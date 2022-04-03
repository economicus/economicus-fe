import { Card, Popover, Typography } from "@mui/material";
import { useState } from "react";

import { ICheckboxWithSliderInfo } from "../QuantModelCreation";
import { ChangedFinanceConditionName } from "./LabModalWithSlider";

interface OptionTagProps {
  objectKey: string;
  objectValue: ICheckboxWithSliderInfo;
}

export default function OptionTag({
  objectKey: key,
  objectValue: value,
}: OptionTagProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
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
          {value.values[0] + " ~ " + value.values[1]}
        </Typography>
      </Popover>
    </>
  );
}
