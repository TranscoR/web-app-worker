import styled from "styled-components";
import Box from "@mui/material/Box";

interface HeaderInfo {
  variant: string;
}

const HeaderInfo = styled(Box)<HeaderInfo>`
  display: grid;
  grid-template-columns: ${({ variant }) =>
    variant === "student" ? "23% 22% 28% 15% 12%" : "17% 30% 24% 15% 12%"};
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  align-items: flex-end;
  justify-items: flex-start;
  padding: 10px 20px;
  & div p {
    font-family: "Prompt";
    font-size: 15px;
    line-height: 120%;
    color: #727f88;
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

interface Table {
  thead: Array<string | undefined>;
  variant: string;
}

const Index = ({ thead, variant }: Table) => {
  return (
    <Box mt={5}>
      <HeaderInfo variant={variant}>
        {thead.map((item) => (
          <div>{item ? <p>{item}</p> : null}</div>
        ))}
      </HeaderInfo>
    </Box>
  );
};

export default Index;
