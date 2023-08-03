import styled from "styled-components";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import IconDollar from "@/assets/icons/dollar-sign.svg";
import { renderDateFirebase } from "@/services/utils/dates";
import { type Cost } from "@/types";

const Content = styled(Box)`
  border: 1px solid #ccc;
  border-radius: 7px;
  padding: 20px;
`;

const Name = styled.h3`
  font-weight: 500;
`;

const Price = styled.p`
  font-weight: 400;
  color: #545454;
  font-size: 15px;
`;

const Date = styled.p`
  font-weight: 400;
  color: grey;
  font-size: 12px;
`;

const Description = styled.p`
  font-weight: 400;
  color: #1d1d1d;
`;

const Index = ({ created_at, name, price, description }: Cost) => {
  return (
    <Content>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Box>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Image
              width={16}
              height={16}
              priority
              src={IconDollar}
              alt="icon-dollar"
            />
            <Name>{name}</Name>
          </Stack>
          <Date>{renderDateFirebase(created_at)}</Date>
        </Box>
        <Box>
          <Price>${price}</Price>
        </Box>
      </Stack>
      <Box mt={1}>
        <Description>{description}</Description>
      </Box>
    </Content>
  );
};

export default Index;
