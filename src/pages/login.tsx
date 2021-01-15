import React from 'react';
import { NextPage } from 'next';

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
    <main>
      <h1>Welcome !</h1>
      <SignUp />
      <SignIn />
    </main>
  );
};

export default LoginPage;
