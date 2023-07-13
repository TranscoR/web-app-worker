import { useState } from "react";
import styled from "styled-components";
import Header from "@/layouts/header";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Table from "@/components/ui/table";
import Image from "next/image";
import IconFilters from "@/assets/icons/filters.svg";
import StudentCard from "@/components/ui/card/StudentCard";

const Input = styled(TextField)(({}) => ({
  "& .MuiInputBase-input": {
    fontSize: "13px",
    padding: "12px 20px",
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

const FilterList = styled(Box)``;

const Index = () => {
  const [filterName, setFilterName] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const thead = ["Alumno", "Escuela", "Tutor", "Contacto", ""];

  return (
    <Box>
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
            <Counter>189 Encontrados</Counter>
          </Box>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box>
                <Input
                  variant="outlined"
                  sx={{ fontFamily: "Prompt" }}
                  fullWidth={true}
                  placeholder="Buscar alumno"
                  onChange={(e: any) => setFilterName(e.target.value)}
                />
              </Box>
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
          <FilterList mb={4} mt={4}>
            Niceone
          </FilterList>
        )}
        <Box>
          <Table variant="student" thead={thead} />
          {[1, 2, 3].map(() => (
            <StudentCard />
          ))}
        </Box>
      </Content>
    </Box>
  );
};

export default Index;
