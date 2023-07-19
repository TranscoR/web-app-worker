import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "@/layouts/header";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonBack from "@/components/ButtonBack";
import Image from "next/image";
import IconInfo from "@/assets/icons/info.svg";
import DaysList from "@/components/ui/list/DaysList";
import DayCardInfo from "@/components/ui/card/DayCardInfo";
import Select from "@/components/ui/form/Select";
import { DateRange } from "@/components/DateRange";
import { createPaymentCardsUsers } from "@/api/paySlip";
import { getPaySlip } from "@/services/utils/dates";
import { useStudentsStore, useUserStore } from "@/store";
import { getStudentList } from "@/api/students";
import { type Student, type Day } from "@/types";
import { Toaster, toast } from "sonner";

const Content = styled(Box)`
  margin: 60px auto;
  max-width: 1000px;
  @media screen and (max-width: 820px) {
    margin: 30px 20px;
  }
`;

const Title = styled.h1`
  font-weight: 500;
`;

const Email = styled.p`
  font-size: 14px;
`;

const Line = styled.hr`
  margin: 35px 0;
  border-color: #dadada;
`;

const Subtitle = styled.h2`
  font-weight: 500;
`;

const Info = styled.p`
  font-weight: 400;
  font-size: 14px;
`;

const Index = () => {
  const router = useRouter();

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // @ts-ignore
  const user = useUserStore((state) => state.user);
  // @ts-ignore
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  // @ts-ignore
  const students = useStudentsStore((state) => state.students);
  // @ts-ignore
  const setStudentsInfo = useStudentsStore((state) => state.setStudentsInfo);

  const [firstYear, setFirstYear] = useState<string | number | null>(null);

  // Loading State
  const [loading, setLoading] = useState(false);

  const weeks = getPaySlip(selectionRange.startDate, selectionRange.endDate);

  const createPaymentCards = () => {
    const school_cycle = {
      first_year: firstYear,
      // @ts-ignore
      end_year: parseInt(firstYear) + 1,
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
        toast.success("Ciclo escolar creado");
        setStudentsInfo(res);
      });
    });
  };

  const logOut = () => {
    setStudentsInfo([]);
    setUserInfo({});
    localStorage.removeItem("user_uid");
    router.push("/login");
  };

  return (
    <Box mt={14}>
      <Header />
      <Content>
        <Stack
          direction="row"
          spacing={1}
          mt={1}
          justifyContent="space-between"
        >
          <Box>
            <ButtonBack />
            <Title>{user?.name}</Title>
            <Email>{user?.email}</Email>
          </Box>
          <Box>
            <Button
              variant="text"
              sx={{
                fontFamily: "Prompt",
                boxShadow: "none",
                marginRight: "10px",
                padding: "6px 30px",
                color: "#1d1d1d",
              }}
              onClick={logOut}
            >
              Cerrar sesión
            </Button>
          </Box>
        </Stack>
        <Line />
        <Box>
          <Box mb={5}>
            <Subtitle>Crear ciclo escolar</Subtitle>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              mt={1}
              mb={3}
            >
              <Select
                filters={["2023", "2024", "2025"]}
                setValue={setFirstYear}
              />
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
              <Grid item xs={12} md={7}>
                <Box>
                  <Subtitle>Dias elegibles</Subtitle>
                  <Info>Estos son los días para la nueva semana de pago</Info>
                  <DaysList>
                    {weeks?.days.map((day: Day) => (
                      <DayCardInfo {...day} />
                    ))}
                  </DaysList>
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
      </Content>
      <Toaster position="bottom-right" />
    </Box>
  );
};

export default Index;
