import React, { useState } from 'react';
import {
  Button,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Link as ChakraLink,
  InputGroup,
  InputRightElement,
  Flex,
  Stack,
} from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';
import { Character } from '@data-types/user.type';
import { errorToast } from '@utils/toasts';
import { useCheckbox } from '@hooks/useCheckbox';
import { formatAuthErrors } from '@utils/format-auth-errors';
import CharactersCheckboxList from './characters-checkbox-list';

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
        <CharactersCheckboxList
          isChecked={isChecked}
          onChecked={(character) => setCharacter(character)}
        />
      </FormControl>
      <Stack
        gridGap={3}
        alignItems={{ base: 'stretch', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Button variant="primary" onClick={handleSignUpWithEmail} isLoading={loading}>
          Start
        </Button>
        <ChakraLink alignSelf="center" onClick={toggleIsLogin}>
          Continue an existing adventure
        </ChakraLink>
      </Stack>
    </Box>
  );
};

export default SignUp;
