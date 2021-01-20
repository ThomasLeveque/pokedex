import React, { useState } from 'react';
import Image from 'next/image';
import {
  Button,
  Heading,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  useRadioGroup,
  Flex,
  Link,
} from '@chakra-ui/react';

import { fromPseudoToCredentials } from '@utils/format-string';
import { useAuth } from '@hooks/useAuth';
import { Character } from '@data-types/user.type';
import RadioCharacter from './radio-character';

type SignUpProps = {
  toggleIsLogin: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ toggleIsLogin }) => {
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

  const allCharacters: Character[] = ['red', 'leaf', 'blue'];

  const { getRadioProps } = useRadioGroup({
    name: 'character',
    defaultValue: 'red',
    onChange: (changedCharacter) => setCharacter(changedCharacter as Character),
  });

  return (
    <Box>
      <Heading as="h2" textAlign="center" mb="8">
        Sign up
      </Heading>
      <FormControl id="pseudo" isRequired mb="5">
        <FormLabel>Pseudo</FormLabel>
        <Input
          maxLength={40}
          placeholder="Enter a pseudo"
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
        />
        <FormHelperText>Never forget it !</FormHelperText>
      </FormControl>
      <FormControl id="character" isRequired mb="6">
        <FormLabel>Character</FormLabel>
        <Flex justify="space-between">
          {allCharacters.map((character) => {
            // Disable because, i got an error even when i pass string type to value.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const radio = getRadioProps({ value: character as string } as any);
            return (
              <RadioCharacter key={character} {...radio}>
                <Image src={`/images/${character}.png`} width={500} height={500} />
              </RadioCharacter>
            );
          })}
        </Flex>
      </FormControl>
      <Button onClick={handleSignUpWithEmail} isLoading={loading}>
        Enter
      </Button>
      <Link
        ml="4"
        onClick={() => {
          toggleIsLogin();
        }}
      >
        Continue an existing adventure
      </Link>
    </Box>
  );
};

export default SignUp;
