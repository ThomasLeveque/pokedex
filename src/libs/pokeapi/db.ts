import { formatPokemon } from './../../utils/format-pokemon';
export const getPokemons = async (pokemonsToFetch: number[]) => {
  const pokemons = [];

  for (const pokemonId of pokemonsToFetch) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POKEAPI_BASE_URL}/pokemon/${pokemonId}`
    );
    const data = await response.json();
    const pokemon = formatPokemon(data);
    pokemons.push(pokemon);
  }

  console.log(pokemons);
  return pokemons;
};
