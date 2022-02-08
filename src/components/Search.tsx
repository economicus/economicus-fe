import * as React from "react";
import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Wrapper, StyledTab } from "./Search.styled";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        </>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SearchTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const viewportSize = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Wrapper>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs
            variant={viewportSize ? "fullWidth" : "standard"}
            value={value}
            onChange={handleChange}
            aria-label="options"
          >
            <StyledTab label="전체" {...a11yProps(0)} />
            <StyledTab label="전략" {...a11yProps(1)} />
            <StyledTab label="닉네임" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          전체
        </TabPanel>
        <TabPanel value={value} index={1}>
          전략
        </TabPanel>
        <TabPanel value={value} index={2}>
          유저
        </TabPanel>
      </Box>
    </Wrapper>
  );
}
