import { Card } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import styled from "styled-components";

import Example from "../../../components/graph";
import ComparativeStockSelect from "../../../components/selecter/ComparativeStockSelect";
import TermSelect from "../../../components/selecter/TermSelect";

interface ChartViewerProps {
  selectionModel: GridSelectionModel;
}

export default function ChartViewer({ selectionModel }: ChartViewerProps) {
  return (
    <GraphContainer>
      <GraphSlectContainer>
        <ComparativeStockSelect />
        <TermSelect />
      </GraphSlectContainer>
      <Graph>
        <Example />
      </Graph>
    </GraphContainer>
  );
}

const GraphContainer = styled(Card)`
  border: 3px solid blue;
  margin: 5px;
  width: 50%;
`;

const GraphSlectContainer = styled.div`
  border: 3px solid orange;
  margin: 5px;
  display: flex;
`;

const Graph = styled.div`
  border: 3px solid green;
  margin: 5px;
  height: 300px;
  padding: 5px;
`;

// TODO: 아직 상태 적용 X
