import React, { createContext, useContext, memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { User as AuthUser } from '@firebase/auth-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  useDisclosure,
  FormLabel,
  FormControl,
  Grid,
} from '@chakra-ui/react';

import { createUser, updateUser } from '@libs/firebase/client/db';
import {
  auth,
  clientDB,
  githubAuthProvider,
  googleAuthProvider,
  increment,
} from '@libs/firebase/client/firebase';
import { Document } from '@libs/firebase/firebase-types';
import { AdditionalUserData, Character, User } from '@data-types/user.type';
import { fetchDocument } from '@libs/firebase/client/fetchers';
import { errorToast, successToast } from '@utils/toasts';
import { updateAuthUserDisplayName } from '@libs/firebase/client/auth';
import RadioCharacter from '@components/radio-character';
import { allCharacters } from '@utils/all-characters';
import { useCheckbox } from './useCheckbox';
import { Pokemon } from '@data-types/pokemon.type';
import { mutate } from 'swr';

type AuthContextType = {
  user: Document<User> | null;
  userLoaded: boolean;
  signUpWithEmail: (
    email: string,
    password: string,
    additionalData: AdditionalUserData
  ) => Promise<void | null>;
  signInWithEmail: (email: string, password: string) => Promise<void | null>;
  signInWithGoogle: () => Promise<void | null>;
  signInWithGithub: () => Promise<void | null>;
  signOut: () => Promise<void | null>;
  setUserStarter: (userId: string, userToUpdate: Partial<User>) => Promise<void | null>;
  saveInPokedex: (userId: string, pokemon: Pokemon, increment: number) => Promise<void | null>;
};

const authContext = createContext<AuthContextType>({
  user: null,
  userLoaded: false,
  signUpWithEmail: async () => null,
  signInWithEmail: async () => null,
  signInWithGoogle: async () => null,
  signInWithGithub: async () => null,
  signOut: async () => null,
  setUserStarter: async () => null,
  saveInPokedex: async () => null,
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
  const [providersDataLoading, setProvidersDataLoading] = useState<boolean>(false);

  const [providersPseudo, setProvidersPseudo] = useState<string>('');
  const { data: providersCharacter, onChange: setProvidersCharacter, isChecked } = useCheckbox<
    Character
  >('red');
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            setProvidersPseudo(authUser.displayName as string);
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
    const batch = updateUser(userId, userToUpdate, clientDB.batch());
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
    const pokemonRef = clientDB.doc(`${pokedexPath}/${pokemon.apiId}`);
    pokemon = { ...pokemon, metDate: Date.now() };

    let batch = clientDB.batch();
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
    setUser(
      (prevUser) =>
        ({
          ...prevUser,
          pokedexCount: (prevUser?.pokedexCount as number) + incrementValue,
        } as Document<User>)
    );
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
      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Confirm your pseudo and choose a character</ModalHeader>
          <ModalBody>
            <FormControl id="pseudo" isRequired mb="4">
              <FormLabel>Pseudo</FormLabel>
              <Input
                maxLength={40}
                placeholder="Enter a pseudo"
                value={providersPseudo}
                autoComplete="off"
                onChange={(event) => setProvidersPseudo(event.target.value)}
              />
            </FormControl>
            <FormControl id="character" isRequired mb="6">
              <FormLabel>Character</FormLabel>
              <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={5}>
                {allCharacters.map((character) => {
                  const characterChecked = isChecked(character);
                  return (
                    <RadioCharacter
                      key={character}
                      onClick={() => setProvidersCharacter(character)}
                      isChecked={characterChecked}
                    >
                      <Image src={`/images/${character}.png`} width={500} height={500} />
                    </RadioCharacter>
                  );
                })}
              </Grid>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="primary"
              isLoading={providersDataLoading}
              onClick={async () => {
                if (providersPseudo.length === 0 || providersCharacter.length === 0) {
                  errorToast({ description: 'You must provide all the required data.' });
                  return;
                }
                try {
                  setProvidersDataLoading(true);
                  await updateAuthUserDisplayName(auth.currentUser, {
                    displayName: providersPseudo,
                  });
                  await handleUser(auth.currentUser, {
                    pseudo: providersPseudo,
                    character: providersCharacter,
                  });
                  setProvidersDataLoading(false);
                  onClose();
                } catch (err) {
                  errorToast({ description: err.message });
                  setProvidersDataLoading(false);
                  console.error(err);
                }
              }}
              ml={3}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {children}
    </authContext.Provider>
  );
});

export default AuthProvider;
