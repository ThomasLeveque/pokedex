import React from 'react';
import { NextPage } from 'next';

import Layout from '@components/layout';

type PokemonsPageProps = {};

const PokemonsPage: NextPage<PokemonsPageProps> = () => {
  return (
    <Layout>
      <h1>All pokemons</h1>
    </Layout>
  );
};

export default PokemonsPage;
