import { EvolutionChain } from '@data-types/evolution-chain.type';

export const formatEvolutionChain = (data: any): EvolutionChain => {
  return {
    species: data.species,
    evolves_to: data.evolves_to,
  };
};
