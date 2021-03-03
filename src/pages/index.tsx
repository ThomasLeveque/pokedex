import React, { useState } from 'react';
import { NextPage } from 'next';

import SignUp from '@components/sign-up';
import SignIn from '@components/sign-in';
import PublicLayout from '@components/public-layout';

const LoginPage: NextPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleIsLogin = (): void => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <PublicLayout title="Welcome ! - Continue or start an adventure.">
      {isLogin ? (
        <SignIn toggleIsLogin={toggleIsLogin} />
      ) : (
        <SignUp toggleIsLogin={toggleIsLogin} />
      )}
    </PublicLayout>
  );
};

export default LoginPage;
