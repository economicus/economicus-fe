import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Button, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import * as React from "react";

interface QuantLabModalProps {
  btnName: string;
  children: React.ReactNode;
}

export default function ModalWithButton({
  btnName,
  children,
}: QuantLabModalProps) {
  // NOTE: 변수명 수정 필요

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen} sx={{ m: 1 }}>
        {btnName}
      </Button>
      <StyledModal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <StyledPaper elevation={12}>
          {children}
          <ButtonContainer>
            <Button variant="contained" onClick={handleClose}>
              확인
            </Button>
          </ButtonContainer>
        </StyledPaper>
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

const StyledPaper = styled(Paper)`
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled("div")`
  display: flex;
  justify-content: end;
`;
