import React from 'react';
import Image from 'next/image';
import { Box, Heading, Badge, Center, Stack } from '@chakra-ui/react';

import { Pokemon } from '@data-types/pokemon.type';

type PokedexItemProps = {
  pokemon: Pokemon;
};

const PokedexItem: React.FC<PokedexItemProps> = ({ pokemon }) => {
  return (
    <Box p="6" borderWidth="2px" borderRadius="lg" overflow="hidden" backgroundColor="white">
      <Heading mb="2" as="h2" size="md" textAlign="center">
        {pokemon.name}
      </Heading>
      <Image width={475} height={475} src={pokemon.imageUrl} alt={pokemon.name} />
      <Center flexDirection="column" mt="4">
        <Stack direction="row">
          {pokemon.types.map((type) => (
            <Badge
              color={`${type}.text`}
              bgGradient={`linear(to-r, ${type}.start, ${type}.end)`}
              key={`${pokemon.name}-${type}`}
            >
              {type}
            </Badge>
          ))}
        </Stack>
      </Center>
    </Box>
  );
};

export default PokedexItem;
