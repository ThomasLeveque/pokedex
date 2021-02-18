import { ColorMode } from '@chakra-ui/react';

export interface PokedexReward {
  color: string;
  bg: string;
  description: string;
}

export const formatPokedexReward = (
  pokedexCount: number,
  colorMode: ColorMode
): PokedexReward | null => {
  switch (pokedexCount) {
    case 1:
      return {
        color: colorMode === 'light' ? 'white' : 'gray.900',
        bg: colorMode === 'light' ? 'gray.900' : 'white',
        description: 'You have seen your FIRST pokemon.',
      };
    case 50:
      return {
        color: 'white',
        bg: 'bronze',
        description: 'You have seen at least 50 pokemons.',
      };
    case 100:
      return {
        color: 'gray.900',
        bg: 'silver',
        description: 'You have seen at least 100 pokemons.',
      };
    case 150:
      return {
        color: 'gray.900',
        bg: 'gold',
        description: 'You have seen ALL pokemon.',
      };
    case 151:
      return {
        color: 'white',
        bg: 'primary',
        description: 'You have seen ALL pokemon and Mew.',
      };
    default:
      return null;
  }
};
