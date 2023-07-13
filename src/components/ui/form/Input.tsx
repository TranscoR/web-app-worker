import React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface InputProps {
  type: string;
  register?: any;
  errors?: any;
  keyName: string;
  placeholder: string;
  value?: any;
  validate?: any;
  minLength?: string;
  required?: boolean;
  endAdornment?: any;
}

const Input = styled(TextField)(({}) => ({
  "& .MuiInputBase-input": {
    fontSize: "13px",
    padding: "16px",
    fontFamily: "Prompt",
  },
  "& .MuiInputBase-root": {
    borderRadius: "7px",
    backgroundColor: "#fff",
    border: "none !important",
  },
}));

const Index = (props: InputProps) => {
  const {
    register,
    keyName,
    validate,
    minLength,
    value,
    type,
    errors,
    placeholder,
    required,
    endAdornment,
  } = props;
  return (
    <div>
      <Input
        variant="outlined"
        size="small"
        sx={{ fontFamily: "Prompt" }}
        fullWidth={true}
        {...register(keyName, {
          required: required,
          validate: validate,
          minLength: minLength,
        })}
        value={value}
        type={type}
        placeholder={placeholder}
        InputProps={
          endAdornment && {
            endAdornment: (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ),
          }
        }
      />
      {errors[keyName] && (
        <Typography variant="caption" sx={{ fontFamily: "Prompt" }}>
          * Este campo es requerido
        </Typography>
      )}
    </div>
  );
};

export default Index;
