import React from 'react';
import { NextPage } from 'next';

import Layout from '@components/layout';
import { useAuth } from '@hooks/useAuth';
import StartersModal from '@components/starters-modal';
import { Heading, SimpleGrid } from '@chakra-ui/react';
import useCollection from '@hooks/useCollection';
import { Pokemon } from '@data-types/pokemon.type';
import PokedexItem from '@components/pokedex-item';

type HomePageProps = {};

const HomePage: NextPage<HomePageProps> = () => {
  const { user } = useAuth();
  const { data: pokedex } = useCollection<Pokemon>(`users/${user?.id}/pokedex`);

  return (
    <Layout>
      <Heading textAlign="center" mb="8">
        The pokedex of {user?.pseudo}
      </Heading>
      {!user?.starterId && <StartersModal />}
      <SimpleGrid columns={4} spacing={8}>
        {pokedex?.map((pokemon) => (
          <PokedexItem key={pokemon.apiId} pokemon={pokemon} />
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export default HomePage;
