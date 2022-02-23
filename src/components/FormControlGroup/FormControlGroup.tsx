import { FormControl, FormGroup } from "@mui/material";
import { ReactNode } from "react";

interface TmpFormProps {
  children: ReactNode;
}

// NOTE: FormControl, FormGroup 등의 역할을 아직 모르겠다. 그냥 CheckBox 들을 배치하는거랑 무슨 차이?

export default function TmpForm({ children }: TmpFormProps) {
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      {/* <FormLabel component="legend">재무상태</FormLabel> */}

      <FormGroup
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {children}
      </FormGroup>

      {/* <FormHelperText>Be careful</FormHelperText> */}
    </FormControl>
  );
}
