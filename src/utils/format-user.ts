import { User as AuthUser } from '@firebase/auth-types';

import { AdditionalUserData, User } from '@data-types/user.type';

export const formatUser = (
  { email, providerData }: AuthUser,
  additionalData: AdditionalUserData
): User => {
  return {
    email: email as string,
    isAdmin: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    chosenStarterDate: null,
    lastPokemonSeenDate: null,
    starterEvolveDate: null,
    provider: providerData[0]?.providerId,
    starterId: null,
    starterAvatarUrl: null,
    hasStarterEvolution: true,
    pokedexCount: 0,
    ...additionalData,
  };
};
