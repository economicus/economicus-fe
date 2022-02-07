import { Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";

import Example from "../components/graph";
import ComparativeStockSelect from "../components/selecter/ComparativeStockSelect";
import TermSelect from "../components/selecter/TermSelect";
import NumberOfStocks from "../components/slider/NumberOfStocksSlider";
import RebalancingTermSlider from "../components/slider/RebalancingTermSlider";

const MainContainer = styled.div`
  //border: 3px solid pink;
  margin: 5px;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 30px;
`;

const GraphContainer = styled(Card)`
  //border: 3px solid blue;
  margin: 5px;
  width: 50%;
`;
const GraphSlectContainer = styled.div`
  //border: 3px solid orange;
  margin: 5px;
  display: flex;
`;

const Graph = styled.div`
  //border: 3px solid green;
  margin: 5px;
  height: 300px;
  padding: 5px;
`;

const MakeModelContainer = styled.div`
  //border: 3px solid black;
  argin: 5px;
  display: flex;
`;

const ModelContainer = styled(Card)`
  //border: 3px solid red;
  margin: 5px;
  width: 50%;
`;

const ShowQuantModelYieldContainer = styled(Card)`
  //border: 3px solid yellow;
  margin: 5px;
  margin-top: 10px;
`;

const QuantLabPage = () => {
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
            <Card>사업분야</Card>
            <Card>재무상태</Card>
            <Card>주식성향</Card>
            <Card>차트정보</Card>
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
