import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const card = (
  <React.Fragment>
    <CardContent>
      <Box
        alignItems="center"
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "flex-start",
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Typography component="div">005930</Typography>
        <Typography component="div" sx={{ ml: 2 }}>
          삼성전자
        </Typography>
      </Box>
    </CardContent>
  </React.Fragment>
);

const ModelList = () => {
  return (
    <Card sx={{ minWidth: 275, minHeight: 275 }}>
      <Box sx={{ flexGrow: 1 }} display="flex" alignItems="center">
        <Box
          alignItems="center"
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "flex-start",
            m: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Card variant="outlined">{card}</Card>
        </Box>
      </Box>
    </Card>
  );
};

export default ModelList;
