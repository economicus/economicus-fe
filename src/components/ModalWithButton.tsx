import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Badge, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import * as React from "react";

import {
  IBusinessArea,
  IFinanceCondition,
} from "../pages/QuantLabPage/QuantModelCreation/QuantModelCreation";

interface QuantLabModalProps {
  btnName: string;
  state: IBusinessArea | IFinanceCondition;
  children: React.ReactNode;
}

export default function ModalWithButton({
  btnName,
  state,
  children,
}: QuantLabModalProps) {
  // NOTE: 변수명 수정 필요

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getBadgeCoount = (state: IBusinessArea | IFinanceCondition) => {
    let count: number;
    count = 0;
    if ("에너지" in state) {
      for (const keys in state) {
        const value = state[keys];
        if (value === true) count++;
      }
    } else if ("net_revenue" in state) {
      for (const keys in state) {
        const value = state[keys].checked;
        if (value === true) count++;
      }
    }
    return count;
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} sx={{ m: 1 }}>
        {btnName}
        <CountBadge badgeContent={getBadgeCoount(state)} color="info" />
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

  background-color: #e8edf7;
`;

const ButtonContainer = styled("div")`
  display: flex;
  justify-content: end;
`;

const CountBadge = styled(Badge)`
  position: absolute;
  margin-left: 95%;
  margin-bottom: 15%;
`;
