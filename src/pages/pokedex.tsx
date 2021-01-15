import React from 'react';
import { NextPage } from 'next';

import Layout from '@components/layout';

type HomePageProps = {};

const HomePage: NextPage<HomePageProps> = () => {
  return (
    <Layout>
      <h1>Your pokedex</h1>
    </Layout>
  );
};

export default HomePage;
