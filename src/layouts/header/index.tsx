import { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useStudentsStore, useUserStore } from "@/store";
import { getStudentList } from "@/api/students";
import { getUserInfo } from "@/api/user";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  top: 0px;
  left: 0%;
  right: 0%;
  z-index: 5;
  transition: all 0.2s ease-in-out 0s;
  padding: 0px 80px;
  position: fixed;
  background: rgba(41, 52, 73, 0.8);
  box-shadow: rgba(255, 255, 255, 0.25) 1px 1px 0px inset;
  backdrop-filter: blur(50px);
  margin-top: 0px;
  margin-bottom: 20px;
  & h2 {
    color: #fff;
  }
  @media screen and (max-width: 820px) {
    padding: 15px 20px;
  }
`;

const Index = () => {
  // @ts-ignore
  const students = useStudentsStore((state) => state.students);
  // @ts-ignore
  const setStudentsInfo = useStudentsStore((state) => state.setStudentsInfo);

  // @ts-ignore
  const user = useUserStore((state) => state.user);
  // @ts-ignore
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    // Get Students List
    if (!students.length) {
      getStudentList().then((new_students: any) => {
        setStudentsInfo(new_students);
      });
    }

    // Get User Info
    if (!Object.keys(user).length) {
      getUserInfo().then((userInfo: any) => {
        setUserInfo(userInfo);
      });
    }
  }, []);

  return (
    <Header>
      <Box>
        <Link href="/home">
          <h2>TranscoR</h2>
        </Link>
      </Box>
      <Box>
        <Link href="/profile">
          <Button
            variant="outlined"
            sx={{
              fontFamily: "Prompt",
              boxShadow: "none",
              marginRight: "10px",
              padding: "6px 30px",
            }}
          >
            Perfil
          </Button>
        </Link>
      </Box>
    </Header>
  );
};

export default Index;
