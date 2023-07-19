import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "@/layouts/header";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Table from "@/components/ui/table";
import FiltersList from "@/components/ui/list/FiltersList";
import FormControlLabel from "@mui/material/FormControlLabel";
import Image from "next/image";
import WeekCard from "@/components/ui/card/WeekCard";
import ButtonBack from "@/components/ButtonBack";
import StudentInfoCard from "@/components/ui/card/StudenInfoCard";
import IconSchool from "@/assets/icons/home.svg";
import IconAddress from "@/assets/icons/map-pin.svg";
import IconTutor from "@/assets/icons/user.svg";
import IconCalendar from "@/assets/icons/calendar.svg";
import { getSchoolCycleByStudent } from "@/api/students";
import { useStudentsStore } from "@/store";
import { updateStudentInfo } from "@/api/students";
import { Toaster, toast } from "sonner";
import { type Student } from "@/types";

const Content = styled(Box)`
  margin: 60px auto;
  max-width: 1000px;
  @media screen and (max-width: 820px) {
    margin: 30px 20px;
  }
`;

const SchoolCycle = styled.h2`
  font-weight: 400;
  font-size: 20px;
  & img {
    vertical-align: middle;
  }
`;

const StudentName = styled.h1`
  margin-top: 0px;
  font-weight: 500;
  font-size: 32px;
`;

const Text = styled.p`
  font-size: 13px;
`;

const ButtonFilters = styled.button`
  padding: 11px 17px;
  background-color: #e9edf3;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  & img {
    vertical-align: sub;
    margin-right: 5px;
  }
`;

interface cycleSelected {
  first_year: string;
  end_year: string;
}

const Index = () => {
  const router = useRouter();
  const query = router.query;

  const thead = ["Num Semana", "Semana", "Pago", ""];
  const student_id = router.query.student_id;

  // @ts-ignore
  const students = useStudentsStore((state) => state.students);
  // @ts-ignore
  const setStudentsInfo = useStudentsStore((state) => state.setStudentsInfo);

  const student_filter = students.filter(
    (student: Student) => student?.uid === student_id
  );

  // Student Profile
  let student = student_filter[0];

  useEffect(() => {
    getSchoolCycleByStudent(student?.uid)
      .then((res) => {
        student.school_cycle = res;
        // @ts-ignore
        setStudentsInfo([...new Set([...students, student])]);
      })
      .catch((error) => console.log(error));
  }, []);

  // @ts-ignore
  const student_index = parseInt(query?.index);

  const disableAccountHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    let studentsRef = students;
    studentsRef[student_index].active_account = event.target.checked;
    setStudentsInfo([...studentsRef]);

    const info = {
      active_account: event.target.checked,
    };
    updateStudentInfo(student?.uid, info)
      .then(() => {
        toast.success("Cambios guardados");
      })
      .catch((error) => {
        toast.error("Ocurrio un erro, intente más tarde");
      });
  };

  // Filter By Cycle
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const date = new Date();
  const current_year = date.getFullYear();

  const [cycleSelected, setCycleSelected] = useState<cycleSelected>({
    first_year: JSON.stringify(current_year),
    end_year: JSON.stringify(current_year + 1),
  });

  const cyclesFiltered =
    Object.keys(cycleSelected).length &&
    student?.school_cycle?.filter(
      // @ts-ignore
      (cycle: any) => cycle.first_year === cycleSelected?.first_year
    );

  return (
    <Box mt={14}>
      <Header />
      <Content>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
        >
          <Box>
            <ButtonBack />
            <StudentName>{student?.student_name}</StudentName>
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={student?.active_account}
                onChange={disableAccountHandle}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={
              student?.active_account ? "Cuenta activada" : "Activar cuenta"
            }
          />
        </Stack>
        <Grid container mt={3} columnSpacing={5} rowSpacing={1.5}>
          <Grid item xs={12} md={4}>
            <StudentInfoCard title="Escuela" icon={IconSchool}>
              <Text>
                {student?.education} {student?.school_name}
              </Text>
              <Text style={{ textTransform: "capitalize" }}>
                Grado: {student?.grade} {student?.turn}
              </Text>
            </StudentInfoCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StudentInfoCard title="Dirección" icon={IconAddress}>
              <Text>{student?.address}</Text>
              <Text>
                Casa color {student?.house_color} con zaguán color{" "}
                {student?.door_color}, entre calle{" "}
                {student?.first_street_reference} y{" "}
                {student?.second_street_reference}
              </Text>
            </StudentInfoCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StudentInfoCard title="Tutor" icon={IconTutor}>
              <Text>{student?.tutor_name}</Text>
              <Text>
                Casa: {student?.house_phone_number} &nbsp;&nbsp; Celular:{" "}
                {student?.phone_number}
              </Text>
              <Text>Otro Familiar: {student?.subtutor_name}</Text>
              <Text>Celular: {student?.subtutor_phone_number}</Text>
            </StudentInfoCard>
          </Grid>
        </Grid>
        <Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            mt={5}
          >
            <Box>
              <SchoolCycle>
                Ciclo escolar: {cycleSelected.first_year} -{" "}
                {cycleSelected.end_year}
              </SchoolCycle>
            </Box>
            <Box>
              <ButtonFilters onClick={() => setShowFilters(!showFilters)}>
                <Image
                  width={15}
                  height={15}
                  priority
                  src={IconCalendar}
                  alt="icon-calendar"
                />
                Ciclo escolar
              </ButtonFilters>
            </Box>
          </Stack>
          {showFilters && (
            <FiltersList>
              <Fragment>
                {student?.school_cycle?.map((cycle: any) => (
                  <Button
                    variant="contained"
                    sx={{
                      fontFamily: "Prompt",
                      boxShadow: "none",
                      marginRight: "10px",
                      padding: "8px 30px",
                      backgroundColor: "#e9edf3",
                    }}
                    onClick={() =>
                      setCycleSelected({
                        first_year: cycle.first_year,
                        end_year: cycle.end_year,
                      })
                    }
                  >
                    {cycle.first_year} - {cycle.end_year}
                  </Button>
                ))}
              </Fragment>
            </FiltersList>
          )}
          {cyclesFiltered && cyclesFiltered.length ? (
            <Box>
              <Table thead={thead} variant="week" />
              {cyclesFiltered &&
                cyclesFiltered.length &&
                cyclesFiltered[0].weeks?.map((week: any, i: number) => (
                  <WeekCard
                    {...week}
                    i={i}
                    student={student}
                    cycleSelected={cycleSelected}
                  />
                ))}
            </Box>
          ) : null}
        </Box>
      </Content>
      <Toaster position="bottom-right" />
    </Box>
  );
};

export default Index;
