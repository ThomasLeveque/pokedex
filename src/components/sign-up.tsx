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
  Link,
  Grid,
} from '@chakra-ui/react';

import { fromPseudoToCredentials } from '@utils/format-string';
import { useAuth } from '@hooks/useAuth';
import { Character } from '@data-types/user.type';
import RadioCharacter from './radio-character';
import { errorToast, successToast } from '@utils/toasts';
import { useCheckbox } from '@hooks/useCheckbox';
import { formatAuthErrors } from '@utils/format-auth-errors';

type SignUpProps = {
  toggleIsLogin: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ toggleIsLogin }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>('');

  const { data: character, onChange: setCharacter, isChecked } = useCheckbox<Character>('red');
  const { signUpWithEmail } = useAuth();

  const handleSignUpWithEmail = async (): Promise<void> => {
    if (pseudo.length === 0 || character.length === 0) {
      errorToast({ description: 'You must provide a pseudo and choose a character.' });
      return;
    }

    try {
      const { email, password } = fromPseudoToCredentials(pseudo);
      setLoading(true);
      await signUpWithEmail(email, password, { pseudo, character });
      successToast({ title: `Welcome ${pseudo}`, description: 'Catch them all !' });
      // Do not setLoading(false) because Signup will unmount this component.
    } catch (err) {
      console.error(err);
      errorToast({
        description: formatAuthErrors(err),
      });
      setLoading(false);
    }
  };

  const allCharacters: Character[] = ['red', 'leaf', 'blue'];

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
        <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={5}>
          {allCharacters.map((character) => {
            const characterChecked = isChecked(character);
            return (
              <RadioCharacter
                key={character}
                onClick={() => setCharacter(character)}
                isChecked={characterChecked}
              >
                <Image src={`/images/${character}.png`} width={500} height={500} />
              </RadioCharacter>
            );
          })}
        </Grid>
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
