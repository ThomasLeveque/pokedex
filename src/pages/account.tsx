import React from 'react';
import { NextPage } from 'next';

import Layout from '@components/layout';
import { useAuth } from '@hooks/useAuth';

type AccountProps = {};

const Account: NextPage<AccountProps> = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <h1>Account</h1>
      <h2>Name: {user?.displayName}</h2>
      <h3>Email: {user?.email}</h3>
    </Layout>
  );
};

export default Account;
