import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";

import signUp from "../../apis/signUp";

const theme = createTheme();

const EconomicusLogo = styled("img")({
  borderRadius: 5,
  width: 50,
  height: 50,
  margin: 10,
});

export default function SignUpPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 라우터가 정상적으로 동작할 수 있도록 기본 이벤트를 막는다.(버튼을 눌렀을때 팝업이 뜨면서 창이 새로고침되는것을 막도록)
    const data = new FormData(event.currentTarget);
    // 현재 Target(여기서는 Box)의 데이터를 가지고온다.

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   nickname: data.get("nickname"),
    // });
    // 데이터를 정상적으로 가져왔는지 확인하기위해 콘솔에 데이터를 찍어본다.

    const code = await signUp(
      data.get("email") as string,
      data.get("password") as string,
      data.get("nickname") as string
    );
    // 회원가입 함수에 가져온 데이터를 보내고 상태를 가져온다
    // console.log(code);

    if (code == 201) {
      alert("test 201");
    } else if (code == "duplicated nickname") {
      alert("test duplicated nickname");
    } else if (code == "duplicated email") {
      alert("test duplicated email");
    } else {
      alert("server error");
    }
    // 회원가입 함수에서 가져온 상태에 따라 분기한다
    // TODO: 201일때 로그인 페이지로 이동(+ 이메일 정보 가져와서 로그인 정보에 미리 들어가있게 설정)
    // TODO: 400일때 에러 메세지에 따라 해당 부분으로 커서 이동 및 빨간색으로 강조
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <EconomicusLogo src="https://avatars.githubusercontent.com/u/98199739?s=200&v=4" />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="패스워드"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="nickname"
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="닉네임"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/LoginPage">로그인 페이지로 돌아가기</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
