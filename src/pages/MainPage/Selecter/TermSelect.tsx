import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

export default function TermSelect() {
  const [listOrder, setOrder] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, ml: 2, mr: 2 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">산정기간</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={listOrder}
          label="산정기간"
          onChange={handleChange}
        >
          <MenuItem value={0}>1 주</MenuItem>
          <MenuItem value={1}>1 개월</MenuItem>
          <MenuItem value={3}>3 개월</MenuItem>
          <MenuItem value={6}>6 개월</MenuItem>
          <MenuItem value={9}>9 개월</MenuItem>
          <MenuItem value={12}>12 개월</MenuItem>
          <MenuItem value={30}>기타 ...</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
