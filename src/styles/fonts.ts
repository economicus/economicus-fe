import { createGlobalStyle } from "styled-components";

import Noto from "./fonts/NotoSansKR-Thin.woff";
import OrelegaOne from "./fonts/OrelegaOne-Regular.woff";
import SongMyung from "./fonts/SongMyung-Regular.woff";

const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'NOTO Sans KR Thin';
    src: url(${Noto}) format('woff');
  } 

  @font-face {
    font-family: 'SongMyung';
    src: url(${SongMyung}) format('woff');
  } // NOTE: 테스트용 확 티나는(?) 폰트

  @font-face {
    font-family: 'OrelegaOne';
    src: url(${OrelegaOne}) format('woff');
  }
`;

export default GlobalFonts;
