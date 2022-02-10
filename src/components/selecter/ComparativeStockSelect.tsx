import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

export default function ComparativeStockSelect() {
  const [comparativeStock, setOrder] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, ml: 2, mr: 2 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">stock</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={comparativeStock}
          label="stock"
          onChange={handleChange}
        >
          <MenuItem value={1}>KOSPI</MenuItem>
          <MenuItem value={2}>SPY</MenuItem>
          <MenuItem value={3}>QQQ</MenuItem>
          <MenuItem value={4}>기타...</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
