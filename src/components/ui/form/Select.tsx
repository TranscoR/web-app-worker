import { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface selectProps {
  id: number;
  keyName: string;
  setSchedules: any;
  schedules: any;
  schedule: any;
}

const Index = ({
  id,
  keyName,
  setSchedules,
  schedules,
  schedule,
}: selectProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    let objIndex = schedules.findIndex((obj: any) => obj.id == id);
    schedules[objIndex][keyName] = event.target.value as string;
    setSchedules(schedules);
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

  const filters = ["all"];

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth size="small">
        <Select
          id="demo-simple-select"
          value={schedules[keyName]}
          onChange={handleChange}
          MenuProps={MenuProps}
          defaultValue={schedule[keyName]}
        >
          {filters.map((option, i) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Index;
