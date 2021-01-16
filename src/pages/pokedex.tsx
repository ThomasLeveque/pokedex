import React from 'react';
import { NextPage } from 'next';

import Layout from '@components/layout';
import { useAuth } from '@hooks/useAuth';

type HomePageProps = {};

const HomePage: NextPage<HomePageProps> = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <h1>The pokedex of {user?.pseudo}</h1>
    </Layout>
  );
};

export default HomePage;
