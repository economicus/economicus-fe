import { Checkbox, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";

import ContentCard from "../../components/ContentCard";
import OrderSelect from "../../components/selecter/OrderSelect";
import TermSelect from "../../components/selecter/TermSelect";

const ContentsContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SubNavigation = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
`;

const MainContainer = styled.div`
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainPage = () => {
  return (
    <div>
      <MainContainer>
        <div>
          <SubNavigation>
            <OrderSelect />
            <TermSelect />
            <Typography component="div" sx={{ ml: 2, mr: 2 }}>
              subscribed
              <Checkbox size="small" />
            </Typography>
            <Typography component="div" sx={{ ml: 2, mr: 2 }}>
              테스트 포함
              <Checkbox size="small" />
            </Typography>
          </SubNavigation>
          <ContentsContainer>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
            >
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
              <ContentCard />
            </Box>
          </ContentsContainer>
        </div>
      </MainContainer>
    </div>
  );
};

export default MainPage;
