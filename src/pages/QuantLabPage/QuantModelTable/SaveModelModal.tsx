import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Button, IconButton, Snackbar } from "@mui/material";
import { GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import * as React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { endpoint } from "../../../apis/endpoint";
import { RootState } from "../../../stores/store";

interface QuantLabModalProps {
  id: GridRowId;
  name: string;
}
export default function SaveModelModal({ id, name }: QuantLabModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.session.token);

  async function saveModel(id: GridRowId) {
    const body = {
      active: true,
      description: "New model description",
      name,
    };

    try {
      const res = await axios.patch(endpoint + "/quants/quant/" + id, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  }
  const onClickSaveBtn = () => {
    saveModel(id);
    handleOpen();
  };

  const onClickMoveBtn = () => {
    handleClose();
    navigate(`/`); // NOTE: 동적 라우팅
  };

  const action = (
    <>
      <Button size="small" onClick={onClickMoveBtn}>
        이동하기
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <GridActionsCellItem
        icon={<SaveIcon />}
        onClick={onClickSaveBtn}
        label="Save"
        key={2}
      />

      {createPortal(
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message="모델을 저장했습니다."
          action={action}
        />,
        document.getElementById("snackbar-root") as HTMLFormElement
      )}
    </>
  );
}
