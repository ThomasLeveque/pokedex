import React, { useCallback, useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Heading, Button, Center, useColorModeValue } from '@chakra-ui/react';

import { Pokemon } from '@data-types/pokemon.type';
import { useAuth } from '@hooks/useAuth';
import { errorToast, successToast, warningToast } from '@utils/toasts';
import { Document } from '@libs/firebase/firebase-types';

type PokemonItemProps = {
  pokemon: Pokemon;
  pokedex: Document<Pokemon>[];
};

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon, pokedex }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const bg = useColorModeValue('white', 'gray.800');

  const { user, saveInPokedex } = useAuth();
  const router = useRouter();

  const isInPokedex = useMemo(() => !!pokedex.find((poke) => poke.apiId === pokemon.apiId), [
    pokedex,
  ]);

  const handleSeenPokemon = useCallback(async () => {
    if (!user?.starterId) {
      warningToast({ description: 'You must choose a starter before begin your adventure' });
      router.push('/starter');
      return;
    }

    try {
      setLoading(true);
      await saveInPokedex(user?.id as string, pokemon, 1);
      successToast({
        title: `Congrats, you have seen ${pokemon.name}`,
        description: 'Catch them all !',
      });
      // Do not setLoading(false) because of the isLoading prop of the Button down below
    } catch (err) {
      console.log(err);
      errorToast({
        description: err.message,
      });
      setLoading(false);
    }
  }, []);

  return (
    <Box p="6" borderWidth="2px" borderRadius="lg" overflow="hidden" bg={bg}>
      <Heading textTransform="capitalize" mb="2" as="h2" size="md" textAlign="center">
        {pokemon.name}
      </Heading>
      <Image width={475} height={475} src={pokemon.imageUrl} alt={pokemon.name} />
      <Center>
        <Button
          isLoading={loading && !isInPokedex}
          disabled={isInPokedex}
          mt="4"
          onClick={handleSeenPokemon}
        >
          {isInPokedex ? 'Already Seen' : 'Mark as seen'}
        </Button>
      </Center>
    </Box>
  );
};

export default PokemonItem;
