import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Input from "@/components/ui/form/Input";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";
import IconDollar from "@/assets/icons/dollar-sign.svg";
import CostCard from "./CostCard";
import { Field } from "@/styles";
import { updateUserInfo } from "@/api/user";
import { useUserStore } from "@/store";
import { type Cost } from "@/types";
import { Toaster, toast } from "sonner";

const Subtitle = styled.h2`
  font-weight: 500;
`;

const Content = styled(Box)``;

const Index = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // @ts-ignore
  const user = useUserStore((state) => state.user);
  // @ts-ignore
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [loading, setLoading] = useState(false);

  const onSubmit = (dataForm: any) => {
    setLoading(true);
    const info = {
      ...("costs" in user
        ? {
            costs: [{ created_at: new Date(), ...dataForm }, ...user.costs],
          }
        : { costs: [{ created_at: new Date(), ...dataForm }] }),
    };
    updateUserInfo(user.uid, info).then(() => {
      setLoading(false);
      setUserInfo({
        ...user,
        ...info,
      });
      reset();
      toast.success("Costo agregado");
    });
  };

  return (
    <Box>
      <Box>
        <Box mb={5}>
          <Subtitle>Control de gastos</Subtitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container mt={3} columnSpacing={2} alignItems="center">
              <Grid item xs={12} md={3.3}>
                <Field>
                  <label>Nombre del costo</label>
                  <Input
                    type="text"
                    register={register}
                    errors={errors}
                    keyName="name"
                    placeholder="Nombre del costo"
                    required={true}
                  />
                </Field>
              </Grid>
              <Grid item xs={12} md={3.3}>
                <Field>
                  <label>Precio</label>
                  <Input
                    type="number"
                    register={register}
                    errors={errors}
                    keyName="price"
                    placeholder="Precio del costo"
                    required={true}
                    endAdornment={
                      <Image
                        width={16}
                        height={16}
                        priority
                        src={IconDollar}
                        alt="icon-dollar"
                      />
                    }
                  />
                </Field>
              </Grid>
              <Grid item xs={12} md={3.3}>
                <Field>
                  <label>
                    Descripción <small>Opcional</small>{" "}
                  </label>
                  <Input
                    type="text"
                    register={register}
                    errors={errors}
                    keyName="description"
                    placeholder="Agrega una descripción"
                    required={false}
                  />
                </Field>
              </Grid>
              <Grid item xs={12} md={2.1}>
                <LoadingButton
                  sx={{ margin: "20px 0 0", color: "#fff", boxShadow: "none" }}
                  size="medium"
                  color="primary"
                  type="submit"
                  loading={loading}
                  variant="contained"
                  fullWidth={true}
                >
                  <span>+ Agregar</span>
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Content>
          <Grid container mt={3} spacing={2} alignItems="center">
            {user.costs && user.costs.length ? (
              <Fragment>
                {user.costs.map((cost: Cost) => (
                  <Grid item xs={12} md={6}>
                    <CostCard {...cost} />
                  </Grid>
                ))}
              </Fragment>
            ) : (
              <p>No hay costos</p>
            )}
          </Grid>
        </Content>
      </Box>
      <Toaster position="bottom-right" />
    </Box>
  );
};

export default Index;
