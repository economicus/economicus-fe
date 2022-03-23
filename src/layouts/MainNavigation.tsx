import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../stores/session";
import {
  HighlightedTextButton,
  HighlightedTextLink,
} from "../styles/myStyledComponents";

const LogoImage = styled("img")`
  border-radius: 5px;
  width: 40px;
  height: 40px;
`;

const LogoTypography = styled(Typography)`
  font-family: "SongMyung";
  margin-left: 10px;
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
  padding: 10px;

  &,
  &:visited,
  &:hover,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`;

const LeftContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MenuContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
`;

const RightContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 5px;
`;

const MainNavigation = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        variant="outlined"
        color="inherit"
        style={{ borderRight: "none" }}
      >
        <Toolbar style={{ padding: "0 3px" }}>
          <MainContainer>
            <LeftContainer>
              <StyledLink to="/">
                <RowContainer>
                  <LogoImage src="img/economicusLogo.png" />
                  <LogoTypography variant="h5">Economicus</LogoTypography>
                </RowContainer>
              </StyledLink>

              <MenuContainer>
                <HighlightedTextLink to="/QuantLabPage">
                  실험실
                </HighlightedTextLink>
              </MenuContainer>
            </LeftContainer>

            <RightContainer>
              {/* <TextLink to="/QuantLabPage">로그아웃</TextLink> */}
              <HighlightedTextButton
                onClick={() => {
                  dispatch(logout());
                }}
              >
                로그아웃
              </HighlightedTextButton>
            </RightContainer>
          </MainContainer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainNavigation;
