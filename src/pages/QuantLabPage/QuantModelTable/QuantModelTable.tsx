import { Delete } from "@material-ui/icons";
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
      setTimeout(() => {
        setModelList((prev) => prev.filter((model) => model.id !== id));
        // TODO: 백엔드 완료시 삭제 api 추가 #11
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
            icon={<Delete />}
            onClick={deleteModel(params.id)}
            label="Delete"
          />,
          //   <GridActionsCellItem
          //     icon={<Save />}
          //     onClick={saveModel(params.id)}
          //     label="Save"
          //     key={2}
          //   />,
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
  "model_name",
  "cumulative_return",
  "annual_average_return",
  "winning_percentage",
  "max_loss_rate",
  "holdings_count",
];
