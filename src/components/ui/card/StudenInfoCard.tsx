import React, { useState } from "react";
import styled from "styled-components";
import Animation from "@/components/animation/Animation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import IconArrow from "@/assets/icons/chevron.svg";

const Card = styled(Box)`
  background-color: #fff;
  border: 1px solid #e8e8e8;
  padding: 15px 20px;
  border-radius: 7px;
  max-height: 180px;
`;

const Title = styled.h4`
  font-weight: 500;
  & img {
    position: relative;
    bottom: 2px;
    margin-right: 6px;
    vertical-align: middle;
  }
`;

interface StudentInfoCard {
  title: string;
  icon: any;
  children: React.ReactNode;
}

const Index = ({ title, icon, children }: StudentInfoCard) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Animation>
      <Card>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Title>
              <Image
                width={20}
                height={20}
                priority
                src={icon}
                alt={`icon-${title}`}
              />
              {title}
            </Title>
          </Box>
          <Box>
            <IconButton aria-label="show" onClick={() => setShow(!show)}>
              <Image
                width={18}
                height={18}
                priority
                src={IconArrow}
                alt={`icon-${title}`}
              />
            </IconButton>
          </Box>
        </Stack>
        {show && (
          <Animation>
            <Box mt={1}>{children}</Box>{" "}
          </Animation>
        )}
      </Card>
    </Animation>
  );
};

export default Index;
