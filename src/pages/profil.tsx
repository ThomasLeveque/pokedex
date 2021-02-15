import React, { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { Box, Button, Center, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Layout from '@components/layout';
import PokemonDetail from '@components/pokemon-detail';
import { useAuth } from '@hooks/useAuth';
import { errorToast, successToast, warningToast } from '@utils/toasts';
import { getStarterEvolution } from '@libs/pokeapi/db';
import { fetchDocument } from '@libs/firebase/fetchers';
import useDocument from '@hooks/useDocument';
import DataLoader from '@components/data-loader';
import { Pokemon } from '@data-types/pokemon.type';
import UserStats from '@components/user-stats';
import ProfilStarterWrapper from '@components/profil-starter-wrapper';

const Profil: NextPage = () => {
  const [evolveLoading, setEvolveLoading] = useState<boolean>(false);

  const { signOut, user, setUserStarter, saveInPokedex } = useAuth();
  const router = useRouter();

  const { data: starter } = useDocument<Pokemon>(`users/${user?.id}/pokedex/${user?.starterId}`);
  console.log(starter);
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
      errorToast({ description: err.message });
    }
  };

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
        updatedAt: Date.now(),
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
      <Flex alignItems="start">
        {user && (
          <Center width="100%" flexDirection="column">
            <Box borderWidth="2px" borderRadius="full" width="150px" bg="white" p="1" mb="4">
              <Image src={`/images/${user.character}.png`} width={500} height={500} />
            </Box>
            <Heading as="h1" size="2xl" mb="2">
              {user.pseudo}
            </Heading>
            <Text fontSize="lg" mb="2">
              {user.email}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mb="4">
              {user.pokedexCount} / 151
            </Text>
            <Button variant="primary" onClick={handleSignOut}>
              Leave
            </Button>
            <Divider my="8" />
            <UserStats user={user} />
          </Center>
        )}
        {starter ? (
          <ProfilStarterWrapper>
            {starter.exists ? (
              <>
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
              </>
            ) : (
              <Button variant="primary" onClick={() => router.push('/starter')}>
                Choose your starter
              </Button>
            )}
          </ProfilStarterWrapper>
        ) : (
          <ProfilStarterWrapper>
            <DataLoader />
          </ProfilStarterWrapper>
        )}
      </Flex>
    </Layout>
  );
};

export default Profil;
