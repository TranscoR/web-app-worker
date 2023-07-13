import { useRouter } from "next/router";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Card = styled(Box)`
  border: 1px solid #d1d1d185 !important;
  background-color: #fff;
  margin-bottom: 12px;
  margin-top: 12px;
  border-radius: 7px;
  padding: 5px 15px 5px 25px;
  @media screen and (max-width: 820px) {
    padding: 0;
  }
`;

const HeaderInfo = styled(Box)`
  display: grid;
  grid-template-columns: 23% 22% 28% 15% 12%;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  align-items: center;
  justify-items: flex-;
  width: 100%;
  padding: 10px 0;
  & div p {
    font-family: "Prompt";
    font-size: 13.5px;
    line-height: 120%;
    color: #000;
    padding: 0 27px 0 0;
  }
  @media screen and (max-width: 820px) {
    grid-template-columns: 26% 44% 24%;
    & div p {
      font-size: 13px;
    }
  }
`;

const Index = () => {
  const router = useRouter();

  return (
    <Box sx={{ border: "1ps solid #d1d1d185" }}>
      <Card>
        <HeaderInfo>
          <div>
            <p>Alina Ortega Ramirez</p>
          </div>
          <div>
            <p>Secundaria Técnica n45</p>
            <p>Ignacio Manuel Altamirano</p>
          </div>
          <div>
            <p>Guadalupe Ramirez Resendiz</p>
          </div>
          <div>
            <p>5615141075</p>
          </div>
          <div>
            <Button
              onClick={() => router.push("/student/987123g81g893ashjob")}
              variant="contained"
              sx={{ color: "#fff", fontFamily: "Prompt", boxShadow: "none" }}
            >
              Ver perfil
            </Button>
          </div>
        </HeaderInfo>
      </Card>
    </Box>
  );
};

export default Index;
