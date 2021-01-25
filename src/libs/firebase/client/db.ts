import { mutate } from 'swr';

import { Pokemon } from '@data-types/pokemon.type';
import { AdditionalUserData, User } from '@data-types/user.type';
import { User as AuthUser } from '@firebase/auth-types';
import { clientDB } from './firebase';
import { formatUser } from '@utils/format-user';

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
  const snapshot = clientDB.doc(`users/${userId}/pokedex/${pokemon.apiId}`);
  await snapshot.set(pokemon);
  mutate('pokedex', [{ id: snapshot.id, ...pokemon }]);
};
