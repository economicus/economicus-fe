import { Paper } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import styled from "styled-components";

import Example from "../../../components/graph";

interface ChartViewerProps {
  selectionModel: GridSelectionModel;
}

export default function ChartViewer({ selectionModel }: ChartViewerProps) {
  return (
    <MainContainer variant="outlined">
      <Example />
    </MainContainer>
  );
}

const MainContainer = styled(Paper)`
  // border: 3px solid green;
  width: 79%;

  padding: 20px;
`;

// TODO: 아직 상태 적용 X
