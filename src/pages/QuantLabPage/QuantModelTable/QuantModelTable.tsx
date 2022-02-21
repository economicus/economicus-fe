import { Delete, Save } from "@material-ui/icons";
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

import { IModel } from "../QuantLabPage";

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
    return { field: val, headerName: val, width: 150 };
  });

  const deleteModel = useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setModelList((prev) => prev.filter((model) => model.id !== id));
      });
    },
    []
  );

  const saveModel = useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        console.log("saved...?", id);
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
          <GridActionsCellItem
            icon={<Save />}
            onClick={saveModel(params.id)}
            label="Save"
            key={2}
          />,
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
              // console.log("hi...", model);
              setSelectionModel(model);
            }}
          />
        </div>
      </div>
    </div>
  );
}

/*
 * ANCHOR: constants
 */

const FIELDS = [
  "모델",
  "누적수익률",
  "연평균수익",
  "승률",
  "최대손실률",
  "편입종목수",
]; // NOTE: 적절한가? 잘 모르겠음

/* TODO
 * 데이터 구조, 상수화 등에 대한 고민
 * 폭 개선 (디자인 개선)
 * 버튼 추가
 */
