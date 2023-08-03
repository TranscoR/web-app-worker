import { useRouter } from "next/router";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import IconLock from "@/assets/icons/lock.svg";
import { type Student } from "@/types";

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

const Education = styled.p`
  text-transform: capitalize;
`;

const Index = ({
  index,
  uid,
  list_number,
  active_account,
  student_name,
  education,
  school_name,
  tutor_name,
  phone_number,
}: Student) => {
  const router = useRouter();

  return (
    <Box sx={{ border: "1ps solid #d1d1d185" }}>
      <Card onClick={() => router.push(`/student/${uid}/?index=${index}`)}>
        <HeaderInfo>
          <div>
            <p>
              #{list_number}{" "}
              {!active_account && (
                <Image
                  style={{
                    position: "relative",
                    top: "2.2px",
                    marginRight: "5px",
                  }}
                  width={15}
                  height={15}
                  priority
                  src={IconLock}
                  alt="icon-lock"
                />
              )}
              {student_name}
            </p>
          </div>
          <div>
            <Education>{education}</Education>
            <p>{school_name}</p>
          </div>
          <div>
            <p>{tutor_name}</p>
          </div>
          <div>
            <p>{phone_number}</p>
          </div>
          <div>
            <Button
              onClick={() => router.push(`/student/${uid}/?index=${index}`)}
              sx={{ fontFamily: "Prompt", boxShadow: "none" }}
            >
              Detalles
            </Button>
          </div>
        </HeaderInfo>
      </Card>
    </Box>
  );
};

export default Index;
