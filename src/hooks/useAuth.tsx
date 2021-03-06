import React, { createContext, useContext, memo, useEffect, useState } from 'react';
import { User as AuthUser } from '@firebase/auth-types';
import { useDisclosure, useToast, useColorMode } from '@chakra-ui/react';
import { mutate } from 'swr';

import { createUser, updateUser } from '@libs/firebase/db';
import {
  auth,
  db,
  githubAuthProvider,
  googleAuthProvider,
  increment,
} from '@libs/firebase/firebase';
import { Document } from '@libs/firebase/firebase-types';
import { AdditionalUserData, User } from '@data-types/user.type';
import { fetchDocument } from '@libs/firebase/fetchers';
import { errorToast, successToast } from '@utils/toasts';
import { updateAuthUserDisplayName } from '@libs/firebase/auth';
import { Pokemon } from '@data-types/pokemon.type';
import ProvidersAdditionnalDataModal from '@components/providers-additionnal-data-modal';
import PokdexRewardToast from '@components/pokedex-reward-toast';
import { formatPokedexReward } from '@utils/format-pokedex-reward';

type AuthContextType = {
  user: Document<User> | null;
  userLoaded: boolean;
  signUpWithEmail: (
    email: string,
    password: string,
    additionalData: AdditionalUserData
  ) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  setUserStarter: (userId: string, userToUpdate: Partial<User>) => Promise<void>;
  saveInPokedex: (userId: string, pokemon: Pokemon, increment: number) => Promise<void>;
};

const authContext = createContext<AuthContextType>({
  user: null,
  userLoaded: false,
  signUpWithEmail: async () => undefined,
  signInWithEmail: async () => undefined,
  signInWithGoogle: async () => undefined,
  signInWithGithub: async () => undefined,
  signOut: async () => undefined,
  setUserStarter: async () => undefined,
  saveInPokedex: async () => undefined,
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handleUser = async (
    authUser: AuthUser | null,
    additionalData?: AdditionalUserData,
    isLogin = true
  ): Promise<void> => {
    if (authUser) {
      let userData = await fetchDocument<User>(`users/${authUser.uid}`);

      if (!userData.exists) {
        if (authUser.providerData[0]?.providerId !== 'password') {
          if (!isOpen) {
            onOpen();
            return;
          } else {
            await createUser(authUser.uid, authUser, additionalData as AdditionalUserData);
            userData = await fetchDocument<User>(`users/${authUser.uid}`);
            successToast({
              title: `Welcome ${additionalData?.pseudo}`,
              description: 'Catch them all !',
            });
            setUser(userData);
            return;
          }
        }

        await createUser(authUser.uid, authUser, additionalData as AdditionalUserData);
        userData = await fetchDocument<User>(`users/${authUser.uid}`);
        successToast({
          title: `Welcome ${additionalData?.pseudo}`,
          description: 'Catch them all !',
        });
        setUser(userData);
        return;
      }
      // To prevent the toast on login reload
      if (isLogin) {
        successToast({
          title: `Welcome back ${userData.pseudo}`,
          description: 'Catch them all !',
        });
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
    await updateAuthUserDisplayName(authUser, { displayName: additionalData.pseudo });
    return handleUser(authUser, additionalData);
  };

  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    const { user: authUser } = await auth.signInWithEmailAndPassword(email, password);
    return handleUser(authUser);
  };

  const signInWithGoogle = async (): Promise<void> => {
    const { user: authUser } = await auth.signInWithPopup(googleAuthProvider);
    return handleUser(authUser);
  };

  const signInWithGithub = async (): Promise<void> => {
    const { user: authUser } = await auth.signInWithPopup(githubAuthProvider);
    return handleUser(authUser);
  };

  const signOut = async (): Promise<void> => {
    await auth.signOut();
    return handleUser(null);
  };

  const setUserStarter = async (userId: string, userToUpdate: Partial<User>): Promise<void> => {
    const batch = updateUser(userId, userToUpdate, db.batch());
    await batch.commit();
    setUser(
      (prevUser) =>
        ({
          ...prevUser,
          ...userToUpdate,
        } as Document<User>)
    );
  };

  const saveInPokedex = async (
    userId: string,
    pokemon: Pokemon,
    incrementValue: number
  ): Promise<void> => {
    const pokedexPath = `users/${userId}/pokedex`;
    const pokemonRef = db.doc(`${pokedexPath}/${pokemon.apiId}`);
    pokemon = { ...pokemon, metDate: Date.now() };

    let batch = db.batch();
    batch.set(pokemonRef, pokemon);
    batch = updateUser(
      userId,
      { pokedexCount: increment(incrementValue), lastPokemonSeenDate: Date.now() },
      batch
    );
    await batch.commit();

    mutate(
      pokedexPath,
      (pokedex: Document<Pokemon>[]) => {
        if (!pokedex) {
          return [{ id: pokemonRef.id, ...pokemon }];
        } else {
          return [{ id: pokemonRef.id, ...pokemon }, ...pokedex].sort((a, b) => a.apiId - b.apiId);
        }
      },
      false
    );
    setUser((prevUser) => {
      const incrementedPokedexCount = (prevUser?.pokedexCount as number) + incrementValue;
      const pokedexReward = formatPokedexReward(incrementedPokedexCount, colorMode);
      if (pokedexReward) {
        toast({
          position: 'top-right',
          duration: 6000,
          isClosable: true,
          render: () => <PokdexRewardToast {...pokedexReward} />,
        });
      }
      return {
        ...prevUser,
        pokedexCount: incrementedPokedexCount,
        lastPokemonSeenDate: Date.now(),
        updatedAt: Date.now(),
      } as Document<User>;
    });
  };

  useEffect(() => {
    // Execut unsubscribe() inside onAuthStateChanged to fire it only at lauching time
    const unsubscribe = auth.onAuthStateChanged(
      async (authUser: AuthUser | null) => {
        try {
          await handleUser(authUser, undefined, false);
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
    signInWithGoogle,
    signInWithGithub,
    signOut,
    setUserStarter,
    saveInPokedex,
  };

  return (
    <authContext.Provider value={authValue}>
      <ProvidersAdditionnalDataModal
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={async (providersPseudo, providersCharacter) => {
          await updateAuthUserDisplayName(auth.currentUser, {
            displayName: providersPseudo,
          });
          await handleUser(auth.currentUser, {
            pseudo: providersPseudo,
            character: providersCharacter,
          });
        }}
      />
      {children}
    </authContext.Provider>
  );
});

export default AuthProvider;
