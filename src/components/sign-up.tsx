import React, { useState } from 'react';
import { Button, Heading, Box, Input, Stack } from '@chakra-ui/react';

import { fromPseudoToCredentials } from '@utils/format-string';
import { useAuth } from '@hooks/useAuth';

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>('');

  const { signUpWithEmail } = useAuth();

  const handleSignUpWithEmail = async (): Promise<void> => {
    const { email, password } = fromPseudoToCredentials(pseudo);
    try {
      setLoading(true);
      await signUpWithEmail(email, password, { pseudo });
      // Do not setLoading(false) because Signup will unmount this component.
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Box>
      <Heading as="h2" textAlign="center" mb="6">
        Sign up
      </Heading>
      <Stack direction="row">
        <Input
          mb="3"
          placeholder="Enter a pseudo"
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
        />
        <Button onClick={handleSignUpWithEmail} isLoading={loading}>
          Enter
        </Button>
      </Stack>
    </Box>
  );
};

export default SignUp;
