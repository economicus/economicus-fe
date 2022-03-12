import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { IChart } from "../QuantLabPage";
import Chart from "./Chart";

interface ChartViewerProps {
  charts: IChart[];
}

export default function ChartViewerSizeUp({ charts }: ChartViewerProps) {
  return (
    <MainContainer variant="outlined">
      <Chart charts={charts} />
    </MainContainer>
  );
}

const MainContainer = styled(Paper)`
  // border: 3px solid green;
  width: 100%;
  height: 40vw;

  padding: 20px;
`;

// TODO: 아직 상태 적용 X
