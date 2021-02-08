import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import AuthProvider from '@hooks/useAuth';
import AuthLoading from '@components/auth-loading';

import { colors } from '@theme/colors';
import { Button } from '@theme/button';
import { Input } from '@theme/input';
import { Divider } from '@theme/divider';
import { Progress } from '@theme/progress';

const theme = extendTheme({
  colors,
  components: {
    Button,
    Input,
    Divider,
    Progress,
  },
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <AuthProvider>
        <AuthLoading>
          <Component {...pageProps} />
        </AuthLoading>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
