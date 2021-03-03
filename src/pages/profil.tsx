import React, { useState, useMemo } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import PrivateLayout from '@components/private-layout';
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
import TrophyIcon from '@components/icons/trophy-icon';
import { formatPokedexReward } from '@utils/format-pokedex-reward';

const Profil: NextPage = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const { colorMode } = useColorMode();

  const [evolveLoading, setEvolveLoading] = useState<boolean>(false);

  const { signOut, user, setUserStarter, saveInPokedex } = useAuth();
  const router = useRouter();

  const { data: starter } = useDocument<Pokemon>(`users/${user?.id}/pokedex/${user?.starterId}`);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
      errorToast({ description: err.message });
    }
  };

  const pokedexReward = useMemo(() => {
    const pokedexCount = user?.pokedexCount as number;
    if (pokedexCount >= 1 && pokedexCount < 50) {
      return formatPokedexReward(1, colorMode);
    } else if (pokedexCount >= 50 && pokedexCount < 100) {
      return formatPokedexReward(50, colorMode);
    } else if (pokedexCount >= 100 && pokedexCount < 150) {
      return formatPokedexReward(100, colorMode);
    } else if (pokedexCount >= 150 && pokedexCount < 151) {
      return formatPokedexReward(150, colorMode);
    } else if (pokedexCount === 151) {
      return formatPokedexReward(151, colorMode);
    } else {
      return null;
    }
  }, [user?.pokedexCount, colorMode]);

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
    <PrivateLayout title="Explore your profil.">
      <Flex alignItems="start" flexDirection={{ base: 'column', md: 'row' }}>
        {user && (
          <Center width="100%" flexDirection="column">
            <Box borderWidth="2px" borderRadius="full" width="150px" bg={bg} p="1" mb="4">
              <Image src={`/images/${user.character}.png`} width={500} height={500} />
            </Box>
            <Heading as="h1" size="2xl">
              {user.pseudo}
              {pokedexReward && (
                <Tooltip
                  hasArrow
                  placement="top"
                  label={pokedexReward.description}
                  aria-label="Pokedex reward message"
                >
                  <span>
                    <TrophyIcon w="12" mb="3" ml="3" fill={pokedexReward.bg} />
                  </span>
                </Tooltip>
              )}
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
    </PrivateLayout>
  );
};

export default Profil;
