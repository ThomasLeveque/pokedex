import { fromEmailToPseudo } from './format-string';
import { User as AuthUser } from '@firebase/auth-types';

import { User } from '@data-types/user.type';

export const formatUser = ({ email }: AuthUser): User => {
  const formatedDisplayName = fromEmailToPseudo(email as string);

  return {
    email: email as string,
    displayName: formatedDisplayName,
    isAdmin: false,
    totalPokemon: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};
