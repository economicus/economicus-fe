import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";

export const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    margin: "2em auto",
    width: "70%",
    maxWidth: 800,
  },
}));

export const StyledTab = styled(Tab)(() => ({
  fontSize: "1.2em",
}));
