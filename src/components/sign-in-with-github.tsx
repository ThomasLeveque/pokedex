import { Button } from '@chakra-ui/react';
import { useAuth } from '@hooks/useAuth';
import { formatAuthErrors } from '@utils/format-auth-errors';
import { errorToast } from '@utils/toasts';
import React, { useState } from 'react';
import GithubIcon from './github-icon';

const SignInWithGithub: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { signInWithGithub } = useAuth();

  const handleSignInWithGithub = async (): Promise<void> => {
    try {
      setLoading(true);
      await signInWithGithub();
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
      variant="github"
      onClick={handleSignInWithGithub}
      rightIcon={<GithubIcon />}
    >
      Continue with
    </Button>
  );
};

export default SignInWithGithub;
