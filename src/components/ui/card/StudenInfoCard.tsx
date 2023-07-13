import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";

const Card = styled(Box)`
  background-color: #fff;
  border: 1px solid #e8e8e8;
  padding: 20px;
  border-radius: 7px;
  height: 160px;
`;

const Title = styled.h3`
  font-weight: 500;
`;

interface StudentInfoCard {
  title: string;
  icon: any;
  children: React.ReactNode;
}

const Index = ({ title, icon, children }: StudentInfoCard) => {
  return (
    <Card>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Title>{title}</Title>
        </Box>
        <Box>
          <Image
            width={23}
            height={23}
            priority
            src={icon}
            alt={`icon-${title}`}
          />
        </Box>
      </Stack>
      <Box mt={1}>{children}</Box>
    </Card>
  );
};

export default Index;
