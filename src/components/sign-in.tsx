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
import { errorToast } from '@utils/toasts';
import { formatAuthErrors } from '@utils/format-auth-errors';
import SignInWithGoogle from './sign-in-with-google';
import SignInWithGithub from './sign-in-with-github';

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
      <HStack>
        <SignInWithGoogle />
        <SignInWithGithub />
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
      <Link ml="4" onClick={toggleIsLogin}>
        Start a new adventure
      </Link>
    </Box>
  );
};

export default SignIn;
