import React from 'react';
import Image from 'next/image';
import {
  Center,
  Text,
  Heading,
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
} from '@chakra-ui/react';

import { Document } from '@libs/firebase/firebase-types';
import { Pokemon } from '@data-types/pokemon.type';

interface PokemonDetailProps {
  pokemon: Document<Pokemon>;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  return (
    <>
      <Center flexDirection="column">
        <Heading as="h2" mb="4" size="md">
          About {pokemon.name}
        </Heading>
        <Center height="200px" w="200px" position="relative">
          <Box
            position="absolute"
            bgGradient={`linear(to-r, ${pokemon.types[0]}.start, ${pokemon.types[0]}.end)`}
            w="80%"
            height="80%"
            rounded="full"
          />
          <Image
            key={`${pokemon.name}-detail-image`}
            width={475}
            height={475}
            src={pokemon.imageUrl}
            alt={pokemon.name}
          />
        </Center>
        <Text color="gray.500" mt="3">
          {pokemon.height * 10} cm - {pokemon.weight / 10} kg
        </Text>
      </Center>
      <Divider my="5" />
      <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={2}>
        {pokemon.stats.map((stat) => (
          <Stat key={stat.name}>
            <StatLabel textTransform="capitalize">{stat.name}</StatLabel>
            <StatNumber>{stat.baseStat}</StatNumber>
          </Stat>
        ))}
      </Grid>
    </>
  );
};

export default PokemonDetail;
