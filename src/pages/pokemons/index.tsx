import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import { NextPage } from 'next';
import { InputGroup, SimpleGrid, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import Layout from '@components/layout';
import { getPokemons } from '@libs/pokeapi/db';
import { Pokemon } from '@data-types/pokemon.type';
import PokemonItem from '@components/pokemon-item';

const generatePokemonToFetch = (): number[] =>
  Array.from(
    { length: process.env.NODE_ENV === 'development' ? 10 : 151 },
    (_, index) => index + 1
  );

type PokemonsPageProps = {};

const PokemonsPage: NextPage<PokemonsPageProps> = () => {
  const [search, setSearch] = useState<string>('');

  const pokemonsToFetch = generatePokemonToFetch();
  const { data: pokemons } = useSWR<Pokemon[]>('pokemons', () => getPokemons(pokemonsToFetch));

  const filteredPokemons = useMemo(
    () => pokemons?.filter((pokemon) => pokemon.name.includes(search)),
    [search, pokemons]
  );

  return (
    <Layout>
      <InputGroup mb="6">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search for a pokemon"
          borderWidth="2px"
          backgroundColor="white"
          onChange={(event) => setSearch(event.target.value)}
        />
      </InputGroup>
      <SimpleGrid columns={4} spacing={8}>
        {filteredPokemons &&
          filteredPokemons.map((pokemon) => <PokemonItem key={pokemon.apiId} pokemon={pokemon} />)}
      </SimpleGrid>
    </Layout>
  );
};

export default PokemonsPage;
