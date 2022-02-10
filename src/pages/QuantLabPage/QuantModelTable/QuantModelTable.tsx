import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

// const rows: GridRowsProp = [
//   {
//     id: 1,
//     모델: "모델명",
//     누적수익률: "128.2%",
//     연평균수익: "16%",
//     승률: "55%",
//     최대손실률: "-29%",
//     편입종목수: "22개",
//   },
//   {
//     id: 2,
//     모델: "모델명",
//     누적수익률: "128.2%",
//     연평균수익: "16%",
//     승률: "55%",
//     최대손실률: "-29%",
//     편입종목수: "22개",
//   },
// ];

interface ModelListProps {
  rows: GridRowsProp;
}

const fields = [
  "모델",
  "누적수익률",
  "연평균수익",
  "승률",
  "최대손실률",
  "편입종목수",
];

const columns: GridColDef[] = fields.map((val) => {
  return { field: val, headerName: val, width: 150 };
});

export default function QuantModelTable({ rows }: ModelListProps) {
  console.log(rows);

  return (
    <div style={{ height: 350, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            rows={rows}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
}

/* TODO
 * 데이터 구조, 상수화 등에 대한 고민
 * 폭 개선 (디자인 개선)
 * 버튼 추가
 */
