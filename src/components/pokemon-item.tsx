import React from 'react';
import Image from 'next/image';
import { Box, Heading, Button, Center } from '@chakra-ui/react';

import { Pokemon } from '@data-types/pokemon.type';

type PokemonItemProps = {
  pokemon: Pokemon;
};

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
  return (
    <Box p="6" borderWidth="2px" borderRadius="lg" overflow="hidden" backgroundColor="white">
      <Heading mb="2" as="h2" size="md" textAlign="center">
        {pokemon.name}
      </Heading>
      <Image width={475} height={475} src={pokemon.imageUrl} alt={pokemon.name} />
      <Center>
        <Button mt="4">Mark as seen</Button>
      </Center>
    </Box>
  );
};

export default PokemonItem;
