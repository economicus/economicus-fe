import { ArrowLeft } from "@mui/icons-material";
import { Alert, Paper, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import signUp from "../../apis/signUp";
import { HighlightedTextLink } from "../../styles/myStyledComponents";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState(false);
  const [nicknameError, setNicknameError] = React.useState(false);
  const emailRef = React.useRef<HTMLDivElement>(null);
  const nicknameRef = React.useRef<HTMLDivElement>(null);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 라우터가 정상적으로 동작할 수 있도록 기본 이벤트를 막는다.(버튼을 눌렀을때 팝업이 뜨면서 창이 새로고침되는것을 막도록)
    const data = new FormData(event.currentTarget);
    // 현재 Target(여기서는 Box)의 데이터를 가지고온다.

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = data.get("email") as string;
    if (!emailRegex.test(emailCurrent)) {
      setErrorMessage("이메일 형식이 올바르지 않습니다.");
      setOpen(true);
      emailRef.current?.focus();
      setEmailError(true);
      return;
    }
    // 이메일 유효성 검사해서 정상적인 이메일인지 확인. 틀릴시 스낵바에 에러메세지 띄우고 포커스 이동

    const code = await signUp(
      data.get("email") as string,
      data.get("password") as string,
      data.get("nickname") as string
    );
    // 회원가입 함수에 가져온 데이터를 보내고 상태를 가져온다

    if (code == 201) {
      alert("회원가입에 성공하였습니다!");
      navigate("/LoginPage", { state: data.get("email") });
    } else if (code == "duplicated nickname") {
      setErrorMessage("이미 사용중인 닉네임입니다.");
      setOpen(true);
      nicknameRef.current?.focus();
      setNicknameError(true);
      // alert("test duplicated nickname");
    } else if (code == "duplicated email") {
      setErrorMessage("이미 가입된 이메일입니다.");
      setOpen(true);
      emailRef.current?.focus();
      setEmailError(true);
      // alert("test duplicated email");
    } else {
      alert("알 수 없는 오류입니다. 서버에 이상이 있을수있으니 문의 바랍니다");
    }
    // 회원가입 함수에서 가져온 상태에 따라 적절하게 분기한다
    // 201일때 로그인 페이지로 이동(+ 이메일 정보 가져와서 로그인 정보에 미리 들어가있게 설정)
    // 400일때 에러 메세지에 따라 해당 부분으로 커서 이동 및 빨간색으로 강조 + 스낵바 띄우기
  };

  return (
    <MainContainer>
      <StyledPaper elevation={12}>
        <EconomicusLogo src="https://avatars.githubusercontent.com/u/98199739?s=200&v=4" />

        <Typography component="h1" variant="h5">
          회원가입
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
            error={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="패스워드"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            autoComplete="nickname"
            name="nickname"
            required
            fullWidth
            id="nickname"
            label="닉네임"
            inputRef={nicknameRef}
            error={nicknameError}
          />

          <StyledButton type="submit" fullWidth variant="contained">
            회원가입
          </StyledButton>

          <Grid container justifyContent="flex-start">
            <Grid item>
              <HighlightedTextLink to="/LoginPage">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "-10px",
                  }}
                >
                  <ArrowLeft fontSize="small" />
                  로그인 페이지로 돌아가기
                </div>
              </HighlightedTextLink>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>

      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </MainContainer>
  );
}

const MainContainer = styled(Box)`
  width: 100vw;
  height: 100vh;
  max-width: 100%; // NOTE: https://stackoverflow.com/questions/23367345/100vw-causing-horizontal-overflow-but-only-if-more-than-one

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

const EconomicusLogo = styled("img")({
  borderRadius: 5,
  width: 50,
  height: 50,
  margin: 10,
});
