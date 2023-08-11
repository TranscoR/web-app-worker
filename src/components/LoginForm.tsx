import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@/components/ui/form/Input';
import LoadingButton from '@mui/lab/LoadingButton';
import { Field } from '@/styles';
import { sigIn } from '@/api/auth';

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;

const Logo = styled.h3`
  color: #c6c6c6;
  font-weight: 500;
`;

const Index = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (dataForm: any) => {
    setLoading(true);
    sigIn(dataForm)
      .then(() => {
        setLoading(false);
        router.push('/home');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Box>
      <Logo>TranscoR</Logo>
      <Title>Iniciar sesión</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field sx={{ margin: '0px !important' }}>
          <label>Correo electrónico</label>
          <Input
            type="email"
            register={register}
            errors={errors}
            keyName="email"
            placeholder="Ingresa un correo electrónico"
            required={true}
          />
        </Field>
        <Field>
          <label>Contraseña</label>
          <Input
            type="password"
            register={register}
            errors={errors}
            keyName="password"
            placeholder="Escribe una contraseña"
            required={true}
          />
        </Field>
        <LoadingButton
          sx={{ margin: '20px 0 0', color: '#fff', boxShadow: 'none' }}
          size="medium"
          color="primary"
          type="submit"
          loading={loading}
          variant="contained"
          fullWidth={true}
        >
          <span>Entrar</span>
        </LoadingButton>
        <Link href="/register">
          <Button
            fullWidth={true}
            variant="text"
            sx={{
              marginTop: '10px',
              fontFamily: 'Prompt',
              boxShadow: 'none',
              marginRight: '10px',
              padding: '6px 30px',
            }}
          >
            Crear cuenta
          </Button>
        </Link>
      </form>
    </Box>
  );
};

export default Index;
