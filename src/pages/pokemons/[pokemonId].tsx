import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Layout from '@components/layout';

type PokemonPageProps = {};

const PokemonPage: NextPage<PokemonPageProps> = () => {
  const router = useRouter();
  const { pokemonId } = router.query;

  return (
    <Layout>
      <h1>Pokemon numero {pokemonId}</h1>
    </Layout>
  );
};

export default PokemonPage;
