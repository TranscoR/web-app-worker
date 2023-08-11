import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { getStudentInfo, getSchoolCycleByStudent } from '@/api/students';
import { type Student } from '@/types';
import { COLORS } from '@/constants/colors';

const Wrapper = styled(Box)`
  padding: 0px;
`;

const Header = styled.header`
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 15px;
`;

const FirstColumn = styled(Box)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(16, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 6px;
`;

const Text = styled.p`
  font-size: 10px;
`;

const Logo = styled.h2`
  color: ${COLORS.brightYellow};
`;

const WeekCard = styled(Box)`
  border: 1px solid #ccc;
  padding: 3px;
  margin-bottom: 6px;
`;

const HeaderInfo = styled(Box)`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  padding: 4px 0;
  & div p {
    font-family: 'Prompt';
    font-size: 8.8px;
    & small {
      color: grey;
    }
  }
`;

const Index = () => {
  const router = useRouter();
  const asPath = useRouter();
  const query = router.query;
  const student_id: any = router.query.student_id;

  const [studentInfo, setStudentInfo] = useState<Student>();

  useEffect(() => {
    if (student_id) {
      getStudentInfo(student_id)
        // @ts-ignore
        .then((res: Student) => {
          setStudentInfo(res);
          getSchoolCycleByStudent(student_id)
            .then((response) => {
              setStudentInfo({
                ...res,
                school_cycle: response,
              });
              setTimeout(() => {
                asPath?.asPath.includes('print-school-cycle') && window.print();
              }, 1000);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  }, [student_id]);

  return (
    <Wrapper>
      <Header>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <small>
              Ciclo escolar {query.fy} - {query.ey}
            </small>
            <h3>{studentInfo?.student_name}</h3>
            <Text>Secundaria Pedro Loredo - Primero Matutino Grupo C</Text>
            <Text>
              Tutor: Ma Guadalupe Ramirez Resendiz - 5615141075 - 5615141075
            </Text>
            <Text>Kaua 178 Lote 7 Pedregal de San Nicolas 4ta sección</Text>
          </Box>
          <Box>
            <Logo>TranscoR</Logo>
          </Box>
        </Stack>
      </Header>
      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item xs={4} md={4}>
          <FirstColumn>
            {studentInfo?.school_cycle &&
              studentInfo?.school_cycle[0].weeks
                .slice(0, 16)
                .map((item: any) => (
                  <WeekCard>
                    <HeaderInfo>
                      <div>
                        <p>
                          {item.vacations ? (
                            <>Vacaciones</>
                          ) : (
                            <>
                              {item.start_week} - {item.end_week}
                            </>
                          )}
                        </p>
                      </div>
                      <div>
                        <p>{item.paid ? 'Pagado' : 'Pendiente'}</p>
                      </div>
                    </HeaderInfo>
                  </WeekCard>
                ))}
          </FirstColumn>
        </Grid>
        <Grid item xs={4} md={4}>
          <FirstColumn>
            {studentInfo?.school_cycle &&
              studentInfo?.school_cycle[0].weeks
                .slice(17, 32)
                .map((item: any) => (
                  <WeekCard>
                    <HeaderInfo>
                      <div>
                        <p>
                          {item.vacations ? (
                            <>Vacaciones</>
                          ) : (
                            <>
                              {item.start_week} - {item.end_week}
                            </>
                          )}
                        </p>
                      </div>
                      <div>
                        <p>{item.paid ? 'Pagado' : 'Pendiente'}</p>
                      </div>
                    </HeaderInfo>
                  </WeekCard>
                ))}
          </FirstColumn>
        </Grid>
        <Grid item xs={4} md={4}>
          <FirstColumn>
            {studentInfo?.school_cycle &&
              studentInfo?.school_cycle[0].weeks
                .slice(33, 48)
                .map((item: any) => (
                  <WeekCard>
                    <HeaderInfo>
                      <div>
                        <p>
                          {item.vacations ? (
                            <>Vacaciones</>
                          ) : (
                            <>
                              {item.start_week} - {item.end_week}
                            </>
                          )}
                        </p>
                      </div>
                      <div>
                        <p>{item.paid ? 'Pagado' : 'Pendiente'}</p>
                      </div>
                    </HeaderInfo>
                  </WeekCard>
                ))}
          </FirstColumn>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Index;
