import { successToast } from './../../../utils/toasts';
import { mutate } from 'swr';

import { Pokemon } from '@data-types/pokemon.type';
import { AdditionalUserData, User } from '@data-types/user.type';
import { User as AuthUser } from '@firebase/auth-types';
import { clientDB } from './firebase';
import { formatUser } from '@utils/format-user';
import { Document } from '../firebase-types';

export const createUser = async (
  userId: string,
  authUser: AuthUser,
  additionnalData: AdditionalUserData
): Promise<void> => {
  const userRef = clientDB.collection('users').doc(userId);
  const newUser = formatUser(authUser, additionnalData);
  return userRef.set(newUser);
};

export const updateUser = async (userId: string, newUserData: Partial<User>): Promise<void> => {
  const userRef = clientDB.collection('users').doc(userId);
  return userRef.update(newUserData);
};

export const saveInPokedex = async (userId: string, pokemon: Pokemon): Promise<void> => {
  const pokedexPath = `users/${userId}/pokedex`;
  const snapshot = clientDB.doc(`${pokedexPath}/${pokemon.apiId}`);
  await snapshot.set(pokemon);
  mutate(
    pokedexPath,
    (pokedex: Document<Pokemon>[]) => {
      if (!pokedex) {
        return [{ id: snapshot.id, ...pokemon }];
      } else {
        return [{ id: snapshot.id, ...pokemon }, ...pokedex].sort((a, b) => a.apiId - b.apiId);
      }
    },
    false
  );
};
