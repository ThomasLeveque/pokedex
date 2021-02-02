import { User as AuthUser } from '@firebase/auth-types';

export const updateAuthUserDisplayName = async (
  authUser: AuthUser | null,
  displayName: string
): Promise<void> => {
  return authUser?.updateProfile({ displayName });
};
