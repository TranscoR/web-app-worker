import { Main } from "@/templates/Main";
import { Meta } from "@/layouts/Meta";
import { Fragment, useState } from "react";
import styled from "styled-components";
import Header from "@/layouts/header";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FiltersList from "@/components/ui/list/FiltersList";
import Select from "@/components/ui/form/Select";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@/components/ui/table";
import Animation from "@/components/animation/Animation";
import Image from "next/image";
import IconFilters from "@/assets/icons/filters.svg";
import IconFinder from "@/assets/icons/search.svg";
import StudentCard from "@/components/ui/card/StudentCard";
import { useStudentsStore } from "@/store";
import { useFinder } from "@/hooks/useFinder";
import { EDUCATION_OPTIONS } from "@/mocks/options";
import { type Student } from "@/types";

const Input = styled(TextField)(({}) => ({
  "& .MuiInputBase-input": {
    fontSize: "13px",
    padding: "12px 20px 13px 0px",
    fontFamily: "Prompt",
  },
  "& .MuiInputBase-root": {
    borderRadius: "7px",
    border: "none !important",
  },
}));

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

const Counter = styled.p`
  font-size: 14px;
  @media screen and (max-width: 820px) {
    text-align: center;
  }
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

const Field = styled(Box)`
  width: 100%;
`;

const Label = styled.p`
  display: inline-block;
  margin-bottom: 5px;
  font-size: 13px;
  font-weight: 500;
  font-family: "Prompt";
`;

const Index = () => {
  // @ts-ignore
  const students = useStudentsStore((state) => state.students);

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterEducation, setFilterEducation] = useState<string | null>(null);

  const [filterName, setFilterName] = useState<string | null>(null);
  // @ts-ignore
  const filteredData = useFinder(filterName, students, filterEducation);

  const filteredStudents = filterEducation
    ? filteredData.filter(
        (student) =>
          student.education.toLowerCase() === filterEducation.toLowerCase()
      )
    : filteredData;

  const thead = ["Alumno", "Escuela", "Tutor", "Contacto", ""];

  return (
    <Main
      meta={
        <Meta
          title="TranscoR - Inicio"
          description="lleva el control de los pagos de tus estudiantes"
        />
      }
    >
      <Box mt={14}>
        <Header />
        <Content>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Title>Alumnos</Title>
              <Counter>{filteredData?.length} Encontrados</Counter>
            </Box>
            <Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box>
                  <ButtonFilters onClick={() => setShowFilters(!showFilters)}>
                    <Image
                      width={15}
                      height={15}
                      priority
                      src={IconFilters}
                      alt="icon-filters"
                    />
                    Filtros
                  </ButtonFilters>
                </Box>
              </Stack>
            </Box>
          </Stack>
          {showFilters && (
            <FiltersList>
              <Field>
                <Label>Buscar por alumno o escuela o número de lista</Label>
                <Input
                  variant="outlined"
                  sx={{ fontFamily: "Prompt" }}
                  fullWidth={true}
                  placeholder="Buscar alumno o escuela número de lista"
                  onChange={(e: any) => setFilterName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image
                          width={15}
                          height={15}
                          priority
                          src={IconFinder}
                          alt="icon-finder"
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Field>
              <Field>
                <Label>Educación</Label>
                <Select
                  filters={EDUCATION_OPTIONS}
                  setValue={setFilterEducation}
                />
              </Field>
            </FiltersList>
          )}
          <Box>
            {filteredStudents && filteredStudents?.length ? (
              <Fragment>
                <Table variant="student" thead={thead} />
                {filteredStudents.map((student: Student, i: number) => (
                  <Animation>
                    <StudentCard {...student} index={i} />
                  </Animation>
                ))}
              </Fragment>
            ) : (
              <Box mt={5}>
                <p>No se encontraron resultados</p>
              </Box>
            )}
          </Box>
        </Content>
      </Box>
    </Main>
  );
};

export default Index;
