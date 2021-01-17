import React, { useState } from 'react';
import { Button, Heading, Box, Input, Stack, Radio, RadioGroup } from '@chakra-ui/react';

import { fromPseudoToCredentials } from '@utils/format-string';
import { useAuth } from '@hooks/useAuth';
import { Character } from '@data-types/user.type';

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>('');
  const [character, setCharacter] = useState<Character>('red');

  const { signUpWithEmail } = useAuth();

  const handleSignUpWithEmail = async (): Promise<void> => {
    const { email, password } = fromPseudoToCredentials(pseudo);
    try {
      setLoading(true);
      await signUpWithEmail(email, password, { pseudo, character });
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
      <Input
        mb="3"
        placeholder="Enter a pseudo"
        value={pseudo}
        onChange={(event) => setPseudo(event.target.value)}
      />
      <RadioGroup
        onChange={(changedCharacter) => setCharacter(changedCharacter as Character)}
        value={character}
        mb="3"
      >
        <Stack direction="row">
          <Radio value="red">Red</Radio>
          <Radio value="leaf">Leaf</Radio>
          <Radio value="blue">Blue</Radio>
        </Stack>
      </RadioGroup>
      <Button onClick={handleSignUpWithEmail} isLoading={loading}>
        Enter
      </Button>
    </Box>
  );
};

export default SignUp;
