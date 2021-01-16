import { User as AuthUser } from '@firebase/auth-types';

import { AdditionalUserData, User } from '@data-types/user.type';

export const formatUser = ({ email }: AuthUser, additionalData: AdditionalUserData): User => {
  return {
    email: email as string,
    isAdmin: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...additionalData,
  };
};
