import { EvolutionChain } from '@data-types/evolution-chain.type';
import { Pokemon, Type } from '@data-types/pokemon.type';
import { formatEvolutionChain } from '@utils/format-evolution-chain';
import { formatPokemon } from './../../utils/format-pokemon';

export const getPokemons = async (pokemonsToFetch: number[]): Promise<Pokemon[]> => {
  const promisePokemons = pokemonsToFetch.map(async (pokemonId) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POKEAPI_BASE_URL}/pokemon/${pokemonId}`
    );
    const data = await response.json();
    return formatPokemon(data);
  });

  const pokemons = await Promise.all(promisePokemons);
  return pokemons.sort((a, b) => a.apiId - b.apiId);
};

export const getPokemon = async (pokemonIdName: number | string): Promise<Pokemon> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_POKEAPI_BASE_URL}/pokemon/${pokemonIdName}`
  );
  const data = await response.json();
  return formatPokemon(data);
};

export const getPokemonEvolutionChain = async (pokemonId: number): Promise<EvolutionChain> => {
  const speciesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_POKEAPI_BASE_URL}/pokemon-species/${pokemonId}`
  );
  const speciesData = await speciesResponse.json();

  const evolChainresponse = await fetch(speciesData.evolution_chain.url);
  const evolChainData = await evolChainresponse.json();
  return formatEvolutionChain(evolChainData.chain);
};

const findStarterEvolutionName = (
  starterName: string,
  evolutionChain: EvolutionChain
): { evolutionName: string; hasEvolution: boolean } => {
  if (starterName === evolutionChain.species.name) {
    return {
      evolutionName: evolutionChain.evolves_to[0].species.name,
      hasEvolution: !!evolutionChain.evolves_to[0].evolves_to.length,
    };
  }
  return findStarterEvolutionName(starterName, evolutionChain.evolves_to[0]);
};

export const getStarterEvolution = async (
  starterId: number,
  starterName: string
): Promise<{ evolution: Pokemon; hasEvolution: boolean }> => {
  const evolutionChain = await getPokemonEvolutionChain(starterId);

  if (evolutionChain.evolves_to.length === 0) {
    throw new Error("This pokemon doesn't have an evolution");
  }

  const { evolutionName, hasEvolution } = findStarterEvolutionName(starterName, evolutionChain);
  const evolution = await getPokemon(evolutionName);
  return { evolution, hasEvolution };
};

export const getTypes = async (): Promise<Type[]> => {
  const generationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_POKEAPI_BASE_URL}/generation/1`
  );
  const generationsData = await generationResponse.json();
  const types: { name: Type }[] = generationsData.types;
  return types.map((type) => type.name);
};
