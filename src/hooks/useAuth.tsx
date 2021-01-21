import React, { createContext, useContext, memo, useEffect, useState } from 'react';
import { User as AuthUser } from '@firebase/auth-types';

import { createUser, updateUser } from '@libs/firebase/client/db';
import { auth } from '@libs/firebase/client/firebase';
import { Document } from '@libs/firebase/firebase-types';
import { AdditionalUserData, User } from '@data-types/user.type';
import { fetchDocument } from '@libs/firebase/client/fetchers';
import { errorToast } from '@utils/toasts';

type AuthContextType = {
  user: Document<User> | null;
  userLoaded: boolean;
  signUpWithEmail: (
    email: string,
    password: string,
    additionalData: AdditionalUserData
  ) => Promise<void | null>;
  signInWithEmail: (email: string, password: string) => Promise<void | null>;
  signOut: () => Promise<void | null>;
  setUserStarter: (
    userId: string,
    starterId: string,
    starterAvatarUrl: string
  ) => Promise<void | null>;
};

const authContext = createContext<AuthContextType>({
  user: null,
  userLoaded: false,
  signUpWithEmail: async () => null,
  signInWithEmail: async () => null,
  signOut: async () => null,
  setUserStarter: async () => null,
});

export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useAuth must be used in a component within a AuthProvider.');
  }
  return context;
};

const AuthProvider = memo(({ children }) => {
  const [user, setUser] = useState<Document<User> | null>(null);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  const handleUser = async (
    authUser: AuthUser | null,
    additionalData?: AdditionalUserData
  ): Promise<void> => {
    if (authUser) {
      let userData = await fetchDocument<User>(`users/${authUser.uid}`);

      if (!userData.exists) {
        await createUser(authUser.uid, authUser, additionalData as AdditionalUserData);
        userData = await fetchDocument<User>(`users/${authUser.uid}`);
      }
      setUser(userData);
    } else {
      setUser(null);
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    additionalData: AdditionalUserData
  ): Promise<void> => {
    const { user: authUser } = await auth.createUserWithEmailAndPassword(email, password);
    return handleUser(authUser, additionalData);
  };

  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    const { user: authUser } = await auth.signInWithEmailAndPassword(email, password);
    return handleUser(authUser);
  };

  const signOut = async (): Promise<void> => {
    await auth.signOut();
    return handleUser(null);
  };

  const setUserStarter = async (
    userId: string,
    starterId: string,
    starterAvatarUrl: string
  ): Promise<void> => {
    await updateUser(userId, { starterId, starterAvatarUrl });
    setUser((prevUser) => ({ ...prevUser, starterId, starterAvatarUrl } as Document<User>));
  };

  useEffect(() => {
    // Execut unsubscribe() inside onAuthStateChanged to fire it only at lauching time
    const unsubscribe = auth.onAuthStateChanged(
      async (authUser: AuthUser | null) => {
        try {
          await handleUser(authUser);
        } catch (err) {
          console.error(err);
          errorToast({ description: err.message });
        }
        setUserLoaded(true);
        unsubscribe();
      },
      (err) => {
        console.error(err);
        errorToast({ description: err.message });
        setUserLoaded(true);
        unsubscribe();
      }
    );

    return () => unsubscribe();
  }, []);

  const authValue: AuthContextType = {
    user,
    userLoaded,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    setUserStarter,
  };

  return <authContext.Provider value={authValue}>{children}</authContext.Provider>;
});

export default AuthProvider;
