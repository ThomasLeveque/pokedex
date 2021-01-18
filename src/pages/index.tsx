import React from 'react';
import { NextPage } from 'next';
import { Center, Container } from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';
import Redirect from '@components/redirect';
import SignUp from '@components/sign-up';
import SignIn from '@components/sign-in';
import { PokemonLogo } from '@components/pokemon-logo';

type LoginPageProps = {};

const LoginPage: NextPage<LoginPageProps> = () => {
  const { user } = useAuth();

  if (user) {
    return <Redirect to="/pokedex" />;
  }

  return (
    <Container py="6">
      <Center mb="4">
        <PokemonLogo />
      </Center>
      <SignIn />
      <SignUp />
    </Container>
  );
};

export default LoginPage;
