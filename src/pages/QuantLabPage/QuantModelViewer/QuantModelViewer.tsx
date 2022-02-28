import { Paper } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import styled from "styled-components";

import Graph from "../../../components/graph";
import { IModel } from "../QuantLabPage";

export interface tmpModel {
  id: number;
  model_name: string;
  chart_data: {
    start_date: string;
    profit_kospi_data: number[];
    profit_rate_data: number[];
  };
}
interface ChartViewerProps {
  models: tmpModel[];
}

export default function ChartViewer({ models }: ChartViewerProps) {
  return (
    <MainContainer variant="outlined">
      {/* <Example /> */}
      <Graph models={models} />
    </MainContainer>
  );
}

const MainContainer = styled(Paper)`
  // border: 3px solid green;
  width: 79%;

  padding: 20px;
`;

// TODO: 아직 상태 적용 X
