export interface Pokemon {
  apiId: number;
  height: number;
  weight: number;
  name: string;
  imageUrl: string;
  avatarUrl: string;
  stats: Stat[];
  types: Type[];
}

export interface Stat {
  baseStat: number;
  name: StatName;
}

export type StatName = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';
export type Type =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon';
