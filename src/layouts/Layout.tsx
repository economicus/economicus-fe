import { styled } from "@mui/material";

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
  /* background-color: yellow; */
`;
