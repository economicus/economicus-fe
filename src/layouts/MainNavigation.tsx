import { AppBar, Toolbar } from "@material-ui/core";
import { ChatBubble, Home, Notifications, People } from "@material-ui/icons";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PositionedMenu from "../components/PositionedMenu";
import SearchTextField from "../components/SearchTextField";

const EconomicusLogo = styled("img")({
  borderRadius: 5,
  width: 50,
  height: 50,
  margin: 10,
});

const MainNavigation = () => {
  return (
    // <nav>
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Link to="/">
          <EconomicusLogo src="https://avatars.githubusercontent.com/u/98199739?s=200&v=4" />
        </Link>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5">Economicus</Typography>
        </Box>
        <SearchTextField />
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{
            mr: 1,
            ml: 1,
            "&:hover": { backgroundColor: "transparent" },
          }}
          href="/"
        >
          <Home />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="people"
          sx={{
            mr: 1,
            ml: 1,
            "&:hover": { backgroundColor: "transparent" },
          }}
          href="/"
        >
          <People />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="chatBubble"
          sx={{
            mr: 1,
            ml: 1,
            "&:hover": { backgroundColor: "transparent" },
          }}
          href="/"
        >
          <ChatBubble />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="notifications"
          sx={{
            mr: 1,
            ml: 1,
            "&:hover": { backgroundColor: "transparent" },
          }}
          href="/"
        >
          <Notifications />
        </IconButton>
        <PositionedMenu />
      </Toolbar>
    </AppBar>
    // </Box>
    // </nav>
  );
};

export default MainNavigation;
