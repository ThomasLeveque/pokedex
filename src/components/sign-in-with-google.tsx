import React, { useState } from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from '@hooks/useAuth';
import { formatAuthErrors } from '@utils/format-auth-errors';
import { errorToast } from '@utils/toasts';
import GoogleIcon from './icons/google-icon';

const SignInWithGoogle: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { signInWithGoogle } = useAuth();

  const handleSignInWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      await signInWithGoogle();
      // Do not setLoading(false) because Signin will unmount this component.
    } catch (err) {
      console.error(err);
      errorToast({ description: formatAuthErrors(err) });
      setLoading(false);
    }
  };

  return (
    <Button
      isLoading={loading}
      variant="google"
      onClick={handleSignInWithGoogle}
      rightIcon={<GoogleIcon />}
    >
      Continue with
    </Button>
  );
};

export default SignInWithGoogle;
