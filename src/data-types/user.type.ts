import { FieldValue } from '@firebase/firestore-types';

export interface User extends AdditionalUserData {
  email: string;
  isAdmin: boolean;
  createdAt: number;
  updatedAt: number;
  chosenStarterDate: number | null;
  lastPokemonSeenDate: number | null;
  starterEvolveDate: number | null;
  provider?: string;
  starterId: number | null;
  starterAvatarUrl: string | null;
  hasStarterEvolution: boolean;
  pokedexCount: number | FieldValue;
}

export interface AdditionalUserData {
  pseudo: string;
  character: Character;
}

export type Character = 'blue' | 'red' | 'leaf';
