import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Image from 'next/image';
import IconDollar from '@/assets/icons/dollar-sign.svg';
import IconTransfer from '@/assets/icons/transfer.svg';
import { ModalContent, ContentTitle, ModalTitle } from '@/styles';
import { updateStudentSchoolCycle } from '@/api/students';
import { useStudentsStore } from '@/store';
import { addCharger } from '@/api/user';
import { useUserStore } from '@/store';
import { type Student } from '@/types';
import { Toaster, toast } from 'sonner';
import { generateUid } from '@/services/utils/generateUid';
import { COLORS } from '@/constants/colors';

const Input = styled(TextField)(({}) => ({
  '& .MuiInputBase-input': {
    fontSize: '15px',
    padding: '12px 20px 13px 0px',
    fontFamily: 'Prompt',
  },
  '& .MuiInputBase-root': {
    borderRadius: '7px',
    border: 'none !important',
  },
}));

interface Paid {
  paid: boolean;
}

const Card = styled(Box)<Paid>`
  width: 420px;
  background-color: ${({ paid }) => (paid ? '#f1ca3b2a' : '#cccccc2e')};
  border: ${({ paid }) => (paid ? '1px solid #f1c93b' : '1px solid #ccc')};
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Field = styled(Box)`
  width: 100%;
  margin: 15px 0;
  & label {
    display: inline-block;
    margin-bottom: 5px;
    font-size: 13px;
    font-weight: 500;
    font-family: 'Prompt';
  }
  & a {
    color: ${COLORS.brightYellow};
  }
`;

const Title = styled.h4`
  font-weight: 500;
`;

const Legend = styled(Box)`
  margin-top: 5px;
  display: flex;
  align-items: center;
  & img {
    margin-right: 5px;
  }
`;

interface DayCard {
  paid: boolean;
  transfer_payment: boolean;
  amount: number;
  week_index: any;
  vacations: boolean;
  student: Student;
  cycleSelected: any;
  collector_name: string;
}

const Index = ({
  paid,
  transfer_payment,
  amount,
  week_index,
  student,
  vacations,
  cycleSelected,
  collector_name,
}: DayCard) => {
  const router = useRouter();
  const query = router.query;

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => !paid && setOpen(true);
  const handleClose = () => setOpen(false);

  // @ts-ignore
  const students = useStudentsStore((state) => state.students);
  // @ts-ignore
  const setStudentsInfo = useStudentsStore((state) => state.setStudentsInfo);

  // @ts-ignore
  const student_index = parseInt(query?.index);

  const [amount_value, setAmount] = useState<number | null>(null);

  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  // @ts-ignore
  const user = useUserStore((state) => state.user);

  const payHandle = () => {
    // @ts-ignore
    let studentsRef = students;
    const school_cycle = studentsRef[student_index].school_cycle;
    const school_cycle_selected = school_cycle.filter(
      (cycle: any) => cycle.first_year === cycleSelected.first_year
    );
    school_cycle_selected[0].weeks[week_index].paid = true;
    school_cycle_selected[0].weeks[week_index].amount = amount_value;
    school_cycle_selected[0].weeks[week_index].transfer_payment = checked;
    school_cycle_selected[0].weeks[week_index].collector_name = user.name;
    school_cycle_selected[0].weeks[week_index].paid_date =
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

    const charger_id = generateUid(2, 3000000);
    const charger = {
      charger_id: charger_id,
      created_at: new window.Date(),
      student_name: student.student_name,
      amount: amount_value,
      cycle_id,
      transfer_payment: checked,
      week: week_index,
    };

    updateStudentSchoolCycle(student?.uid, info, cycle_id)
      .then(() => {
        addCharger(user.uid, charger, charger_id)
          .then(() => {
            toast.success('Cambios guardados');
            handleClose();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        toast.error('Ocurrio un erro, intente más tarde', error);
      });
  };

  return (
    <Box>
      <Card onClick={handleOpen} paid={paid}>
        <Box>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Title>
                Pago{' '}
                {paid
                  ? 'completado'
                  : vacations
                  ? 'de vacaciones pendiente'
                  : 'semanal pendiente'}
              </Title>
              {paid && (
                <Box>
                  <Legend>
                    <Image
                      width={13}
                      height={13}
                      priority
                      src={transfer_payment ? IconTransfer : IconDollar}
                      alt="icon-dollar"
                    />
                    <small>
                      Pago realizado con{' '}
                      {transfer_payment ? 'transferencia' : 'efectivo'}
                    </small>
                  </Legend>
                  <Box>
                    <small>Cobrado por: {collector_name}</small>
                  </Box>
                </Box>
              )}
            </Box>
            {!paid ? (
              <Button
                variant="outlined"
                sx={{ fontFamily: 'Prompt', boxShadow: 'none' }}
              >
                Cobrar
              </Button>
            ) : (
              <p>${amount}</p>
            )}
          </Stack>
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
            <ModalTitle>Confirmar cantidad de pago</ModalTitle>
            <Box mt={2}>
              <Input
                variant="outlined"
                sx={{ fontFamily: 'Prompt' }}
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
            <Box mt={0}>
              <Field>
                <Stack
                  direction="row"
                  spacing={0}
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Box>
                    <Checkbox checked={checked} onChange={handleChange} />
                  </Box>
                  <Box>
                    <label style={{ fontWeight: '400' }}>
                      Pago realizado con trasnferencia
                    </label>
                  </Box>
                </Stack>
              </Field>
            </Box>
          </ContentTitle>
          <Box mt={0}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                sx={{ fontFamily: 'Prompt', color: '#1d1d1d' }}
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{ color: '#fff', fontFamily: 'Prompt', boxShadow: 'none' }}
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
      <Toaster position="bottom-right" />
    </Box>
  );
};

export default Index;
