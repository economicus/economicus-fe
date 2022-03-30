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
      flex: 1,
    };
  });

  const deleteModel = useCallback(
    (id: GridRowId) => () => {
      setTimeout(async () => {
        setModelList((prev) => prev.filter((model) => model.id !== id));
        await deleteQuantModel(id as number, token);
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
        getActions: (params: GridRowParams) => {
          console.log(params);

          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              onClick={deleteModel(params.id)}
              label="Delete"
            />,
            // <SaveModelModal id={params.id} name={params.row.name} />,
          ];
        },
      },
    ],
    [deleteModel]
  );

  return (
    <div
      style={{
        height: "calc(35% - 10px)",
        width: "100%",
        backgroundColor: "white",
        display: "flex",
      }}
    >
      <DataGrid
        checkboxSelection
        disableSelectionOnClick
        rows={rows}
        columns={columnsWithButton}
        onSelectionModelChange={(model) => {
          setSelectionModel(model);
        }}
        density="compact"
      />
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
