import React from 'react';
import Image from 'next/image';
import { Box, Heading, Badge, Center, Stack, Text, Kbd, useColorModeValue } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';

import { Pokemon } from '@data-types/pokemon.type';
import PokedexModal from './pokedex-modal';
import { Document } from '@libs/firebase/firebase-types';

type PokedexItemProps = {
  pokemon: Document<Pokemon>;
};

const PokedexItem: React.FC<PokedexItemProps> = ({ pokemon }) => {
  const bg = useColorModeValue('white', 'gray.800');
  return (
    <Box p="6" borderWidth="2px" borderRadius="lg" overflow="hidden" bg={bg}>
      <Center flexDirection="column">
        <Heading textTransform="capitalize" mb="2" as="h2" size="md">
          <Kbd>#{pokemon.apiId}</Kbd> {pokemon.name}
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
        <PokedexModal pokemon={pokemon} />
        <Text mt="4" color="gray.500" fontSize="sm">
          Met {formatDistanceToNow(new Date(pokemon.metDate as number))} ago
        </Text>
      </Center>
    </Box>
  );
};

export default PokedexItem;
