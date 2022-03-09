import { AppBar, Toolbar } from "@material-ui/core";
import { ChatBubble, Home, Notifications, People } from "@material-ui/icons";
import { IconButton, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Link } from "react-router-dom";

import PositionedMenu from "../components/PositionedMenu";
import SearchTextField from "../components/SearchTextField";

const LogoImage = styled("img")`
  border-radius: 5px;
  width: 40px;
  height: 40px;
  margin: 10px;
`;

const LogoTypography = styled(Typography)`
  font-family: "SongMyung";
`;

const RowContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MainContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex; // NOTE: 하단 공백 제거

  &,
  &:visited,
  &:hover,
  &:active {
    color: inherit;
  }
`;

const IconContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  /* background-color: yellow; */
`;

const MainNavigation = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static" variant="outlined" color="inherit">
        <Toolbar style={{ padding: "0 3px" }}>
          <MainContainer>
            <RowContainer>
              <StyledLink to="/">
                <LogoImage src="https://avatars.githubusercontent.com/u/98199739?s=200&v=4" />
              </StyledLink>
              <LogoTypography variant="h5">Economicus</LogoTypography>
            </RowContainer>

            <RowContainer>
              <div style={{ margin: "0 20px" }}>
                <SearchTextField />
              </div>

              <IconContainer>
                <IconButton color="inherit" aria-label="home">
                  <StyledLink to="/">
                    <Home />
                  </StyledLink>
                </IconButton>

                <IconButton color="inherit" aria-label="people">
                  <People />
                </IconButton>

                <IconButton color="inherit" aria-label="chatBubble">
                  <ChatBubble />
                </IconButton>

                <IconButton color="inherit" aria-label="notifications">
                  <Notifications />
                </IconButton>

                <PositionedMenu />
              </IconContainer>
            </RowContainer>
          </MainContainer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainNavigation;
