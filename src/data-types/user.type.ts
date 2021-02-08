import { FieldValue } from '@firebase/firestore-types';

export interface User extends AdditionalUserData {
  email: string;
  isAdmin: boolean;
  createdAt: number;
  updatedAt: number;
  provider?: string;
  starterId: number | null;
  starterAvatarUrl: string | null;
  pokedexCount: number | FieldValue;
}

export interface AdditionalUserData {
  pseudo: string;
  character: Character;
}

export type Character = 'blue' | 'red' | 'leaf';
