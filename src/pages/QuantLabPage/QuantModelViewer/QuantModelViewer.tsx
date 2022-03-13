import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { IChart } from "../QuantLabPage";
import Chart from "./Chart";

interface ChartViewerProps {
  charts: IChart[];
}

export default function ChartViewer({ charts }: ChartViewerProps) {
  return (
    <MainContainer variant="outlined">
      <Chart charts={charts} />
    </MainContainer>
  );
}

const MainContainer = styled(Paper)`
  width: 79%;
  padding: 20px;
`;
