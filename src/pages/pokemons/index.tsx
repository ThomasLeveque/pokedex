import React, { useEffect } from 'react';
import { NextPage } from 'next';

import Layout from '@components/layout';
import { getPokemons } from '@libs/pokeapi/db';

type PokemonsPageProps = {};

const PokemonsPage: NextPage<PokemonsPageProps> = () => {
  useEffect(() => {
    const pokemonsToFetch = Array.from({ length: 1 }, (_, index) => index + 1);
    getPokemons(pokemonsToFetch);
  }, []);

  return (
    <Layout>
      <h1>All pokemons</h1>
    </Layout>
  );
};

export default PokemonsPage;
