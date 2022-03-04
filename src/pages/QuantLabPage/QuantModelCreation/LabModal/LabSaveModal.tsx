import { Close, Save } from "@material-ui/icons";
import { Button, IconButton, Snackbar } from "@mui/material";
import { GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import { useState } from "react";
import * as React from "react";
import { createPortal } from "react-dom";

interface QuantLabModalProps {
  id: GridRowId;
}
export default function QuantLabSaveModal({ id }: QuantLabModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClickSaveBtn = () => {
    handleOpen();
  };

  const onClickMoveBtn = () => {
    handleClose();
    console.log("id", id); // TODO: 동적 라우팅
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
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <GridActionsCellItem
        icon={<Save />}
        onClick={onClickSaveBtn}
        label="Save"
        key={2}
      />

      {createPortal(
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="모델을 저장했습니다."
          action={action}
        />,
        document.getElementById("snackbar-root") as HTMLFormElement
      )}

      {/* <StyledModal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <Typography>{id}</Typography>
        </Box>
      </StyledModal> */}
    </>
  );
}

// const StyledModal = styled(ModalUnstyled)`
//   position: fixed;
//   z-index: 1300;
//   right: 0;
//   bottom: 0;
//   top: 0;
//   left: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Backdrop = styled("div")`
//   z-index: -1;
//   position: fixed;
//   right: 0;
//   bottom: 0;
//   top: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   -webkit-tap-highlight-color: transparent;
// `;

// const style = {
//   width: 700,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   p: 2,
//   px: 4,
//   pb: 3,
// };
