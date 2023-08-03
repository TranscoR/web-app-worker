import { useState } from "react";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
import IconInfo from "@/assets/icons/info.svg";
import DaysList from "@/components/ui/list/DaysList";
import DayCardInfo from "@/components/ui/card/DayCardInfo";
import Select from "@/components/ui/form/Select";
import { type Student, type Day } from "@/types";
import { getPaySlip } from "@/services/utils/dates";
import { useStudentsStore } from "@/store";
import { createPaymentCardsUsers } from "@/api/paySlip";
import { getStudentList } from "@/api/students";
import { YEARS_OPTIONS } from "@/mocks/options";
import { DateRange } from "@/components/DateRange";
import { COLORS } from "@/constants/colors";
import { Toaster, toast } from "sonner";

const Subtitle = styled.h2`
  font-weight: 500;
`;

const Info = styled.p`
  font-weight: 400;
  font-size: 14px;
`;

const Field = styled(Box)`
  width: 100%;
  margin: 15px 0;
  & label {
    display: inline-block;
    margin-bottom: 5px;
    font-size: 13px;
    font-weight: 500;
    font-family: "Prompt";
  }
  & a {
    color: ${COLORS.brightYellow};
  }
`;

const Index = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // @ts-ignore
  const students = useStudentsStore((state) => state.students);
  // @ts-ignore
  const setStudentsInfo = useStudentsStore((state) => state.setStudentsInfo);

  const [firstYear, setFirstYear] = useState<string | number | null>(null);

  // Loading State
  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const weeks = getPaySlip(
    selectionRange.startDate,
    selectionRange.endDate,
    checked
  );

  const createPaymentCards = () => {
    const school_cycle = {
      first_year: firstYear,
      // @ts-ignore
      end_year: JSON.stringify(parseInt(firstYear) + 1),
      weeks: [weeks],
    };
    setLoading(true);
    // We only add the week of payment to all active users.
    const new_students = students.filter(
      (student: Student) => student.active_account
    );
    createPaymentCardsUsers(new_students, school_cycle).then(() => {
      getStudentList().then((res: any) => {
        setLoading(false);
        setSelectionRange({
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        });
        toast.success("Ciclo Escolar Creado");
        setStudentsInfo(res);
      });
    });
  };

  return (
    <Box>
      <Box>
        <Box mb={5}>
          <Subtitle>Crear ciclo escolar</Subtitle>
          <Stack direction="row" alignItems="center" spacing={1} mt={1} mb={3}>
            <Select filters={YEARS_OPTIONS} setValue={setFirstYear} />
            <p>-</p>
            {firstYear && (
              <h3 style={{ fontWeight: "500" }}>
                {/* @ts-ignore */}
                {parseInt(firstYear) + 1}
              </h3>
            )}
          </Stack>
          <Stack direction="row" spacing={1} mt={1}>
            <Box>
              <Image
                width={20}
                height={20}
                priority
                src={IconInfo}
                alt="icon-info"
              />
            </Box>
            <Box>
              <Info>
                Solamente se agregara la nueva semana de pago a todos los
                estudiantes activos
              </Info>
            </Box>
          </Stack>
        </Box>
        <Grid container mt={3} columnSpacing={5}>
          <Grid item xs={12} md={5}>
            <Box>
              <DateRange
                selectionRange={selectionRange}
                setSelectionRange={setSelectionRange}
              />
              <Box mt={2}>
                <Info>Selecciona los días de Lunes a Viernes</Info>
              </Box>
            </Box>
          </Grid>
          {weeks && weeks?.days.length > 1 && (
            <Grid item xs={12} md={7} mt={2}>
              <Box>
                <Subtitle>¿Los días seleccionados son vacaciones?</Subtitle>
                {/* <Info>Estos son los días para la nueva semana de pago</Info> */}
                <Box mb={3}>
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
                        <label style={{ fontWeight: "400", margin: 0 }}>
                          Es correcto
                        </label>
                      </Box>
                    </Stack>
                  </Field>
                </Box>
                {/* <DaysList>
                  {weeks?.days.map((day: Day) => (
                    <DayCardInfo {...day} />
                  ))}
                </DaysList> */}
                <LoadingButton
                  variant="contained"
                  sx={{
                    color: "#fff",
                    fontFamily: "Prompt",
                    boxShadow: "none",
                  }}
                  onClick={createPaymentCards}
                  loading={loading}
                >
                  <span>Crear ciclo escolar</span>
                </LoadingButton>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
      <Toaster position="bottom-right" />
    </Box>
  );
};

export default Index;
