import React, { useMemo, useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import {
  Heading,
  SimpleGrid,
  Flex,
  Button,
  Center,
  IconButton,
  Spacer,
  Text,
  Badge,
  useDisclosure,
  Collapse,
  Wrap,
  WrapItem,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

import Layout from '@components/layout';
import { useAuth } from '@hooks/useAuth';
import useCollection from '@hooks/useCollection';
import { Pokemon, Type } from '@data-types/pokemon.type';
import PokedexItem from '@components/pokedex-item';
import DataLoader from '@components/data-loader';
import { getTypes } from '@libs/pokeapi/db';
import FilterIcon from '@components/icons/filter-icon';
import FilterSolidIcon from '@components/icons/filter-solid-icon';

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
    <Layout>
      {!pokemonsByType ? (
        <DataLoader />
      ) : user?.starterId ? (
        <>
          <Flex alignItems="start" mb="8">
            <Heading size="2xl" as="h1">
              The pokedex of {user?.pseudo}
            </Heading>
            <Spacer />
            <Flex alignItems="center">
              {filteredType && (
                <Badge
                  mr="3"
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
                mr="4"
                px="3"
                bg={bg}
                variant="outline"
                borderWidth="2px"
                aria-label="Filter pokemons by types"
              >
                {filteredType ? <FilterSolidIcon /> : <FilterIcon strokeWidth={3} />}
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Button>
            </Flex>
            <Button variant="primary" onClick={() => router.push('/all-pokemon')}>
              Fill your pokedex
            </Button>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <Wrap mb="6">
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
          <SimpleGrid columns={5} spacing={8}>
            {pokemonsByType.map((pokemon) => (
              <PokedexItem key={pokemon.apiId} pokemon={pokemon} />
            ))}
          </SimpleGrid>
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
    </Layout>
  );
};

export default PokedexPage;
