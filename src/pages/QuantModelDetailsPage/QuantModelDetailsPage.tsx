import { GridSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import styled from "styled-components";

import ModelHeader from "../../components/ModelHeader";
import { IModel } from "../QuantLabPage/QuantLabPage";
import { tmpModel } from "../QuantLabPage/QuantModelViewer/QuantModelViewer";
import ChartViewerSizeUp from "../QuantLabPage/QuantModelViewer/QuantModelViewerSizeUp";
import ModelDescription from "./ModelDescription";

const QuantModelDetailsPage = () => {
  const [modelList, setModelList] = useState<IModel[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const models: tmpModel[] = modelList
    .filter((val) => selectionModel.includes(val.id))
    .map((val) => {
      const { id, model_name, chart_data } = val;
      return { id, model_name, chart_data };
    });

  return (
    <MainContainer>
      <ModelHeader state={true} />
      <ChartViewerSizeUp {...{ models }} />
      <ModelDescription />
    </MainContainer>
  );
};

export default QuantModelDetailsPage;

const MainContainer = styled.div`
  width: 100vw;
  height: 100%;

  padding: 20px 0;
  padding-left: 10%;
  padding-right: 10%;
`;
