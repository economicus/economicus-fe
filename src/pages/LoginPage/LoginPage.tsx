import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { loginThunk } from "../../stores/session";
import { RootState } from "../../stores/store";

const EconomicusLogo = styled("img")({
  borderRadius: 5,
  width: 50,
  height: 50,
  margin: 10,
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoggedin, loading, error } = useSelector(
    (state: RootState) => state.session
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginInfo = {
      email: data.get("email") as string, // NOTE: 추후 개선 필요?
      password: data.get("password") as string,
    };

    await dispatch(loginThunk(loginInfo));
  };

  if (isLoggedin) return <Navigate to="/" />;

  return (
    <Container component="main" maxWidth="xs">
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
          로그인
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
            error={error}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            error={error}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="로그인 상태 유지"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#">비밀번호 찾기</Link>
            </Grid>
            <Grid item>
              <Link to="/SignUpPage">{"회원가입 하기"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
