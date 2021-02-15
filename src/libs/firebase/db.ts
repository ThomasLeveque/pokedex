import { WriteBatch } from '@firebase/firestore-types';
import { User as AuthUser } from '@firebase/auth-types';

import { AdditionalUserData, User } from '@data-types/user.type';
import { db } from './firebase';
import { formatUser } from '@utils/format-user';

export const createUser = async (
  userId: string,
  authUser: AuthUser,
  additionnalData: AdditionalUserData
): Promise<void> => {
  const userRef = db.collection('users').doc(userId);
  const newUser = formatUser(authUser, additionnalData);
  return userRef.set(newUser);
};

export const updateUser = (
  userId: string,
  newUserData: Partial<User>,
  batch: WriteBatch
): WriteBatch => {
  const userRef = db.collection('users').doc(userId);
  return batch.update(userRef, { ...newUserData, updatedAt: Date.now() } as Partial<User>);
};
