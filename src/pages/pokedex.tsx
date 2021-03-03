import React, { useMemo, useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import {
  Heading,
  Button,
  Center,
  Stack,
  Text,
  Badge,
  useDisclosure,
  Collapse,
  Wrap,
  WrapItem,
  Box,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

import PrivateLayout from '@components/private-layout';
import { useAuth } from '@hooks/useAuth';
import useCollection from '@hooks/useCollection';
import { Pokemon, Type } from '@data-types/pokemon.type';
import PokedexItem from '@components/pokedex-item';
import DataLoader from '@components/data-loader';
import { getTypes } from '@libs/pokeapi/db';
import FilterIcon from '@components/icons/filter-icon';
import FilterSolidIcon from '@components/icons/filter-solid-icon';
import PokemonListWrapper from '@components/pokemon-list-wrapper';

export const getStaticProps: GetStaticProps<PokedexPageProps> = async () => {
  const types = await getTypes();
  return {
    props: {
      types,
    },
  };
};

type PokedexPageProps = {
  types: Type[];
};

const PokedexPage: NextPage<PokedexPageProps> = ({ types }) => {
  const bg = useColorModeValue('white', 'gray.800');

  const [filteredType, setFilteredType] = useState<Type | null>(null);

  const { user } = useAuth();
  const { data: pokedex } = useCollection<Pokemon>(`users/${user?.id}/pokedex`, {
    orderBy: ['apiId', 'asc'],
  });

  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  const pokemonsByType = useMemo(
    () => (filteredType ? pokedex?.filter((poke) => poke.types.includes(filteredType)) : pokedex),
    [filteredType, pokedex]
  );

  const handleClearFilteredType = () => {
    setFilteredType(null);
  };

  return (
    <PrivateLayout title="Learn more about all pokemon you have seen.">
      {!pokemonsByType ? (
        <DataLoader />
      ) : user?.starterId ? (
        <>
          <Stack
            justifyContent="space-between"
            gridGap={5}
            mb="10"
            direction={{ base: 'column', md: 'row' }}
          >
            <Heading size="2xl" as="h1">
              The pokedex of {user?.pseudo}
            </Heading>
            <Stack
              alignSelf={{ base: 'flex-end', md: 'flex-start' }}
              gridGap={3}
              direction="column"
            >
              <Button variant="primary" onClick={() => router.push('/all-pokemon')}>
                Fill your pokedex
              </Button>
              <HStack justifyContent="flex-end" gridGap={2}>
                {filteredType && (
                  <Badge
                    pr="0"
                    display="flex"
                    alignItems="center"
                    color={`${filteredType}.text`}
                    bgGradient={`linear(to-r, ${filteredType}.start, ${filteredType}.end)`}
                    key={`filteredType-${filteredType}`}
                  >
                    {filteredType}
                    <CloseIcon
                      h={2}
                      w={2}
                      p="1"
                      boxSizing="content-box"
                      cursor="pointer"
                      onClick={handleClearFilteredType}
                    />
                  </Badge>
                )}
                <Button
                  onClick={onToggle}
                  px="3"
                  bg={bg}
                  variant="outline"
                  borderWidth="2px"
                  aria-label="Filter pokemons by types"
                >
                  {filteredType ? <FilterSolidIcon /> : <FilterIcon />}
                  {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Button>
              </HStack>
            </Stack>
          </Stack>
          <Collapse in={isOpen} animateOpacity>
            <Wrap mb="8">
              {types.map((type) => (
                <WrapItem key={`${type}`}>
                  <Badge
                    cursor="pointer"
                    onClick={() =>
                      type === filteredType ? handleClearFilteredType() : setFilteredType(type)
                    }
                    color={`${type}.text`}
                    bgGradient={`linear(to-r, ${type}.start, ${type}.end)`}
                  >
                    {type}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          </Collapse>
          <PokemonListWrapper>
            {pokemonsByType.map((pokemon) => (
              <PokedexItem key={pokemon.apiId} pokemon={pokemon} />
            ))}
          </PokemonListWrapper>
          {filteredType && pokemonsByType.length === 0 && (
            <Text fontSize="xl">
              You haven&apos;t seen a pokemon of type{' '}
              <Box as="span" fontWeight="bold" color={`${filteredType}.start`}>
                {filteredType}
              </Box>{' '}
              yet
            </Text>
          )}
        </>
      ) : (
        <Center bg={bg} borderWidth="2px" borderRadius="md" padding="8">
          <Button variant="primary" onClick={() => router.push('/starter')}>
            Pick a starter
          </Button>
        </Center>
      )}
    </PrivateLayout>
  );
};

export default PokedexPage;
