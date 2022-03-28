import { ArrowRight } from "@mui/icons-material";
import { Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { loginThunk } from "../../stores/session";
import { RootState } from "../../stores/store";
import { HighlightedTextButton } from "../../styles/myStyledComponents";

const EconomicusLogo = styled("img")({
  borderRadius: 5,
  width: 50,
  height: 50,
  margin: 10,
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { isLoggedin, loading, error } = useSelector(
    (rootState: RootState) => rootState.session
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginInfo: { email: string; password: string } = {
      email: data.get("email") as string, // NOTE: 추후 개선 필요?
      password: data.get("password") as string,
    };

    await dispatch(loginThunk(loginInfo));
  };

  if (isLoggedin) return <Navigate to="/" />;

  return (
    <MainContainer>
      <StyledPaper elevation={12}>
        <EconomicusLogo src="https://avatars.githubusercontent.com/u/98199739?s=200&v=4" />

        <Typography component="h1" variant="h5">
          로그인
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
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
            defaultValue={state}
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

          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="로그인 상태 유지"
          /> */}

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            로그인
          </StyledButton>
          {/* <StyledButton
            fullWidth
            variant="outlined"
            onClick={() => {
              navigate("/SignUpPage");
            }}
          >
            회원가입
          </StyledButton> */}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <HighlightedTextButton
                onClick={() => {
                  navigate("/SignUpPage");
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "-10px",
                  }}
                >
                  회원가입
                  <ArrowRight fontSize="small" />
                </div>
              </HighlightedTextButton>
            </Grid>
          </Grid>

          {/* <Grid container>
            <Grid item xs>
              <Link to="#">비밀번호 찾기</Link>
            </Grid>
            <Grid item>
              <Link to="/SignUpPage">회원가입 하기</Link>
            </Grid>
          </Grid> */}
        </Box>
      </StyledPaper>
    </MainContainer>
  );
};

const MainContainer = styled(Box)`
  width: 100vw;
  height: 100vh;
  max-width: 100%; // NOTE: https://stackoverflow.com/questions/23367345/100vw-causing-horizontal-overflow-but-only-if-more-than-one

  /* background-color: rgba(140, 166, 218, 20%); */
  background-color: #d6dff2;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  width: 400px;
  padding: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 56px;
  margin: 11px 0;
`;

export default LoginPage;
