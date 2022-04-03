import { createTheme } from "@mui/material";

import Noto from "./fonts/NotoSansKR-Thin.woff";
import OrelegaOne from "./fonts/OrelegaOne-Regular.woff";
import SongMyung from "./fonts/SongMyung-Regular.woff";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5469a4",
    },
    secondary: {
      main: "#ffd740",
    },
    info: {
      main: "#8ca6da",
    },
  },
  typography: {
    allVariants: {
      fontFamily: ["Arial", "NOTO Sans KR Thin"].join(","),
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      html { overflow-y: scroll; }
      body { background-color: rgba(140, 166, 218, 20%); }

      @font-face {
        font-family: 'NOTO Sans KR Thin';
        src: url(${Noto}) format('woff');
      }
      @font-face {
        font-family: 'SongMyung';
        src: url(${SongMyung}) format('woff');
      }
      @font-face {
        font-family: 'OrelegaOne';
        src: url(${OrelegaOne}) format('woff');
      }
      `,
    },
  },
});

// body { background-color: rgba(140, 166, 218, 20%); }
// body { background: linear-gradient(to right, #d6dff2, rgba(140, 166, 218, 10%)); }
