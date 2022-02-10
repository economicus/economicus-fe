import { Button, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import styled from "styled-components";

import Example from "../../components/graph";
import ModalBusinessAreas from "../../components/modals/BusinessAreasModal";
import ModalChartInfo from "../../components/modals/ChartInfoModal";
import ModalFinanceConditions from "../../components/modals/FinanceConditonsModal";
import ComparativeStockSelect from "../../components/selecter/ComparativeStockSelect";
import TermSelect from "../../components/selecter/TermSelect";
import NumberOfStocks from "../../components/slider/NumberOfStocksSlider";
import RebalancingTermSlider from "../../components/slider/RebalancingTermSlider";

const MainContainer = styled.div`
  border: 3px solid pink;
  margin: 5px;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 30px;
`;

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

const MakeModelContainer = styled.div`
  border: 3px solid black;
  argin: 5px;
  display: flex;
`;

const ModelContainer = styled(Card)`
  border: 3px solid red;
  margin: 5px;
  width: 50%;
`;

const ShowQuantModelYieldContainer = styled(Card)`
  border: 3px solid yellow;
  margin: 5px;
  margin-top: 10px;
`;

// const StyledButton = styled(B)

// CheckBoxs <-

export interface IBusinessArea {
  [key: string]: boolean;
}

export interface IChartInfo {
  [key: string]: boolean;
}
export interface IFinance {
  [key: string]: boolean;
}

const QuantLabPage = () => {
  const [businessArea, setBusinessArea] = useState({
    에너지: true,
    소재: true,
    산업재: true,
    경기관련소비재: true,
    필수소비재: true,
    건강관리: true,
    금융: true,
    IT: true,
    커뮤니케이션서비스: true,
    유틸리티: true,
  });
  const [financeCondetion, setFinanceCondetion] = useState({
    PER: true,
    PBR: false,
    PSR: false,
    PCR: false,
    시가배당률: false,
    배당성향: false,
    "매출액 증가율": false,
    "순이익 증가율": false,
    ROE: false,
    ROA: false,
    부채비율: false,
  });
  const [chartInfo, setChartInfo] = useState({
    시가총액: true,
    "주가수익률(1개월)": false,
    "주가수익률(3개월)": false,
    "주가수익률(6개월)": false,
    "주가수익률(12개월)": false,
    "이동평균선(5일)": false,
    "이동평균선(20일)": false,
    "이동평균선(60일)": false,
    "이동평균선(120일)": false,
  });

  return (
    <MainContainer>
      <MakeModelContainer>
        <GraphContainer>
          <GraphSlectContainer>
            <ComparativeStockSelect />
            <TermSelect />
          </GraphSlectContainer>
          <Graph>
            <Example></Example>
          </Graph>
        </GraphContainer>

        <ModelContainer>
          <Container sx={{ px: "5%" }}>
            <h3>Quant Lab</h3>
            <RebalancingTermSlider />
            <NumberOfStocks />
          </Container>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              p: 3,
            }}
          >
            {/* 클릭시 modal 창 열리게 변경*/}
            {/* <Button variant="contained" sx={{ m: 1 }}>
              사업분야
            </Button> */}
            <ModalFinanceConditions
              state={financeCondetion}
              setState={setFinanceCondetion}
            />
            <Button variant="contained" sx={{ m: 1 }}>
              주식성향
            </Button>
            <ModalChartInfo state={chartInfo} setState={setChartInfo} />
            <ModalBusinessAreas
              state={businessArea}
              setState={setBusinessArea}
            />
          </Box>
        </ModelContainer>
      </MakeModelContainer>
      <ShowQuantModelYieldContainer>
        <Typography>모델</Typography>
        <Typography>누적수익률</Typography>
        <Typography>연평균수익</Typography>
        <Typography>승률</Typography>
        <Typography>최대손실률</Typography>
        <Typography>편입종목수</Typography>
      </ShowQuantModelYieldContainer>
    </MainContainer>
  );
};

export default QuantLabPage;
