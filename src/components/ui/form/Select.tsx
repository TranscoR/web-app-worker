import { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface selectProps {
  id?: number;
  keyName?: string;
  filters?: any;
  setValue?: (a: string) => void;
}

const Index = ({ filters, setValue }: selectProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setValue(value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 100,
      },
    },
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth size="small">
        <Select
          id="demo-simple-select"
          // value={}
          onChange={handleChange}
          MenuProps={MenuProps}
          // defaultValue={}
        >
          {filters.map((option: string, i: number) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Index;
