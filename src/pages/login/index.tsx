import styled from "styled-components";
import Box from "@mui/material/Box";
import LoginForm from "@/components/LoginForm";

const Content = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContentRight = styled(Box)`
  padding: 50px;
  background-color: #fff;
  border-radius: 7px;
  width: 500px;
  @media screen and (max-width: 820px) {
    padding: 25px;
    width: 350px;
  }
`;

const Index = () => {
  return (
    <Content>
      <Box>
        <ContentRight>
          <LoginForm />
        </ContentRight>
      </Box>
    </Content>
  );
};

export default Index;
