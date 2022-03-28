import { styled } from "@mui/material/styles";

import MainNavigation from "./MainNavigation";

const Layout: React.FC = (props) => {
  return (
    <>
      <MainNavigation />
      <StyledDiv>{props.children}</StyledDiv>
    </>
  );
};

export default Layout;

const StyledDiv = styled("div")`
  padding: 20px;
  height: calc(100vh - 66px); // NOTE: 66px은 네비게이션의 높이
`;
