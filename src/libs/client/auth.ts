import { UserCredential } from '@firebase/auth-types';

import { auth } from './firebase';

export const signUpWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signOut = async (): Promise<void> => {
  return auth.signOut();
};
