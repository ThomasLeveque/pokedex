import React, { useState } from 'react';
import {
  Button,
  Box,
  Input,
  FormControl,
  FormLabel,
  Link,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Divider,
  HStack,
} from '@chakra-ui/react';

import { useAuth } from '@hooks/useAuth';
import { errorToast, successToast } from '@utils/toasts';
import { formatAuthErrors } from '@utils/format-auth-errors';
import GoogleIcon from './google-icon';

type SignInProps = {
  toggleIsLogin: () => void;
};

const SignIn: React.FC<SignInProps> = ({ toggleIsLogin }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = React.useState(false);

  const { signInWithEmail, signInWithGoogle } = useAuth();

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

  const handleSignInWithGoogle = async (): Promise<void> => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      // Do not setLoading(false) because Signin will unmount this component.
    } catch (err) {
      console.error(err);
      errorToast({ description: formatAuthErrors(err) });
      setGoogleLoading(false);
    }
  };

  return (
    <Box>
      <HStack>
        <Button
          isLoading={googleLoading}
          variant="google"
          onClick={handleSignInWithGoogle}
          rightIcon={<GoogleIcon />}
        >
          Continue with
        </Button>
      </HStack>
      <Divider my="6" />
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
      <FormControl id="password" isRequired mb="6">
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
      <Button variant="primary" onClick={handleSignInWithEmail} isLoading={loading}>
        Continue
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
