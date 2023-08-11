import { Main } from '@/templates/Main';
import { Meta } from '@/layouts/Meta';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Header from '@/layouts/header';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonBack from '@/components/ButtonBack';
import Image from 'next/image';
import IconEmail from '@/assets/icons/mail.svg';
import IconLogout from '@/assets/icons/logout.svg';
import ProfileTab from '@/components/profile-tab';
import { useStudentsStore, useUserStore } from '@/store';

const Content = styled(Box)`
  margin: 60px auto;
  max-width: 1000px;
  @media screen and (max-width: 820px) {
    margin: 30px 20px;
  }
`;

const Title = styled.h1`
  font-weight: 500;
  @media screen and (max-width: 820px) {
    font-size: 30px;
  }
`;

const Email = styled.p`
  font-size: 14px;
  & img {
    vertical-align: middle;
    margin-right: 5px;
  }
`;

const Index = () => {
  const router = useRouter();

  // @ts-ignore
  const user = useUserStore((state) => state.user);
  // @ts-ignore
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  // @ts-ignore
  const setStudentsInfo = useStudentsStore((state) => state.setStudentsInfo);

  const logOut = () => {
    setStudentsInfo([]);
    setUserInfo({});
    localStorage.removeItem('user_uid');
    router.push('/login');
  };

  return (
    <Main
      meta={
        <Meta
          title="TranscoR - Mi cuenta"
          description="lleva el control de los pagos de tus estudiantes"
        />
      }
    >
      <Box mt={14}>
        <Header />
        <Content>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            mt={1}
            justifyContent="space-between"
          >
            <Box>
              <ButtonBack />
              <Title>{user?.name}</Title>
              <Email>
                <Image
                  width={14}
                  height={14}
                  priority
                  src={IconEmail}
                  alt="icon-email"
                />
                {user?.email}
              </Email>
            </Box>
            <Box>
              <Button
                variant="text"
                sx={{
                  fontFamily: 'Prompt',
                  boxShadow: 'none',
                  marginRight: '10px',
                  padding: '6px 30px',
                  color: '#1d1d1d',
                  background: '#e9edf3',
                }}
                onClick={logOut}
              >
                <Image
                  width={14}
                  height={14}
                  priority
                  src={IconLogout}
                  alt="icon-logout"
                  style={{ marginRight: '5px' }}
                />
                Cerrar sesión
              </Button>
            </Box>
          </Stack>
          <Box mt={3}>
            <ProfileTab />
          </Box>
        </Content>
      </Box>
    </Main>
  );
};

export default Index;
