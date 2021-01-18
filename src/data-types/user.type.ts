export interface User extends AdditionalUserData {
  email: string;
  isAdmin: boolean;
  createdAt: number;
  updatedAt: number;
  starterId: string | null;
  starterAvatarUrl: string | null;
}

export interface AdditionalUserData {
  pseudo: string;
  character: Character;
}

export type Character = 'blue' | 'red' | 'leaf';
