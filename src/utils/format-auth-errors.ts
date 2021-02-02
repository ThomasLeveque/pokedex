import { Error } from '@firebase/auth-types';

export const formatAuthErrors = (err: Error): string => {
  switch (err.code) {
    case 'auth/email-already-in-use':
      return 'This email is already use by another trainer';
    case 'auth/invalid-email':
      return 'The email you provide is not valid';
    case 'auth/user-not-found':
      return 'There is no trainer record corresponding to this email. The trainer may have been deleted.';
    default:
      return err.message;
  }
};
