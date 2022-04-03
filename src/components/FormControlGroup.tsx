import { FormControl, FormGroup } from "@mui/material";
import { ReactNode } from "react";

interface TmpFormProps {
  children: ReactNode;
}

export default function FormControlGroup({ children }: TmpFormProps) {
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormGroup
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {children}
      </FormGroup>
    </FormControl>
  );
}
