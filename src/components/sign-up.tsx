import React, { useState } from 'react';
import Image from 'next/image';
import {
  Button,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Link,
  Grid,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';
import { Character } from '@data-types/user.type';
import RadioCharacter from './radio-character';
import { errorToast, successToast } from '@utils/toasts';
import { useCheckbox } from '@hooks/useCheckbox';
import { formatAuthErrors } from '@utils/format-auth-errors';
import { allCharacters } from '@utils/all-characters';

type SignUpProps = {
  toggleIsLogin: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ toggleIsLogin }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = React.useState(false);

  const { data: character, onChange: setCharacter, isChecked } = useCheckbox<Character>('red');
  const { signUpWithEmail } = useAuth();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSignUpWithEmail = async (): Promise<void> => {
    if (
      pseudo.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      character.length === 0
    ) {
      errorToast({ description: 'You must provide all the required data.' });
      return;
    }

    try {
      setLoading(true);
      await signUpWithEmail(email, password, { pseudo, character });
      // Do not setLoading(false) because Signup will unmount this component.
    } catch (err) {
      console.error(err);
      errorToast({
        description: formatAuthErrors(err),
      });
      setLoading(false);
    }
  };

  return (
    <Box>
      <FormControl id="pseudo" isRequired mb="4">
        <FormLabel>Pseudo</FormLabel>
        <Input
          maxLength={40}
          placeholder="Enter a pseudo"
          value={pseudo}
          autoComplete="username"
          onChange={(event) => setPseudo(event.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired mb="4">
        <FormLabel>Email</FormLabel>
        <Input
          maxLength={255}
          placeholder="Enter an email"
          value={email}
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired mb="4">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            maxLength={255}
            placeholder="Enter a password"
            value={password}
            pr="5rem"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText>At least 6 characters.</FormHelperText>
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
      <Button variant="primary" onClick={handleSignUpWithEmail} isLoading={loading}>
        Start
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
