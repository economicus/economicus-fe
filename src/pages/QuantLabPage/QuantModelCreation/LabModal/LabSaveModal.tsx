import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { GridRowId } from "@mui/x-data-grid";
import { useState } from "react";
import * as React from "react";

interface QuantLabModalProps {
  id: GridRowId;
}
export default function QuantLabSaveModal({ id }: QuantLabModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("asdfasdfasdf", id);
  handleOpen;
  return (
    <>
      <StyledModal
        // aria-labelledby="unstyled-modal-title"
        // aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <Typography>"hello"</Typography>
        </Box>
      </StyledModal>
    </>
  );
}

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
};
