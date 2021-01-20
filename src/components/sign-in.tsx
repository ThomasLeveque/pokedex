import React, { useState } from 'react';
import { Button, Heading, Box, Input, FormControl, FormLabel, Link } from '@chakra-ui/react';

import { fromPseudoToCredentials } from '@utils/format-string';
import { useAuth } from '@hooks/useAuth';

type SignInProps = {
  toggleIsLogin: () => void;
};

const SignIn: React.FC<SignInProps> = ({ toggleIsLogin }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>('');

  const { signInWithEmail } = useAuth();

  const handleSignInWithEmail = async (): Promise<void> => {
    const { email, password } = fromPseudoToCredentials(pseudo);
    try {
      setLoading(true);
      await signInWithEmail(email, password);
      // Do not setLoading(false) because Signin will unmount this component.
    } catch (err) {
      console.error(err);
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
      <Button onClick={handleSignInWithEmail} isLoading={loading}>
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
