import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridSelectionModel,
} from "@mui/x-data-grid";

interface ModelListProps {
  rows: GridRowsProp;
  setSelectionModel: React.Dispatch<React.SetStateAction<GridSelectionModel>>;
}

export default function QuantModelTable({
  rows,
  setSelectionModel,
}: ModelListProps) {
  const columns: GridColDef[] = FIELDS.map((val) => {
    return { field: val, headerName: val, width: 150 };
  });

  // TODO: 추후 mui와 styled-components 사용으로 개선 필요
  return (
    <div style={{ height: 350, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            rows={rows}
            columns={columns}
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
