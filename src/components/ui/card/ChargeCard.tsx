import { useRouter } from "next/router";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { renderDateFirebase } from "@/services/utils/dates";
import { type Charge } from "@/types";

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
  grid-template-columns: 23% 18% 11% 15% 15% 5%;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  align-items: center;
  justify-items: flex;
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
    position: relative;
    overflow: scroll;
    padding: 10px 20px;
    display: -webkit-box;
    -webkit-box-align: center;
    & div p {
      font-size: 13px;
    }
  }
`;

const Index = ({
  amount,
  created_at,
  cycle_id,
  student_name,
  transfer_payment,
  week,
}: Charge) => {
  return (
    <Box sx={{ border: "1ps solid #d1d1d185" }}>
      <Card>
        <HeaderInfo>
          <div>
            <p>{student_name}</p>
          </div>
          <div>
            <p>{renderDateFirebase(created_at)}</p>
          </div>
          <div>
            <p>${amount}</p>
          </div>
          <div>
            <p>{transfer_payment ? "Transferencia" : "Efectivo"}</p>
          </div>
          <div>
            <p>
              {cycle_id.slice(0, 4)} - {cycle_id.slice(4, 8)}
            </p>
          </div>
          <div>
            <p>#{week + 1}</p>
          </div>
        </HeaderInfo>
      </Card>
    </Box>
  );
};

export default Index;
