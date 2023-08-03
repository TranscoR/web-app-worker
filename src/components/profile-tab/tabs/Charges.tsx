import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Animation from "@/components/animation/Animation";
import Table from "@/components/ui/table";
import Modal from "@mui/material/Modal";
import { ModalContent, ContentTitle, ModalTitle } from "@/styles";
import ChargeCard from "@/components/ui/card/ChargeCard";
import { type Charge } from "@/types";
import { useUserStore, useChargesStore } from "@/store";
import { getRangeChargers } from "@/api/user";
import { DateRange } from "@/components/DateRange";

const Subtitle = styled.h2`
  font-weight: 500;
`;

const ModalDescription = styled.p`
  text-align: center;
  font-size: 14px;
`;

const Index = () => {
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Date Range
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // @ts-ignore
  const user = useUserStore((state) => state.user);

  // @ts-ignore
  const charges = useChargesStore((state) => state.charges);
  // @ts-ignore
  const setCharges = useChargesStore((state) => state.setCharges);

  let total =
    charges &&
    charges.length &&
    charges.reduce(
      (acumulador: any, actual: any) => acumulador + actual.amount,
      0
    );

  const [loading, setLoading] = useState<boolean>(false);

  const filterChargersHandle = () => {
    setLoading(true);
    getRangeChargers(user.uid, selectionRange.startDate, selectionRange.endDate)
      .then((response) => {
        setLoading(false);
        handleClose();
        setCharges(response);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const thead = [
    "Alumno",
    "Fecha",
    "Cantidad",
    "Tipo",
    "Ciclo escolar",
    "Semana",
  ];

  const options: any = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return (
    <Box>
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Subtitle>Cobros</Subtitle>
            <Box>
              <p>
                {selectionRange.startDate.toLocaleDateString(
                  undefined,
                  options
                )}{" "}
                -{" "}
                {selectionRange.endDate.toLocaleDateString(undefined, options)}
              </p>
            </Box>
            <Button
              onClick={handleOpen}
              variant="text"
              sx={{
                marginTop: "10px",
                fontFamily: "Prompt",
                boxShadow: "none",
                marginRight: "10px",
                padding: "6px 10px",
              }}
            >
              Filtar por fecha
            </Button>
          </Box>
          <Box>
            <h2>Total: ${total}</h2>
          </Box>
        </Stack>
        <Box mt={3}>
          <Table variant="charges" thead={thead} />
          {charges && charges.length ? (
            charges.map((charge: Charge) => (
              <Animation>
                <ChargeCard {...charge} />
              </Animation>
            ))
          ) : (
            <Box mt={2}>
              <p>Selecciona una fecha</p>
            </Box>
          )}
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent>
          <ContentTitle>
            <ModalTitle>Filtrar por fechas</ModalTitle>
            <ModalDescription>Selecciona un rango de fechas</ModalDescription>
          </ContentTitle>
          <Box textAlign="center">
            <DateRange
              selectionRange={selectionRange}
              setSelectionRange={setSelectionRange}
            />
          </Box>
          <Box textAlign="center">
            <LoadingButton
              sx={{ margin: "20px 0 0", color: "#fff", boxShadow: "none" }}
              size="medium"
              color="primary"
              loading={loading}
              variant="contained"
              onClick={filterChargersHandle}
            >
              <span>Filtrar</span>
            </LoadingButton>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
