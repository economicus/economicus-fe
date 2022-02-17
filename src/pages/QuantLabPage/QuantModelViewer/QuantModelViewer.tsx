import { GridSelectionModel } from "@mui/x-data-grid";
import styled from "styled-components";

import Example from "../../../components/graph";

interface ChartViewerProps {
  selectionModel: GridSelectionModel;
}

export default function ChartViewer({ selectionModel }: ChartViewerProps) {
  return (
    <Graph>
      <Example />
    </Graph>
  );
}

const Graph = styled.div`
  // border: 3px solid green;
  width: 100%;
  // margin: 5px;
  height: 700px;
  padding: 5px;
`;

// TODO: 아직 상태 적용 X
