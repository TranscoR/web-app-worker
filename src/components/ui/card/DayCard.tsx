import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import IconCheck from "@/assets/icons/check.svg";
import { ModalContent, ContentTitle, ModalTitle } from "@/styles";
import { updateStudentSchoolCycle } from "@/api/students";
import { renderDateFirebase } from "@/services/utils/dates";
import { useStudentsStore } from "@/store";
import { type Student } from "@/types";
import { Toaster, toast } from "sonner";
interface Paid {
  paid: boolean;
}

const Card = styled(Box)<Paid>`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ paid }) => (paid ? "#f1ca3b2a" : "#cccccc2e")};
  border: ${({ paid }) => (paid ? "1px solid #f1c93b" : "1px solid #ccc")};
  padding: 10px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
`;

const Day = styled.p`
  margin-bottom: 5px;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  text-transform: capitalize;
  & img {
    position: relative;
    top: 2px;
    margin-right: 2px;
  }
`;

const DatepPay = styled.p`
  text-align: center;
  font-weight: 400;
  font-size: 11px;
  text-transform: capitalize;
  & img {
    position: relative;
    top: 2px;
    margin-right: 2px;
  }
`;

const Date = styled.h3`
  font-weight: 500;
  text-transform: uppercase;
`;

const Status = styled.p<Paid>`
  color: ${({ paid }) => (paid ? "#f1c93b" : "#a3a3a3")};
  font-size: 13px;
`;

interface DayCard {
  day: number;
  label_day: string;
  label_date: string;
  paid: boolean;
  paid_date: any;
  week_index: any;
  student: Student;
  cycleSelected: any;
}

const Index = ({
  day,
  label_day,
  label_date,
  paid,
  paid_date,
  week_index,
  student,
  cycleSelected,
}: DayCard) => {
  const router = useRouter();
  const query = router.query;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // @ts-ignore
  const students = useStudentsStore((state) => state.students);
  // @ts-ignore
  const setStudentsInfo = useStudentsStore((state) => state.setStudentsInfo);

  // @ts-ignore
  const student_index = parseInt(query?.index);

  const payHandle = () => {
    // @ts-ignore
    let studentsRef = students;
    const school_cycle = studentsRef[student_index].school_cycle;
    const school_cycle_selected = school_cycle.filter(
      (cycle: any) => cycle.first_year === cycleSelected.first_year
    );
    school_cycle_selected[0].weeks[week_index].days[day - 1].paid = true;
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
      <Day>{label_day}</Day>
      <Card onClick={handleOpen} paid={paid}>
        <Box>
          <Date>
            {label_date.split(" ")[0]}{" "}
            {label_date.split(" ")[1].substring(0, 3).toUpperCase()}
          </Date>
          <Status paid={paid}>{paid ? "Pagado" : "Pendiente"}</Status>
          {paid && (
            <DatepPay>
              <Image
                width={12}
                height={12}
                priority
                src={IconCheck}
                alt="icon-check"
              />
              {renderDateFirebase(paid_date)}
            </DatepPay>
          )}
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
            <ModalTitle>¿El Tutor ya realizo el pago?</ModalTitle>
          </ContentTitle>
          <Box mt={3}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                sx={{ fontFamily: "Prompt", color: "#1d1d1d" }}
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                variant="contained"
                sx={{ color: "#fff", fontFamily: "Prompt", boxShadow: "none" }}
                onClick={payHandle}
              >
                Si
              </Button>
            </Stack>
          </Box>
        </ModalContent>
      </Modal>
      <Toaster position="bottom-right" />
    </Box>
  );
};

export default Index;
