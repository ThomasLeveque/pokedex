import React, { useState, useMemo } from 'react';
import { NextPage, GetStaticProps } from 'next';
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  useColorModeValue,
  Box,
  Text,
  CloseButton,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import PrivateLayout from '@components/private-layout';
import { getPokemons } from '@libs/pokeapi/db';
import { Pokemon } from '@data-types/pokemon.type';
import PokemonItem from '@components/pokemon-item';
import useCollection from '@hooks/useCollection';
import { useAuth } from '@hooks/useAuth';
import DataLoader from '@components/data-loader';
import PokemonListWrapper from '@components/pokemon-list-wrapper';

const generatePokemonToFetch = (): number[] =>
  Array.from(
    { length: process.env.NODE_ENV === 'development' ? 10 : 151 },
    (_, index) => index + 1
  );

export const getStaticProps: GetStaticProps<AllPokemonPageProps> = async () => {
  const pokemonsToFetch = generatePokemonToFetch();
  const pokemons = await getPokemons(pokemonsToFetch);
  return {
    props: {
      pokemons,
    },
  };
};

type AllPokemonPageProps = {
  pokemons: Pokemon[];
};

const AllPokemonPage: NextPage<AllPokemonPageProps> = ({ pokemons }) => {
  const bg = useColorModeValue('white', 'gray.800');

  const [search, setSearch] = useState<string>('');

  const { user } = useAuth();
  const { data: pokedex } = useCollection<Pokemon>(`users/${user?.id}/pokedex`, {
    orderBy: ['apiId', 'asc'],
  });

  const filteredPokemons = useMemo(
    () => pokemons?.filter((pokemon) => pokemon.name.includes(search)),
    [search, pokemons]
  );

  return (
    <PrivateLayout title="Search for any pokemon you have seen.">
      <InputGroup mb="6">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        {search.length > 0 && (
          <InputRightElement>
            <CloseButton variant="clear" onClick={() => setSearch('')} />
          </InputRightElement>
        )}
        <Input
          maxLength={50}
          placeholder="Search for a pokemon"
          bg={bg}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </InputGroup>
      {!pokedex ? (
        <DataLoader />
      ) : filteredPokemons.length > 0 ? (
        <PokemonListWrapper>
          {filteredPokemons.map((pokemon) => (
            <PokemonItem key={pokemon.apiId} pokemon={pokemon} pokedex={pokedex} />
          ))}
        </PokemonListWrapper>
      ) : (
        search.length > 0 && (
          <Text fontSize="xl">
            There is no pokemon named{' '}
            <Box as="span" fontWeight="bold">
              {search}
            </Box>
          </Text>
        )
      )}
    </PrivateLayout>
  );
};

export default AllPokemonPage;
