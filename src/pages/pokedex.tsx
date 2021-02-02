import React, { useMemo } from 'react';
import { NextPage } from 'next';
import { Heading, SimpleGrid, Box, Flex, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Layout from '@components/layout';
import { useAuth } from '@hooks/useAuth';
import StartersModal from '@components/starters-modal';
import useCollection from '@hooks/useCollection';
import { Pokemon } from '@data-types/pokemon.type';
import PokedexItem from '@components/pokedex-item';
import PokemonDetail from '@components/pokemon-detail';
import DataLoader from '@components/data-loader';

const HomePage: NextPage = () => {
  const { user } = useAuth();
  const { data: pokedex } = useCollection<Pokemon>(`users/${user?.id}/pokedex`, {
    orderBy: ['apiId', 'asc'],
  });
  const router = useRouter();

  const starter = useMemo(() => pokedex?.find((poke) => poke.apiId === user?.starterId), [
    user,
    pokedex,
  ]);

  return (
    <Layout>
      {!pokedex ? (
        <DataLoader />
      ) : starter ? (
        <Flex alignItems="start">
          <Box>
            <Flex alignItems="center" mb="8" justifyContent="space-between">
              <Heading>The pokedex of {user?.pseudo}</Heading>
              <Button variant="primary" onClick={() => router.push('/pokemons')}>
                Fill your pokedex
              </Button>
            </Flex>
            <SimpleGrid columns={3} spacing={8}>
              {pokedex.map((pokemon) => (
                <PokedexItem key={pokemon.apiId} pokemon={pokemon} />
              ))}
            </SimpleGrid>
          </Box>
          <Box
            bg="white"
            borderWidth="2px"
            borderRadius="md"
            padding="8"
            maxW="300px"
            w="100%"
            ml="8"
          >
            <PokemonDetail pokemon={starter} />
          </Box>
        </Flex>
      ) : (
        <StartersModal />
      )}
    </Layout>
  );
};

export default HomePage;
