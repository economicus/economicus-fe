import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridRowsProp,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

import deleteQuantModel from "../../../apis/deleteQuantModel";
import { RootState } from "../../../stores/store";
import { VariableNameTranslate } from "../constants";
import { IModel } from "../QuantLabPage";
import SaveModelModal from "./SaveModelModal";

interface ModelListProps {
  rows: GridRowsProp;
  setSelectionModel: React.Dispatch<React.SetStateAction<GridSelectionModel>>;
  setModelList: React.Dispatch<React.SetStateAction<IModel[]>>;
}

export default function QuantModelTable({
  rows,
  setSelectionModel,
  setModelList,
}: ModelListProps) {
  const token = useSelector((state: RootState) => state.session.token);

  const columns: GridColDef[] = FIELDS.map((val) => {
    return {
      field: val,
      headerName:
        VariableNameTranslate[`${val}` as keyof typeof VariableNameTranslate],
      width: 150,
    };
  });

  const deleteModel = useCallback(
    (id: GridRowId) => () => {
      setTimeout(async () => {
        setModelList((prev) => prev.filter((model) => model.id !== id));
        await deleteQuantModel(id as string, token);
      });
    },
    []
  );

  const saveModel = useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        console.log("asdf", id);
      });
    },
    []
  );

  const columnsWithButton = useMemo(
    () => [
      ...columns,
      {
        field: "actions",
        type: "actions",
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={deleteModel(params.id)}
            label="Delete"
          />,
          <SaveModelModal id={params.id} />,
        ],
      },
    ],
    [deleteModel, saveModel]
  );

  // TODO: 추후 mui와 styled-components 사용으로 개선 필요
  return (
    <div style={{ height: 275, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            initialState={{
              pagination: {
                pageSize: 3,
              },
            }}
            checkboxSelection
            disableSelectionOnClick
            rows={rows}
            columns={columnsWithButton}
            onSelectionModelChange={(model) => {
              setSelectionModel(model);
            }}
          />
        </div>
      </div>
    </div>
  );
}

const FIELDS = [
  "name",
  "cumulative_return",
  "annual_average_return",
  "winning_percentage",
  "max_loss_rate",
  "holdings_count",
];
