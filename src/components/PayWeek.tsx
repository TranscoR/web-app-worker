import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ModalContent, ContentTitle, ModalTitle } from "@/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import IconDollar from "@/assets/icons/dollar-sign.svg";
import { useStudentsStore } from "@/store";
import { type Student } from "@/types";

const Input = styled(TextField)(({}) => ({
  "& .MuiInputBase-input": {
    fontSize: "15px",
    padding: "12px 20px 13px 0px",
    fontFamily: "Prompt",
  },
  "& .MuiInputBase-root": {
    borderRadius: "7px",
    border: "none !important",
  },
}));

const Index = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // @ts-ignore
  const students = useStudentsStore((state) => state.students);
  // @ts-ignore
  const setStudentsInfo = useStudentsStore((state) => state.setStudentsInfo);

  // @ts-ignore
  const student_index = parseInt(query?.index);

  const [amount_value, setAmount] = useState<number | null>(null);

  const payHandle = () => {
    // @ts-ignore
    let studentsRef = students;
    const school_cycle = studentsRef[student_index].school_cycle;
    const school_cycle_selected = school_cycle.filter(
      (cycle: any) => cycle.first_year === cycleSelected.first_year
    );
    school_cycle_selected[0].weeks[week_index].days[day - 1].paid = true;
    school_cycle_selected[0].weeks[week_index].days[day - 1].amount =
      amount_value;
    school_cycle_selected[0].weeks[week_index].days[day - 1].paid_date =
      // @ts-ignore
      new window.Date();
    setStudentsInfo([...studentsRef]);

    const info = {
      weeks: [
        // @ts-ignore
        ...new Set([
          ...student.school_cycle[0].weeks,
          ...school_cycle_selected[0].weeks,
        ]),
      ],
    };

    const cycle_id = `${cycleSelected.first_year}${cycleSelected.end_year}`;

    updateStudentSchoolCycle(student?.uid, info, cycle_id)
      .then(() => {
        toast.success("Cambios guardados");
        handleClose();
      })
      .catch((error) => {
        toast.error("Ocurrio un erro, intente más tarde");
      });
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent>
          <ContentTitle>
            <ModalTitle>Confirmar cantidad de pago</ModalTitle>
            <Box mt={2}>
              <Input
                variant="outlined"
                sx={{ fontFamily: "Prompt" }}
                fullWidth={true}
                placeholder="Cantidad"
                onChange={(e: any) => setAmount(parseInt(e.target.value))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image
                        width={16}
                        height={16}
                        priority
                        src={IconDollar}
                        alt="icon-dollar"
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </ContentTitle>
          <Box mt={2}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                sx={{ fontFamily: "Prompt", color: "#1d1d1d" }}
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{ color: "#fff", fontFamily: "Prompt", boxShadow: "none" }}
                // @ts-ignore
                disabled={amount_value ? false : true}
                onClick={payHandle}
              >
                Confirmar
              </Button>
            </Stack>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
