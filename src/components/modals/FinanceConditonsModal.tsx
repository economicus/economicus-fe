import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import * as React from "react";

import { IFinance } from "../../pages/QuantLabPage/QuantLabPage";
import FinanceCheckBoxes from "../CheckBoxes/FinanceCheckBoxes";

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

interface ModalFinanceConditionsProps {
  state: IFinance;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function ModalFinanceConditions({
  state,
  setState,
}: ModalFinanceConditionsProps) {
  // export default function Modal({ name, state, setState, children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* <button type="button" onClick={handleOpen}> */}
      <Button variant="contained" onClick={handleOpen} sx={{ m: 1 }}>
        재무상태
        {/* {name} */}
      </Button>
      {/* </button> */}
      <StyledModal
        // aria-labelledby="unstyled-modal-title"
        // aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <FinanceCheckBoxes state={state} setState={setState} />
        </Box>
      </StyledModal>
    </>
  );
}
