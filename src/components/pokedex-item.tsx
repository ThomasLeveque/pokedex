import React from 'react';
import Image from 'next/image';
import { Box, Heading, Badge, Center, Stack, Button } from '@chakra-ui/react';

import { Pokemon } from '@data-types/pokemon.type';

type PokedexItemProps = {
  pokemon: Pokemon;
};

const PokedexItem: React.FC<PokedexItemProps> = ({ pokemon }) => {
  return (
    <Box p="6" borderWidth="2px" borderRadius="lg" overflow="hidden" backgroundColor="white">
      <Center flexDirection="column">
        <Heading textTransform="capitalize" mb="2" as="h2" size="md">
          {pokemon.name}
        </Heading>
        <Image width={475} height={475} src={pokemon.imageUrl} alt={pokemon.name} />

        <Stack direction="row" mb="6" mt="4">
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
        <Button>More details</Button>
      </Center>
    </Box>
  );
};

export default PokedexItem;
