import React, { useState } from 'react';
import { Button, Heading, Box, Input, FormControl, FormLabel, Link } from '@chakra-ui/react';

import { fromPseudoToCredentials } from '@utils/format-string';
import { useAuth } from '@hooks/useAuth';
import { errorToast, successToast } from '@utils/toasts';
import { formatAuthErrors } from '@utils/format-auth-errors';

type SignInProps = {
  toggleIsLogin: () => void;
};

const SignIn: React.FC<SignInProps> = ({ toggleIsLogin }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>('');

  const { signInWithEmail } = useAuth();

  const handleSignInWithEmail = async (): Promise<void> => {
    if (pseudo.length === 0) {
      errorToast({ description: 'You must provide a pseudo.' });
      return;
    }

    try {
      const { email, password } = fromPseudoToCredentials(pseudo);
      setLoading(true);
      await signInWithEmail(email, password);
      successToast({ title: `Welcome back ${pseudo}`, description: 'Catch them all !' });
      // Do not setLoading(false) because Signin will unmount this component.
    } catch (err) {
      console.error(err);
      errorToast({ description: formatAuthErrors(err) });
      setLoading(false);
    }
  };

  return (
    <Box>
      <Heading as="h2" textAlign="center" mb="8">
        Sign in
      </Heading>
      <FormControl id="pseudo" isRequired mb="5">
        <FormLabel>Pseudo</FormLabel>
        <Input
          maxLength={40}
          placeholder="Enter a pseudo"
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
        />
      </FormControl>
      <Button variant="primary" onClick={handleSignInWithEmail} isLoading={loading}>
        Enter
      </Button>
      <Link
        ml="4"
        onClick={() => {
          toggleIsLogin();
        }}
      >
        Start a new adventure
      </Link>
    </Box>
  );
};

export default SignIn;
