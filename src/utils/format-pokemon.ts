import { Pokemon } from '@data-types/pokemon.type';

export const formatPokemon = (data: any): Pokemon => {
  return {
    apiId: data.id,
    height: data.height,
    weight: data.weight,
    name: data.name,
    imageUrl: data.sprites.other['official-artwork'].front_default,
    avatarUrl: data.sprites.front_default,
    stats: data.stats.map((stat: any) => ({ baseStat: stat.base_stat, name: stat.stat.name })),
    types: data.types.map((type: any) => type.type.name),
  };
};
