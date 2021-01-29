import React, { useMemo } from 'react';
import { NextPage } from 'next';
import { Heading, SimpleGrid, Box, Flex, Spinner, Center } from '@chakra-ui/react';

import Layout from '@components/layout';
import { useAuth } from '@hooks/useAuth';
import StartersModal from '@components/starters-modal';
import useCollection from '@hooks/useCollection';
import { Pokemon } from '@data-types/pokemon.type';
import PokedexItem from '@components/pokedex-item';
import PokemonDetail from '@components/pokemon-detail';

const HomePage: NextPage = () => {
  const { user } = useAuth();
  const { data: pokedex } = useCollection<Pokemon>(`users/${user?.id}/pokedex`, {
    orderBy: ['apiId', 'asc'],
  });

  const starter = useMemo(() => pokedex?.find((poke) => poke.apiId === user?.starterId), [
    user,
    pokedex,
  ]);

  return (
    <Layout>
      {!pokedex ? (
        <Center>
          <Spinner mt="8" />
        </Center>
      ) : starter ? (
        <Flex alignItems="start">
          <Box>
            <Heading mb="8">The pokedex of {user?.pseudo}</Heading>
            <SimpleGrid columns={3} spacing={8} mt="6">
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
