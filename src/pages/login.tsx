import React from 'react';
import { NextPage } from 'next';
import { Container, Heading } from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';
import Redirect from '@components/redirect';
import SignUp from '@components/sign-up';
import SignIn from '@components/sign-in';

type LoginPageProps = {};

const LoginPage: NextPage<LoginPageProps> = () => {
  const { user } = useAuth();

  if (user) {
    return <Redirect to="/pokedex" />;
  }

  return (
    <Container>
      <Heading as="h1" size="3xl" textAlign="center" my="6">
        Welcome !
      </Heading>
      <SignIn />
      <SignUp />
    </Container>
  );
};

export default LoginPage;
