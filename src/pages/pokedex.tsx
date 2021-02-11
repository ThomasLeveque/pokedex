import React, { useMemo, useState } from 'react';
import { NextPage } from 'next';
import { Heading, SimpleGrid, Box, Flex, Button, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Layout from '@components/layout';
import { useAuth } from '@hooks/useAuth';
import StartersModal from '@components/starters-modal';
import useCollection from '@hooks/useCollection';
import { Pokemon } from '@data-types/pokemon.type';
import PokedexItem from '@components/pokedex-item';
import PokemonDetail from '@components/pokemon-detail';
import DataLoader from '@components/data-loader';
import { getStarterEvolution } from '@libs/pokeapi/db';
import { errorToast, successToast, warningToast } from '@utils/toasts';
import { fetchDocument } from '@libs/firebase/client/fetchers';

const HomePage: NextPage = () => {
  const { setUserStarter, saveInPokedex, user } = useAuth();
  const { data: pokedex } = useCollection<Pokemon>(`users/${user?.id}/pokedex`, {
    orderBy: ['apiId', 'asc'],
  });
  const [evolveLoading, setEvolveLoading] = useState<boolean>(false);

  const router = useRouter();

  const starter = useMemo(() => pokedex?.find((poke) => poke.apiId === user?.starterId), [
    user,
    pokedex,
  ]);

  const handleStarterEvolution = async (): Promise<void> => {
    if (!starter) {
      warningToast({ description: 'You must choose a starter before begin your adventure' });
      return;
    }

    const oldStarterName = starter.name;

    try {
      setEvolveLoading(true);
      const { evolution: starterEvolution, hasEvolution } = await getStarterEvolution(
        starter.apiId,
        starter.name
      );

      const { exists: isEvolutionAlreadyInPokedex } = await fetchDocument(
        `users/${user?.id}/pokedex/${starterEvolution.apiId}`
      );

      if (!isEvolutionAlreadyInPokedex) {
        await saveInPokedex(user?.id as string, starterEvolution, 1);
      }
      await setUserStarter(user?.id as string, {
        starterId: starterEvolution.apiId,
        starterAvatarUrl: starterEvolution.avatarUrl,
        hasStarterEvolution: hasEvolution,
        starterEvolveDate: Date.now(),
      });
      successToast({
        title: `Congrat ! ${oldStarterName} has evolve to ${starterEvolution.name}`,
        description: `may ${starterEvolution.types.join(' and ')} be with you`,
      });
    } catch (err) {
      console.error(err);
      errorToast({
        description: err.message || err,
      });
    }
    setEvolveLoading(false);
  };

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
          <Center
            bg="white"
            borderWidth="2px"
            borderRadius="md"
            padding="8"
            maxW="300px"
            w="100%"
            ml="8"
            flexDirection="column"
          >
            <PokemonDetail pokemon={starter} />
            {user?.hasStarterEvolution && (
              <Button
                isLoading={evolveLoading}
                variant="primary"
                mt="6"
                onClick={handleStarterEvolution}
              >
                {starter.name} has evolve
              </Button>
            )}
          </Center>
        </Flex>
      ) : (
        <StartersModal />
      )}
    </Layout>
  );
};

export default HomePage;
