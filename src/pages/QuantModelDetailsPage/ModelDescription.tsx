import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Card, IconButton } from "@mui/material";

const ModelDescription = () => {
  return (
    <Card sx={{ minWidth: 275, minHeight: 275 }}>
      <Box sx={{ flexGrow: 1 }} display="flex" alignItems="center">
        <Box
          alignItems="center"
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "flex-start",
            m: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          모델 설명
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            m: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="correction"
            sx={{
              mr: 1,
              ml: 1,
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <BorderColorIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} display="flex" alignItems="center">
        <Box
          alignItems="center"
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "flex-start",
            m: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          모델에 대한 설명을 자유롭게 적어주세요!
        </Box>
      </Box>
    </Card>
  );
};

export default ModelDescription;
