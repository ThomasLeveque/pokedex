import React, { useState } from 'react';
import { NextPage } from 'next';
import { Center, Container } from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';
import Redirect from '@components/redirect';
import SignUp from '@components/sign-up';
import SignIn from '@components/sign-in';
import { PokemonLogo } from '@components/pokemon-logo';

const LoginPage: NextPage = () => {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  if (user) {
    return <Redirect to="/pokedex" />;
  }

  const toggleIsLogin = (): void => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <Container py="6">
      <Center mb="4">
        <PokemonLogo />
      </Center>
      {isLogin ? (
        <SignIn toggleIsLogin={toggleIsLogin} />
      ) : (
        <SignUp toggleIsLogin={toggleIsLogin} />
      )}
    </Container>
  );
};

export default LoginPage;
