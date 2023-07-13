import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "@/layouts/header";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Table from "@/components/ui/table";
import Image from "next/image";
import WeekCard from "@/components/ui/card/WeekCard";
import StudentInfoCard from "@/components/ui/card/StudenInfoCard";
import IconSchool from "@/assets/icons/home.svg";
import IconAddress from "@/assets/icons/map-pin.svg";
import IconTutor from "@/assets/icons/user.svg";
import IconArrow from "@/assets/icons/arrow-left.svg";
import { currentSchoolCycle } from "@/services/utils/currentSchoolCycle";

const Content = styled(Box)`
  margin: 60px auto;
  max-width: 1000px;
  @media screen and (max-width: 820px) {
    margin: 30px 20px;
  }
`;

const ButtonBack = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  & img {
    margin-right: 5px;
    vertical-align: bottom;
  }
`;

const SchoolCycle = styled.h2`
  font-weight: 400;
  margin-top: 50px;
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

const Index = () => {
  const router = useRouter();
  const thead = ["Num Semana", "Semana", "Pago", ""];

  return (
    <Box>
      <Header />
      <Content>
        <Box>
          <ButtonBack onClick={() => router.push("/home")}>
            <Image width={18} height={18} priority src={IconArrow} alt="<" />
            Regresar
          </ButtonBack>
          <StudentName>Jared Esaú Ortega Ramírez</StudentName>
        </Box>
        <Grid container mt={3} columnSpacing={5}>
          <Grid item xs={12} md={4}>
            <StudentInfoCard title="Escuela" icon={IconSchool}>
              <Text>Primaria Pedro Loredo Ortega</Text>
              <Text>3 Grado Matutino</Text>
            </StudentInfoCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StudentInfoCard title="Dirección" icon={IconAddress}>
              <Text>
                Kaua 178 lote 7 Pedregal SaniNicolas 4ta Sección, Tlalpan CDMX
              </Text>
              <Text>
                Casa color Blanco con zaguán color Café, entre calle Conkal y
                Hocaba
              </Text>
            </StudentInfoCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StudentInfoCard title="Tutor" icon={IconTutor}>
              <Text>Ma Guadalupe Ramirez Reséndiz</Text>
              <Text>Casa: 5540034243 &nbsp;&nbsp; Celular: 5615141075</Text>
              <Text>Otro Familiar: Raquel Sanchez Arellano</Text>
              <Text>Celular: 5615141075</Text>
            </StudentInfoCard>
          </Grid>
        </Grid>
        <Box>
          <SchoolCycle>Ciclo escolar: {currentSchoolCycle()}</SchoolCycle>
          <Table thead={thead} variant="week" />
          {[1, 2, 3].map(() => (
            <WeekCard />
          ))}
        </Box>
      </Content>
    </Box>
  );
};

export default Index;
