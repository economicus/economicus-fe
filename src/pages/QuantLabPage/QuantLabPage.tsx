import { Button, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import styled from "styled-components";

import CheckBoxs from "../../components/CheckBoxs";
import Example from "../../components/graph";
import ModalBusinessAreas from "../../components/modals/BusinessAreas";
import ComparativeStockSelect from "../../components/selecter/ComparativeStockSelect";
import TermSelect from "../../components/selecter/TermSelect";
import LabSlider from "../../components/slider/LabSlider";

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

const QuantLabPage = () => {
  const [businessArea, setBusinessArea] = useState({
    game: true,
    enter: false,
    enter2: false,
    enter3: false,
  });
  const [chartInfo, setChartInfo] = useState({});
  const [rebalancingTerm, setRebalancingTerm] = useState<number>(1);
  const [numberOfHoldings, setNumberOfHoldings] = useState<number>(1);

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
            <LabSlider
              name={"리밸런싱 주기"}
              max={12}
              value={rebalancingTerm}
              setValue={setRebalancingTerm}
            />
            <LabSlider
              name={"보유 종목 수"}
              max={50}
              value={numberOfHoldings}
              setValue={setNumberOfHoldings}
            />
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
            <Button variant="contained" sx={{ m: 1 }}>
              재무상태
            </Button>
            <Button variant="contained" sx={{ m: 1 }}>
              주식성향
            </Button>
            <Button variant="contained" sx={{ m: 1 }}>
              차트정보
            </Button>
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
