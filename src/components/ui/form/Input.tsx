import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import * as Icon from 'react-feather';

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
  '& .MuiInputBase-input': {
    fontSize: '13px',
    padding: '16px',
    fontFamily: 'Prompt',
  },
  '& .MuiInputBase-root': {
    borderRadius: '7px',
    backgroundColor: '#fff',
    border: 'none !important',
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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <Input
        variant="outlined"
        size="small"
        sx={{ fontFamily: 'Prompt' }}
        fullWidth={true}
        {...register(keyName, {
          required: required,
          validate: validate,
          minLength: minLength,
        })}
        value={value}
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        InputProps={
          type === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ marginRight: '0px' }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <Icon.EyeOff size={15} />
                      ) : (
                        <Icon.Eye size={15} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : endAdornment && {
                startAdornment: (
                  <InputAdornment position="start">
                    {endAdornment}
                  </InputAdornment>
                ),
              }
        }
      />
      {errors[keyName] && (
        <Typography variant="caption" sx={{ fontFamily: 'Prompt' }}>
          * Este campo es requerido
        </Typography>
      )}
    </div>
  );
};

export default Index;
