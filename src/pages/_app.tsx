import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import AuthProvider from '@hooks/useAuth';
import AuthLoading from '@components/auth-loading';
import { ChakraProvider } from '@chakra-ui/react';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider resetCSS>
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
