import styled from "styled-components";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Image from "next/image";
import IconArrow from "@/assets/icons/chevron.svg";
import DayCard from "@/components/ui/card/DayCard";

const Card = styled(Accordion)`
  border: 1px solid #d1d1d185 !important;
  margin-bottom: 12px;
  margin-top: 12px;
  border-radius: 20px;
  padding: 0 15px;
  @media screen and (max-width: 820px) {
    padding: 0;
  }
`;

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
    color: #000;
    padding: 0 27px 0 0;
    margin-bottom: 5px;
  }
  @media screen and (max-width: 820px) {
    grid-template-columns: 26% 44% 24%;
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

const Index = () => {
  return (
    <Box sx={{ border: "1ps solid #d1d1d185" }}>
      <Card>
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
          <HeaderInfo>
            <div>
              <p>#1</p>
            </div>
            <div>
              <p>29 Agosto - 2 Septiembre</p>
            </div>
            <div>
              <p>Completado</p>
            </div>
          </HeaderInfo>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ borderTop: "1px solid #7c7c7c26", paddingTop: "30px" }}>
            <Box>
              <h3>Semana 1</h3>
              <p>12 Agosto - 16 Septiembre</p>
              <Legend>
                Despliegue de días pagados y días con pago pendiente
              </Legend>
            </Box>
            <Box mt={4} mb={1}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                {[1, 2, 3, 4, 5].map(() => (
                  <DayCard />
                ))}
              </Stack>
            </Box>
          </Box>
        </AccordionDetails>
      </Card>
    </Box>
  );
};

export default Index;
