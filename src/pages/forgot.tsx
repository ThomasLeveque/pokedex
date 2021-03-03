import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Stack,
} from '@chakra-ui/react';

import { errorToast, successToast } from '@utils/toasts';
import { formatAuthErrors } from '@utils/format-auth-errors';
import { auth } from '@libs/firebase/firebase';
import PublicLayout from '@components/public-layout';

const ForgotPage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const router = useRouter();

  const handleResetPassword = async (): Promise<void> => {
    if (email.length === 0) {
      errorToast({ description: 'You must provide an email.' });
      return;
    }

    try {
      setLoading(true);
      await auth.sendPasswordResetEmail(email);
      successToast({
        title: `You have received an email to reset your password.`,
        description: 'Catch them all !',
      });
      router.push('/');
      // Do not setLoading(false) because success reset navigate to /.
    } catch (err) {
      console.error(err);
      errorToast({ description: formatAuthErrors(err) });
      setLoading(false);
    }
  };

  return (
    <PublicLayout title="Recover your password to continue or start an adventure.">
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
      <Stack
        gridGap={3}
        alignItems={{ base: 'stretch', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Button variant="primary" onClick={handleResetPassword} isLoading={loading}>
          Send
        </Button>
        <ChakraLink alignSelf="center" onClick={() => router.push('/')}>
          Go back
        </ChakraLink>
      </Stack>
    </PublicLayout>
  );
};

export default ForgotPage;
