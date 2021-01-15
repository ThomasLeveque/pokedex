import React, { useState } from 'react';
import { Button, Heading, Box, Input, Stack } from '@chakra-ui/react';

import { signInWithEmail } from '@libs/client/auth';
import { fromPseudoToCredentials } from '@utils/format-string';

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>('');

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
      <Heading as="h2" textAlign="center" mb="6">
        Sign in
      </Heading>
      <Stack direction="row">
        <Input
          mb="3"
          placeholder="Enter your pseudo"
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
        />
        <Button onClick={handleSignInWithEmail} isLoading={loading}>
          Enter
        </Button>
      </Stack>
    </Box>
  );
};

export default SignIn;
