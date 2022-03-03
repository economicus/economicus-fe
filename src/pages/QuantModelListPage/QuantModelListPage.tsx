import { GridSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import styled from "styled-components";

import ModelHeader from "../../components/ModelHeader";
import { IModel } from "../QuantLabPage/QuantLabPage";
import { tmpModel } from "../QuantLabPage/QuantModelViewer/QuantModelViewer";
import ChartViewerSizeUp from "../QuantLabPage/QuantModelViewer/QuantModelViewerSizeUp";
import ModelList from "./ModelList";

const QuantModelListPage = () => {
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
      <ModelHeader state={false} />
      <ModelList />
    </MainContainer>
  );
};

export default QuantModelListPage;

const MainContainer = styled.div`
  width: 100vw;
  height: 100%;

  padding: 20px 0;
  padding-left: 10%;
  padding-right: 10%;
`;