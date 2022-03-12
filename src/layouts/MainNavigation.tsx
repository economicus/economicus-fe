import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../stores/session";

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

const TextLink = styled(Link)`
  margin: 10px;
  display: inline-block;
  color: black;
  text-decoration: none;
  transition: all 0.3s;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 8px;
    transition: all 0.2s;
    background: rgba(144, 169, 219, 50%);
  }

  &:hover:after {
    width: 100%;
  }
`;

const StyledButton = styled("button")`
  border: none;
  background-color: inherit;
  font-size: 16px;
  cursor: pointer;

  margin: 10px;
  padding: 0;
  display: inline-block;
  color: black;
  text-decoration: none;
  transition: all 0.3s;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 8px;
    transition: all 0.2s;
    background: rgba(144, 169, 219, 50%);
  }

  &:hover:after {
    width: 100%;
  }
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
                  <LogoImage src="https://avatars.githubusercontent.com/u/98199739?s=200&v=4" />
                  <LogoTypography variant="h5">Economicus</LogoTypography>
                </RowContainer>
              </StyledLink>

              <MenuContainer>
                <TextLink to="/PersonalProfilePage">프로필</TextLink>
                {/* NOTE: 프로필은 삭제 가능 (home 버튼과 겹치므로) */}
                <TextLink to="/QuantLabPage">실험실</TextLink>
              </MenuContainer>
            </LeftContainer>

            <RightContainer>
              {/* <TextLink to="/QuantLabPage">로그아웃</TextLink> */}
              <StyledButton
                onClick={() => {
                  dispatch(logout());
                }}
              >
                로그아웃
              </StyledButton>
            </RightContainer>
          </MainContainer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainNavigation;
