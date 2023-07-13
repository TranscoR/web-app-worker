import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Input from "@/components/ui/form/Input";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import { Field } from "@/styles";

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
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
  };

  return (
    <Box>
      <Title>Formulario de Registro</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <label>Nombre del Alumno</label>
          <Input
            type="text"
            register={register}
            errors={errors}
            keyName="student_name"
            placeholder="Escribe el nombre del alumno"
            required={true}
          />
        </Field>
        <Box mt={2}>
          <Stack direction="row" spacing={2}>
            <Field sx={{ margin: "0px !important" }}>
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
          </Stack>
        </Box>
        <Field>
          <label>Nombre del Tutor</label>
          <Input
            type="text"
            register={register}
            errors={errors}
            keyName="tutor_name"
            placeholder="Escribe el nombre del tutor"
            required={true}
          />
        </Field>
        <Field>
          <label>Dirección</label>
          <Input
            type="text"
            register={register}
            errors={errors}
            keyName="address"
            placeholder="Escribe una dirección"
            required={true}
          />
        </Field>
        <Stack direction="row" spacing={2}>
          <Field sx={{ margin: "0px !important" }}>
            <label>Entre que calle</label>
            <Input
              type="text"
              register={register}
              errors={errors}
              keyName="first_street_reference"
              placeholder="Escribe una calle"
              required={true}
            />
          </Field>
          <Field>
            <label>Entre que otra calle</label>
            <Input
              type="text"
              register={register}
              errors={errors}
              keyName="second_street_reference"
              placeholder="Escribe una calle"
              required={true}
            />
          </Field>
        </Stack>
        <Box mt={2}>
          <Stack direction="row" spacing={2}>
            <Field sx={{ margin: "0px !important" }}>
              <label>Color de casa</label>
              <Input
                type="text"
                register={register}
                errors={errors}
                keyName="house_color"
                placeholder="Escribe un color"
                required={true}
              />
            </Field>
            <Field>
              <label>Color de puerta o zaguan</label>
              <Input
                type="text"
                register={register}
                errors={errors}
                keyName="door_color"
                placeholder="Escribe un color"
                required={true}
              />
            </Field>
          </Stack>
        </Box>
        <Box mt={2}>
          <Stack direction="row" spacing={2}>
            <Field sx={{ margin: "0px !important" }}>
              <label>Teléfono de casa</label>
              <Input
                type="number"
                register={register}
                errors={errors}
                keyName="house_phone_number"
                placeholder="Escribe un teléfono"
                required={true}
              />
            </Field>
            <Field>
              <label>Numero de celular</label>
              <Input
                type="number"
                register={register}
                errors={errors}
                keyName="phone_number"
                placeholder="Escribe un numero de celular"
                required={true}
              />
            </Field>
          </Stack>
        </Box>
        <Box mt={2}>
          <Stack direction="row" spacing={2}>
            <Field sx={{ margin: "0px !important" }}>
              <label>Nombre de otro familiar</label>
              <Input
                type="text"
                register={register}
                errors={errors}
                keyName="house_color"
                placeholder="Escribe el nombre completo de otro familiar"
                required={true}
              />
            </Field>
            <Field>
              <label>Numero de celular</label>
              <Input
                type="number"
                register={register}
                errors={errors}
                keyName="door_color"
                placeholder="Escribe un teléfono"
                required={true}
              />
            </Field>
          </Stack>
        </Box>
        <Box mt={2}>
          <Stack direction="row" spacing={2}>
            <Field sx={{ margin: "0px !important" }}>
              <label>Nombre de la escuela</label>
              <Input
                type="text"
                register={register}
                errors={errors}
                keyName="school_name"
                placeholder="Escribe un nombre"
                required={true}
              />
            </Field>
            <Field>
              <label>Escolaridad</label>
              <Input
                type="text"
                register={register}
                errors={errors}
                keyName="education"
                placeholder="Escribe una escolaridad"
                required={true}
              />
            </Field>
            <Field>
              <label>Turno</label>
              <Input
                type="text"
                register={register}
                errors={errors}
                keyName="turn"
                placeholder="Escribe un turno"
                required={true}
              />
            </Field>
          </Stack>
        </Box>
        <Box mt={2}>
          <Field>
            <Checkbox checked={true} />
            <label style={{ fontWeight: "400" }}>
              Estoy de acuerdo con lo establecido y con términos y condiciones
            </label>
          </Field>
        </Box>
        <LoadingButton
          sx={{ margin: "20px 0 20px", color: "#fff" }}
          size="medium"
          color="primary"
          type="submit"
          loading={loading}
          variant="contained"
          fullWidth={true}
        >
          <span>Registrar</span>
        </LoadingButton>
      </form>
      <button onClick={() => router.push("/home")}>Go to home</button>
    </Box>
  );
};

export default Index;
