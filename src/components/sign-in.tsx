import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Divider,
  Stack,
  Link as ChakraLink,
  CloseButton,
} from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';
import { errorToast } from '@utils/toasts';
import { formatAuthErrors } from '@utils/format-auth-errors';
import SignInWithGoogle from './sign-in-with-google';
import SignInWithGithub from './sign-in-with-github';
import ColorModeButton from './color-mode-button';

type SignInProps = {
  toggleIsLogin: () => void;
};

const SignIn: React.FC<SignInProps> = ({ toggleIsLogin }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = React.useState(false);

  const { signInWithEmail } = useAuth();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSignInWithEmail = async (): Promise<void> => {
    if (email.length === 0 || email.length === 0) {
      errorToast({ description: 'You must provide all the required data.' });
      return;
    }

    try {
      setLoading(true);
      await signInWithEmail(email, password);
      // Do not setLoading(false) because Signin will unmount this component.
    } catch (err) {
      console.error(err);
      errorToast({ description: formatAuthErrors(err) });
      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack
        gridGap={3}
        justifyContent="space-between"
        alignItems="flex-end"
        direction={{ base: 'column-reverse', md: 'row' }}
      >
        <Stack direction={{ base: 'column', md: 'row' }} gridGap={3} w="100%">
          <SignInWithGoogle />
          <SignInWithGithub />
        </Stack>
        <ColorModeButton aria-label="Login toggle color mode" />
      </Stack>
      <Divider my="6" />
      <FormControl id="email" isRequired mb="4">
        <FormLabel>Email</FormLabel>
        <InputGroup>
          <Input
            maxLength={255}
            placeholder="Enter your email"
            value={email}
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          {email.length > 0 && (
            <InputRightElement>
              <CloseButton variant="clear" onClick={() => setEmail('')} />
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired mb="6">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            maxLength={255}
            placeholder="Enter your password"
            value={password}
            pr="7rem"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <InputRightElement display="flex" justifyContent="flex-end">
            {password.length > 0 && <CloseButton variant="clear" onClick={() => setPassword('')} />}
            <Button h="1.75rem" minW="auto" mx="2" size="sm" onClick={handleShowPassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText>
          At least 6 characters.{' '}
          <Link href="/forgot" passHref>
            <ChakraLink color="primary">Forgot your password?</ChakraLink>
          </Link>
        </FormHelperText>
      </FormControl>
      <Stack
        gridGap={3}
        alignItems={{ base: 'stretch', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Button variant="primary" onClick={handleSignInWithEmail} isLoading={loading}>
          Continue
        </Button>
        <ChakraLink alignSelf="center" onClick={toggleIsLogin}>
          Start a new adventure
        </ChakraLink>
      </Stack>
    </Box>
  );
};

export default SignIn;
