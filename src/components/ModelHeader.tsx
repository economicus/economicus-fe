import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ShareIcon from "@mui/icons-material/Share";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { Link } from "react-router-dom";

export default function ModelHeader(props: any) {
  return (
    <Box sx={{ flexGrow: 1 }} display="flex" alignItems="center">
      <Box
        alignItems="center"
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "flex-start",
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Typography component="h1" sx={{ ml: 2, mr: 2 }}>
          모델 이름
        </Typography>
        <Button variant="outlined">
          <FavoriteIcon />
          <Typography component="div" sx={{ ml: 2, mr: 2 }}>
            1
          </Typography>
        </Button>
        <Typography component="div" sx={{ ml: 2, mr: 2 }}>
          제작자 이름
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {props.state === true ? (
          <Button component={Link} variant="outlined" to="/QuantModelListPage">
            <FormatListBulletedIcon />
            <Typography component="div" sx={{ ml: 2, mr: 2 }}>
              현재 종목 확인
            </Typography>
          </Button>
        ) : (
          <Button
            component={Link}
            variant="outlined"
            to="/QuantModelDetailsPage"
          >
            <FormatListBulletedIcon />
            <Typography component="div" sx={{ ml: 2, mr: 2 }}>
              모델 그래프 보기
            </Typography>
          </Button>
        )}
        {/* TODO:현재 화면에 따라 변경해야함 */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="Share"
          sx={{
            mr: 1,
            ml: 1,
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          <ShareIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="DeleteForever"
          sx={{
            mr: 1,
            ml: 1,
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
