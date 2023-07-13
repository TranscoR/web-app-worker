import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { ModalContent, ContentTitle, ModalTitle } from "@/styles";

const Card = styled(Box)`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1ca3b2a;
  padding: 13px;
  border: 1px solid #f1c93b;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
`;

const Day = styled.p`
  margin-bottom: 5px;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
`;

const Date = styled.h3`
  font-weight: 500;
`;

const Status = styled.p`
  color: #f1c93b;
`;

const Index = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Day>Lunes</Day>
      <Card onClick={handleOpen}>
        <Box>
          <Date>12 AGO</Date>
          <Status>Pagado</Status>
        </Box>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent>
          <ContentTitle>
            <ModalTitle>
              ¿El Tutor de Jared Ortega ya realizo el pago?
            </ModalTitle>
          </ContentTitle>
          <Box mt={3}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button sx={{ fontFamily: "Prompt", color: "#1d1d1d" }}>
                No
              </Button>
              <Button
                variant="contained"
                sx={{ color: "#fff", fontFamily: "Prompt", boxShadow: "none" }}
              >
                Si
              </Button>
            </Stack>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
