import { User as AuthUser } from '@firebase/auth-types';

export const updateAuthUserDisplayName = async (
  authUser: AuthUser | null,
  newAuthUserData: Partial<AuthUser>
): Promise<void> => {
  return authUser?.updateProfile(newAuthUserData);
};
