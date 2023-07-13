import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 80px;
  background-color: rgba(255, 255, 255, 0.76);
  backdrop-filter: blur(5px);
  @media screen and (max-width: 820px) {
    padding: 15px 20px;
  }
`;

const Index = () => {
  return (
    <Header>
      <Box>
        <h2>TranscoR</h2>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ color: "#fff", fontFamily: "Prompt", boxShadow: "none" }}
        >
          Ver perfil
        </Button>
      </Box>
    </Header>
  );
};

export default Index;
