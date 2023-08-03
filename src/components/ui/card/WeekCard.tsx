import { Fragment } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Image from "next/image";
import IconArrow from "@/assets/icons/chevron.svg";
import IconVacations from "@/assets/icons/vacations2.png";
import PayWeekCard from "@/components/ui/card/PayWeekCard";
import { type Student } from "@/types";

const Section = styled(Box)`
  margin-bottom: 20px;
  & h3 {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  & p {
    font-size: 12.5px;
  }
  & ul {
    padding-left: 5px;
    /* margin: 0; */
    list-style: none;
    & li {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
`;

const Date = styled(Typography)`
  font-size: 12px !important;
  color: grey;
`;

const ContentBadges = styled(Box)`
  margin-bottom: 20px;
`;

const ContentIconMedicine = styled(Box)`
  background-color: #97feed31;
  padding: 9px;
  border-radius: 6px;
  & img {
    display: block;
  }
`;

const Badge = styled.p`
  font-size: 12px !important;
  padding: 5px 10px;
  background: #fbd85d1c;
  border-radius: 50px;
  color: #1d1d1da6;
  border: 1px solid #fbd85d;
`;

const HeaderInfo = styled(Box)`
  display: grid;
  grid-template-columns: 17% 30% 24% 15% 12%;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  align-items: center;
  justify-items: flex-start;
  width: 100%;
  padding: 10px 0;
  & div p {
    font-family: "Prompt";
    font-size: 15px;
    line-height: 120%;
    padding: 0 27px 0 0;
    & small {
      color: grey;
    }
  }

  @media screen and (max-width: 820px) {
    grid-template-columns: 26% 44% 24%;
    position: relative;
    overflow: scroll;
    display: -webkit-box;
    -webkit-box-align: center;
    & div p {
      font-size: 13px;
    }
  }
`;

const Legend = styled.span`
  display: block;
  margin: 15px 0;
  font-weight: 400;
  font-size: 13.5px;
`;

const VacationsTitle = styled.h4`
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: 500;
  text-align: center;
  & img {
    position: relative;
    top: -2px;
    vertical-align: middle;
    margin-right: 10px;
  }
`;

const CotentDays = styled(Box)`
  @media screen and (max-width: 820px) {
    position: relative;
    overflow: scroll;
  }
`;

const CustomAccordion = styled(Accordion)(({ theme }) => {
  return {
    borderRadius: "7px !important",
    margin: "12px 0 !important",
    boxShadow: "none",
    border: "1px solid #d1d1d185",
    ".MuiAccordionDetails-root": {},
    ".MuiAccordionSummary-root": {
      "& .Mui-expanded": {
        margin: "0px !important",
      },
    },
  };
});

interface Paid {
  paid: boolean;
}

const Paid = styled.p<Paid>`
  color: ${({ paid }) => (paid ? "#75D18F" : "#000")};
`;

interface WeekCard {
  i: number;
  start_week: string;
  end_week: string;
  paid: boolean;
  transfer_payment: boolean;
  amount: number;
  vacations: boolean;
  days: [
    {
      day: number;
      label_day: string;
      date: string;
      paid: boolean;
    }
  ];
  student: Student;
  cycleSelected: any;
}

const Index = ({
  i,
  start_week,
  end_week,
  vacations,
  days,
  student,
  amount,
  paid,
  transfer_payment,
  cycleSelected,
}: WeekCard) => {
  const number_week = i + 1;

  return (
    <Box sx={{ border: "1ps solid #d1d1d185" }}>
      <CustomAccordion>
        <AccordionSummary
          expandIcon={
            <Image
              width={20}
              height={20}
              priority
              src={IconArrow}
              alt="icon-arrow"
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ padding: "0 20px !important" }}
        >
          {vacations ? (
            <VacationsTitle>
              <Image
                width={17}
                height={17}
                priority
                src={IconVacations}
                alt="icon-vacations"
              />
              Vacaciones
            </VacationsTitle>
          ) : (
            <HeaderInfo>
              <div>
                <p>#{number_week}</p>
              </div>
              <div>
                <p>
                  {start_week} - {end_week}
                </p>
              </div>
              <div>
                <Paid paid={paid}>{!paid ? "Incompleto" : "Completado"} </Paid>
              </div>
            </HeaderInfo>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ borderTop: "1px solid #7c7c7c26", paddingTop: "30px" }}>
            <Box>
              <h3>Semana {number_week}</h3>
              {vacations ? (
                <p>Vacaciones</p>
              ) : (
                <p>
                  {start_week} - {end_week}
                </p>
              )}
              {/* <Legend>
                Despliegue de días pagados y días con pago pendiente
              </Legend> */}
            </Box>
            <CotentDays mt={4} mb={1}>
              {/* <Stack direction="row" spacing={2}>
                {days.map((day: any) => (
                  <DayCard
                    {...day}
                    days={days}
                    student={student}
                    week_index={i}
                    cycleSelected={cycleSelected}
                  />
                ))}
              </Stack> */}
              <PayWeekCard
                amount={amount}
                paid={paid}
                transfer_payment={transfer_payment}
                student={student}
                vacations={vacations}
                week_index={i}
                cycleSelected={cycleSelected}
              />
            </CotentDays>
            {/* <small>
              {payments.length} pagos realizados de {days.length}
            </small> */}
          </Box>
        </AccordionDetails>
      </CustomAccordion>
    </Box>
  );
};

export default Index;
